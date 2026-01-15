import { View, Text, Pressable, Platform, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { SearchBar } from '@/components/ui/SearchBar';
import { myDeliveries } from '@/data/myDeliveries';
import { DeliveryCard } from '@/components/Deliveries/DeliveryCard';

export default function DeliveriesScreen() {
  const [activeTab, setActiveTab] = useState<'Active' | 'Delivered'>('Active');
  const [searchQuery, setSearchQuery] = useState('');

  const activeDeliveries = myDeliveries.filter(d => 
    d.parcel_status === 'pending' || d.parcel_status === 'ongoing'
  );
  
  const deliveredDeliveries = myDeliveries.filter(d => 
    d.parcel_status === 'delivered'
  );

  const displayedDeliveries = (activeTab === 'Active' ? activeDeliveries : deliveredDeliveries).filter(parcel => 
    parcel.tracking_no.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parcel.pickup_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    parcel.delivery_location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 mb-2">
        <Pressable onPress={() => router.back()} className="mr-4 p-2 -ml-2">
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
        ListEmptyComponent={
          <View className="items-center justify-center mt-10">
            <Text className="text-gray-400">No deliveries found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
