import { View, Text, Pressable, Platform, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, PackageX } from 'lucide-react-native';
import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { useParcelStore } from '@/store/useParcelStore';
import { DeliveryCard } from '@/components/Deliveries/DeliveryCard';
import { DeliveryCardSkeleton } from '@/components/ui/SkeletonCard';
import { Colors } from '@/constants/theme';

export default function DeliveriesScreen() {
    const { parcels, fetchParcels, loading } = useParcelStore();
    const [activeTab, setActiveTab] = useState<'Active' | 'Delivered'>('Active');
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
  
    useEffect(() => {
      fetchParcels();
    }, []);
  
    const onRefresh = async () => {
      setRefreshing(true);
      await fetchParcels();
      setRefreshing(false);
    };

    const activeDeliveries = parcels.filter(d => 
      d.parcel_status === 'pending' || d.parcel_status === 'ongoing'
    );
    
    const deliveredDeliveries = parcels.filter(d => 
      d.parcel_status === 'delivered'
    );
  
    const displayedDeliveries = (activeTab === 'Active' ? activeDeliveries : deliveredDeliveries).filter(parcel => 
      (parcel.tracking_no && parcel.tracking_no.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (parcel.pickup_location && parcel.pickup_location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (parcel.delivery_location && parcel.delivery_location.toLowerCase().includes(searchQuery.toLowerCase()))
    );

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
          placeholder="Search"
        />
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 mb-6 gap-3 bg-white">
        <Pressable 
          onPress={() => setActiveTab('Active')}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeTab === 'Active' 
              ? 'bg-primary border-primary' 
              : 'bg-white border-primary'
          }`}
        >
          <Text className={`font-semibold text-base ${
            activeTab === 'Active' ? 'text-white' : 'text-primary'
          }`}>
            Active({activeDeliveries.length})
          </Text>
        </Pressable>
        
        <Pressable 
          onPress={() => setActiveTab('Delivered')}
          className={`flex-1 py-3 rounded-full border items-center justify-center ${
            activeTab === 'Delivered' 
              ? 'bg-primary border-primary' 
              : 'bg-white border-primary'
          }`}
        >
          <Text className={`font-semibold text-base ${
            activeTab === 'Delivered' ? 'text-white' : 'text-primary'
          }`}>
            Delivered({deliveredDeliveries.length})
          </Text>
        </Pressable>
      </View>

      {/* List */}
      {loading ? (
        <View className="px-5">
          <DeliveryCardSkeleton />
          <DeliveryCardSkeleton />
          <DeliveryCardSkeleton />
        </View>
      ) : (
        <FlatList
          data={displayedDeliveries}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-5 bg-white">
              <DeliveryCard parcel={item} />
            </View>
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
    </SafeAreaView>
  );
}
