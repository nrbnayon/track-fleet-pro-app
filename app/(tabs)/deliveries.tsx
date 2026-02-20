import { View, Text, Pressable, Platform, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, PackageX, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useState, useEffect, useCallback } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { useParcelStore, TabType } from '@/store/useParcelStore';
import { DeliveryCard } from '@/components/Deliveries/DeliveryCard';
import { DeliveryCardSkeleton } from '@/components/ui/SkeletonCard';
import { Colors } from '@/constants/theme';

// ─── Pagination Component ─────────────────────────────────────────────────────
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

  const prevDisabled = currentPage <= 1 || loading;
  const nextDisabled = currentPage >= totalPages || loading;

  return (
    <View className="flex-row items-center justify-center gap-4 mt-4 mb-2">
      <Pressable
        onPress={onPrev}
        disabled={prevDisabled}
        className={`flex-row items-center px-4 py-2 rounded-full ${
          prevDisabled ? 'bg-gray-100' : 'bg-white border border-gray-200'
        }`}
        style={!prevDisabled ? {
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
        } : undefined}
      >
        <ChevronLeft size={16} color={prevDisabled ? '#9CA3AF' : '#374151'} strokeWidth={2.5} />
        <Text className={`ml-1 font-semibold text-sm ${prevDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
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
        disabled={nextDisabled}
        className={`flex-row items-center px-4 py-2 rounded-full ${
          nextDisabled ? 'bg-gray-100' : 'bg-white border border-gray-200'
        }`}
        style={!nextDisabled ? {
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
        } : undefined}
      >
        <Text className={`mr-1 font-semibold text-sm ${nextDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
          Next
        </Text>
        <ChevronRight size={16} color={nextDisabled ? '#9CA3AF' : '#374151'} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

export default function DeliveriesScreen() {
  const {
    ongoingParcels,
    completedParcels,
    ongoingMeta,
    completedMeta,
    loading,
    fetchParcelsByTab,
    fetchParcelsByPage
  } = useParcelStore();

  const [activeTab, setActiveTab] = useState<'Active' | 'Delivered'>('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Map local tab to store tab
  // Active TAB -> 'Ongoing' in Store (status=ONGOING)
  // Delivered TAB -> 'Completed' in Store (status=DELIVERED)
  const targetStoreTab: TabType = activeTab === 'Active' ? 'Ongoing' : 'Completed';
  
  const currentList = activeTab === 'Active' ? ongoingParcels : completedParcels;
  const currentMeta = activeTab === 'Active' ? ongoingMeta : completedMeta;

  useEffect(() => {
    fetchParcelsByTab(targetStoreTab);
  }, [activeTab]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchParcelsByTab(targetStoreTab, true);
    setRefreshing(false);
  }, [targetStoreTab]);

  // Client-side filtering for search (on the current page's data)
  const displayedDeliveries = currentList.filter(parcel => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (parcel.tracking_id && parcel.tracking_id.toLowerCase().includes(q)) ||
      (parcel.title && parcel.title.toLowerCase().includes(q)) ||
      (parcel.pickup_location && parcel.pickup_location.toLowerCase().includes(q)) ||
      (parcel.delivery_location && parcel.delivery_location.toLowerCase().includes(q)) ||
      (parcel.customer_name && parcel.customer_name.toLowerCase().includes(q))
    );
  });

  const handlePrev = () => {
    if (currentMeta.currentPage > 1) {
      fetchParcelsByPage(targetStoreTab, currentMeta.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentMeta.currentPage < currentMeta.totalPages) {
      fetchParcelsByPage(targetStoreTab, currentMeta.currentPage + 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 0 : 0 }}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 mb-2">
        <Pressable onPress={() => router.back()} className="mr-3">
          <ArrowLeft size={24} color="#1f2937" />
        </Pressable>
        <Text className="text-2xl font-bold text-gray-900">My Deliveries</Text>
      </View>

      {/* Search */}
      <View className="px-5 mb-6">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by ID, location, customer..."
        />
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 mb-6 gap-3 bg-white">
        <Pressable 
          onPress={() => { setActiveTab('Active'); setSearchQuery(''); }}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeTab === 'Active' 
              ? 'bg-primary border-primary' 
              : 'bg-white border-primary'
          }`}
        >
          <Text className={`font-semibold text-base ${
            activeTab === 'Active' ? 'text-white' : 'text-primary'
          }`}>
            Active ({ongoingMeta.count})
          </Text>
        </Pressable>
        
        <Pressable 
          onPress={() => { setActiveTab('Delivered'); setSearchQuery(''); }}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeTab === 'Delivered' 
              ? 'bg-primary border-primary' 
              : 'bg-white border-primary'
          }`}
        >
          <Text className={`font-semibold text-base ${
            activeTab === 'Delivered' ? 'text-white' : 'text-primary'
          }`}>
            Delivered ({completedMeta.count})
          </Text>
        </Pressable>
      </View>

      {/* List */}
      <View className="flex-1 px-5">
        {loading && currentList.length === 0 ? (
          <View>
            <DeliveryCardSkeleton />
            <DeliveryCardSkeleton />
            <DeliveryCardSkeleton />
          </View>
        ) : (
          <FlatList
            data={displayedDeliveries}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DeliveryCard parcel={item} />
            )}
            contentContainerStyle={{ paddingBottom: 70 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.light.tint}
                colors={[Colors.light.tint]}
              />
            }
            ListFooterComponent={
              (!searchQuery && currentMeta.totalPages > 1) ? (
                <Pagination
                  currentPage={currentMeta.currentPage}
                  totalPages={currentMeta.totalPages}
                  onPrev={handlePrev}
                  onNext={handleNext}
                  loading={loading}
                />
              ) : null
            }
            ListEmptyComponent={
              <View className="items-center justify-center mt-16">
                <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
                  <PackageX size={40} color="#9CA3AF" strokeWidth={1.5} />
                </View>
                <Text className="text-gray-500 text-base font-medium">No deliveries found</Text>
                <Text className="text-center text-gray-400 text-sm mt-1">
                  {searchQuery ? 'Try adjusting your search' : `No ${activeTab.toLowerCase()} deliveries`}
                </Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
