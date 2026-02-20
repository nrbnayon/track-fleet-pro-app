// app/(tabs)/index.tsx
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Bell, PackageX, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { useParcelStore, TabType } from '@/store/useParcelStore';
import { TabSelector } from '@/components/ui/TabSelector';
import { SearchBar } from '@/components/ui/SearchBar';
import { ParcelCard } from '@/components/Home/ParcelCard';
import { EmergencyAlertModal } from '@/components/Modals/EmergencyAlertModal';
import { EmergencyButton } from '@/components/ui/EmergencyButton';
import { ParcelCardSkeleton } from '@/components/ui/SkeletonCard';

// ─── Pagination controls ──────────────────────────────────────────────────────
function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  loading,
}: {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  loading: boolean;
}) {
  if (totalPages <= 1) return null;

  return (
    <View className="flex-row items-center justify-center gap-4 mt-4 mb-2">
      <Pressable
        onPress={onPrev}
        disabled={currentPage <= 1 || loading}
        className={`flex-row items-center px-4 py-2 rounded-full ${
          currentPage <= 1 ? 'bg-gray-100' : 'bg-white border border-gray-200'
        }`}
        style={
          currentPage > 1
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 2,
              }
            : undefined
        }
      >
        <ChevronLeft
          size={16}
          color={currentPage <= 1 ? '#9CA3AF' : '#374151'}
          strokeWidth={2.5}
        />
        <Text
          className={`ml-1 font-semibold text-sm ${
            currentPage <= 1 ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          Prev
        </Text>
      </Pressable>

      <View className="px-4 py-2 bg-primary rounded-full">
        <Text className="text-white font-bold text-sm">
          {currentPage} / {totalPages}
        </Text>
      </View>

      <Pressable
        onPress={onNext}
        disabled={currentPage >= totalPages || loading}
        className={`flex-row items-center px-4 py-2 rounded-full ${
          currentPage >= totalPages
            ? 'bg-gray-100'
            : 'bg-white border border-gray-200'
        }`}
        style={
          currentPage < totalPages
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
                elevation: 2,
              }
            : undefined
        }
      >
        <Text
          className={`mr-1 font-semibold text-sm ${
            currentPage >= totalPages ? 'text-gray-400' : 'text-gray-700'
          }`}
        >
          Next
        </Text>
        <ChevronRight
          size={16}
          color={currentPage >= totalPages ? '#9CA3AF' : '#374151'}
          strokeWidth={2.5}
        />
      </Pressable>
    </View>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { user } = useAuthStore();
  const {
    fetchParcelsByTab,
    fetchParcelsByPage,
    startAutoRefresh,
    stopAutoRefresh,
    activeTab,
    setTab,
    searchQuery,
    setSearchQuery,
    getFilteredParcels,
    loading: isParcelsLoading,
    assignedMeta,
    ongoingMeta,
    completedMeta,
  } = useParcelStore();

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ── Initial load + tab-switch fetch ──────────────────────────────────────────
  useEffect(() => {
    fetchParcelsByTab(activeTab);
  }, [activeTab]);

  // ── Auto-refresh every 25 min for Assigned tab ────────────────────────────────
  useEffect(() => {
    startAutoRefresh();
    return () => stopAutoRefresh(); // cleanup on unmount
  }, []);

  const filteredParcels = getFilteredParcels();

  // Current pagination meta based on active tab
  const currentMeta =
    activeTab === 'Assigned'
      ? assignedMeta
      : activeTab === 'Ongoing'
      ? ongoingMeta
      : completedMeta;

  // ── Pull-to-refresh ───────────────────────────────────────────────────────────
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchParcelsByTab(activeTab, true); // force re-fetch page 1
    setRefreshing(false);
  }, [activeTab]);

  // ── Tab change ────────────────────────────────────────────────────────────────
  const handleTabChange = (tab: string) => {
    setTab(tab as TabType);
    setSearchQuery('');
  };

  // ── Pagination ────────────────────────────────────────────────────────────────
  const handlePrev = () => {
    if (currentMeta.currentPage > 1) {
      fetchParcelsByPage(activeTab, currentMeta.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentMeta.currentPage < currentMeta.totalPages) {
      fetchParcelsByPage(activeTab, currentMeta.currentPage + 1);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50"
      style={{ paddingTop: Platform.OS === 'android' ? 5 : 0 }}
    >
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.light.tint}
            colors={[Colors.light.tint]}
          />
        }
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View className="flex-row justify-between items-start mb-6 mt-4">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Hello, {user?.full_name || 'Driver'} 👋
            </Text>
            <View className="flex-row items-center mt-1">
              <MapPin size={14} color="#414141" />
              <Text className="text-[#414141] ml-1 text-sm">
                {user?.address || 'Location not set'}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => router.push('/notifications')}
              className="relative p-1"
            >
              <Bell size={24} color="#374151" />
              <View className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </Pressable>
          </View>
        </View>

        {/* ── Section title + count ────────────────────────────────────────── */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-semibold text-foreground">Deliveries</Text>
          {currentMeta.count > 0 && (
            <View className="bg-primary/10 px-3 py-1 rounded-full">
              <Text className="text-primary font-semibold text-xs">
                {currentMeta.count} total
              </Text>
            </View>
          )}
        </View>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <View className="mb-6">
          <TabSelector
            tabs={['Assigned', 'Ongoing', 'Completed']}
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        </View>

        {/* ── Search ──────────────────────────────────────────────────────── */}
        <View className="mb-6">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by parcel, tracking ID, location..."
          />
        </View>

        {/* ── Parcel List ──────────────────────────────────────────────────── */}
        <View className="gap-4">
          {isParcelsLoading ? (
            <>
              <ParcelCardSkeleton />
              <ParcelCardSkeleton />
              <ParcelCardSkeleton />
            </>
          ) : (
            <>
              {filteredParcels.map((parcel) => (
                <ParcelCard key={parcel.id} parcel={parcel} />
              ))}

              {/* ── Pagination ───────────────────────────────────────────── */}
              {!searchQuery.trim() && (
                <Pagination
                  currentPage={currentMeta.currentPage}
                  totalPages={currentMeta.totalPages}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  loading={isParcelsLoading}
                />
              )}

              {/* ── Empty state ──────────────────────────────────────────── */}
              {filteredParcels.length === 0 && (
                <View className="items-center justify-center mt-16">
                  <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
                    <PackageX size={40} color="#9CA3AF" strokeWidth={1.5} />
                  </View>
                  <Text className="text-center text-gray-500 text-base font-medium">
                    No parcels found
                  </Text>
                  <Text className="text-center text-gray-400 text-sm mt-1">
                    {searchQuery
                      ? 'Try adjusting your search'
                      : `No ${activeTab.toLowerCase()} deliveries yet`}
                  </Text>
                </View>
              )}
            </>
          )}
        </View>

        {/* ── Emergency Alert button ───────────────────────────────────────── */}
        <EmergencyButton onPress={() => setShowEmergencyModal(true)} />
      </ScrollView>

      {/* ── Emergency Alert Modal ────────────────────────────────────────────── */}
      <EmergencyAlertModal
        visible={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
      />
    </SafeAreaView>
  );
}