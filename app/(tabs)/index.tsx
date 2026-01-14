// app/(tabs)/index.tsx
import { View, Text, ScrollView, Pressable, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MapPin, Bell, LogOut } from 'lucide-react-native';
import { Colors } from '@/constants/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { useParcelStore } from '@/store/useParcelStore';
import { TabSelector } from '@/components/ui/TabSelector';
import { SearchBar } from '@/components/ui/SearchBar';
import { ParcelCard } from '@/components/Home/ParcelCard';
import { EmergencyAlertModal } from '@/components/Modals/EmergencyAlertModal';
import { EmergencyButton } from '@/components/ui/EmergencyButton';

export default function HomeScreen() {
  const { user, signOut } = useAuthStore();
  const {
    fetchParcels,
    activeTab,
    setTab,
    searchQuery,
    setSearchQuery,
    getFilteredParcels,
    loading: isParcelsLoading,
  } = useParcelStore();

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  useEffect(() => {
    fetchParcels();
  }, []);

  const filteredParcels = getFilteredParcels();

  const handleLogout = async () => {
    await signOut();
  };

  const handleEmergencyAlert = () => {
    setShowEmergencyModal(true);
  };

  const handleTurnOnLocation = () => {
    setShowEmergencyModal(false);
    // TODO: Implement location permission request
    console.log('Turn on location');
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-50 pt-8"
      style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}
    >
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-start mb-6 mt-4">
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Hello, {user?.name || 'Driver'}
            </Text>
            <View className="flex-row items-center mt-1">
              <MapPin size={14} color="#6b7280" />
              <Text className="text-gray-500 ml-1">Shyamoli, Dhaka</Text>
            </View>
          </View>
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={handleLogout}
              className="p-2 bg-gray-100 rounded-full"
            >
              <LogOut size={20} color="#ef4444" />
            </Pressable>
            <View className="relative">
              <Bell size={24} color="#374151" />
              <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </View>
          </View>
        </View>

        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Deliveries
        </Text>

        {/* Tabs */}
        <View className="mb-6">
          <TabSelector
            tabs={['Assigned', 'Ongoing', 'Completed']}
            activeTab={activeTab}
            onTabChange={(tab) => setTab(tab as any)}
          />
        </View>

        {/* Search */}
        <View className="mb-6">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search Parcel"
          />
        </View>

        {/* Parcel List */}
        <View className="gap-4">
          {isParcelsLoading ? (
            <ActivityIndicator
              size="large"
              color={Colors.light.tint}
              className="mt-10"
            />
          ) : (
            <>
              {filteredParcels.map((parcel) => (
                <ParcelCard key={parcel.id} parcel={parcel} />
              ))}
              {filteredParcels.length === 0 && (
                <Text className="text-center text-gray-400 mt-10">
                  No parcels found
                </Text>
              )}
            </>
          )}
        </View>

        {/* Emergency Alert */}
        <EmergencyButton onPress={handleEmergencyAlert} />
      </ScrollView>

      {/* Emergency Alert Modal */}
      <EmergencyAlertModal
        visible={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onConfirm={handleTurnOnLocation}
      />
    </SafeAreaView>
  );
}