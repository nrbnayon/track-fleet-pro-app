
import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable, Platform, ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Search, MapPin, Bell, AlertTriangle, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/theme';
import { useAuthStore } from '@/store/useAuthStore';
import { useParcelStore } from '@/store/useParcelStore';

const ParcelCard = ({ parcel }: { parcel: any }) => {
  const isDelivered = parcel.parcel_status === 'delivered';
  const isOngoing = parcel.parcel_status === 'ongoing';
  
  return (
    <Pressable 
      className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100"
      onPress={() => router.push({ pathname: '/parcel/[id]', params: { id: parcel.id } })}
    >
      <View className="mb-4">
        <Text className="text-gray-500 font-medium text-xs mb-1">TRIP-2025-{parcel.id.padStart(3, '0')}</Text>
      </View>

      <View className="flex-row mb-6">
        {/* Timeline Line */}
        <View className="mr-4 items-center">
            <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center z-10">
                <View className="w-3 h-3 bg-blue-500 rounded-full" />
            </View>
            <View className="w-[2px] bg-blue-200 flex-1 my-[-4px]" />
            <View className="w-8 h-8 bg-red-50 rounded-full items-center justify-center z-10">
                <View className="w-3 h-3 bg-red-500 rounded-full" />
            </View>
        </View>

        <View className="flex-1 justify-between py-1">
            <View className="flex-row justify-between mb-6">
                <View>
                    <Text className="text-gray-500 text-xs mb-1">Pickup</Text>
                    <Text className="font-semibold text-gray-800">{(parcel.pickup_location || '').split(',')[0].trim() || 'Unknown'}</Text>
                </View>
                <View>
                     <Text className="text-gray-500 text-xs mb-1 text-right">Date of dispatch</Text>
                     <Text className="font-medium text-gray-800 text-xs text-right">
                        {new Date(parcel.createdAt).toLocaleDateString()} {new Date(parcel.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                     </Text>
                </View>
            </View>

             <View className="flex-row justify-between">
                <View>
                    <Text className="text-gray-500 text-xs mb-1">Destination:</Text>
                    <Text className="font-semibold text-gray-800">{(parcel.delivery_location || '').split(',')[0].trim() || 'Unknown'}</Text>
                </View>
                <View>
                     <Text className="text-gray-500 text-xs mb-1 text-right">Date of delivery</Text>
                     <Text className="font-medium text-gray-800 text-xs text-right">
                        {parcel.estimated_delivery 
                            ? new Date(parcel.estimated_delivery).toLocaleDateString() + ' ' + new Date(parcel.estimated_delivery).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                            : 'Pending'}
                     </Text>
                </View>
            </View>
        </View>
      </View>

      {isDelivered ? (
         <View className="bg-green-600 rounded-full py-3 items-center">
            <Text className="text-white font-bold text-base">Delivered</Text>
         </View>
      ) : (
        <View className="bg-primary rounded-full py-3 items-center">
            <Text className="text-white font-bold text-base">
                {isOngoing ? 'Mark as Delivered' : 'Start Trip'}
            </Text>
        </View>
      )}
    </Pressable>
  );
};

export default function HomeScreen() {
  const { user, signOut } = useAuthStore();
  const { 
    fetchParcels, 
    activeTab, 
    setTab, 
    searchQuery, 
    setSearchQuery, 
    getFilteredParcels, 
    loading: isParcelsLoading 
  } = useParcelStore();

  useEffect(() => {
    fetchParcels();
  }, []);

  const filteredParcels = getFilteredParcels();

  const handleLogout = async () => {
    await signOut();
    // Redirect handled by _layout.tsx
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pt-8" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View className="flex-row justify-between items-start mb-6 mt-4">
            <View>
                <Text className="text-2xl font-bold text-gray-900">Hello, {user?.name || 'Driver'}</Text>
                <View className="flex-row items-center mt-1">
                    <MapPin size={14} color="#6b7280" />
                    <Text className="text-gray-500 ml-1">Shyamoli, Dhaka</Text>
                </View>
            </View>
            <View className="flex-row items-center gap-3">
                <Pressable onPress={handleLogout} className="p-2 bg-gray-100 rounded-full">
                    <LogOut size={20} color="#ef4444" />
                </Pressable>
                <View className="relative">
                    <Bell size={24} color="#374151" />
                    <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
                </View>
            </View>
        </View>

        <Text className="text-lg font-semibold text-gray-800 mb-4">Deliveries</Text>

        {/* Tabs */}
        <View className="flex-row bg-white rounded-full p-1 mb-6 shadow-sm border border-gray-100">
            {['Assigned', 'Ongoing', 'Completed'].map((tab) => (
                <Pressable
                    key={tab}
                    onPress={() => setTab(tab as any)}
                    className={`flex-1 py-2.5 items-center rounded-full ${activeTab === tab ? 'bg-primary' : 'bg-transparent'}`}
                >
                    <Text className={`font-medium ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}>
                        {tab}
                    </Text>
                </Pressable>
            ))}
        </View>

        {/* Search */}
        <View className="flex-row items-center bg-white rounded-full px-4 py-3 mb-6 shadow-sm border border-gray-100">
            <Search size={20} color="#9ca3af" />
            <TextInput
                placeholder="Search Parcel"
                className="flex-1 ml-3 text-base text-gray-800"
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>

        {/* List */}
        <View className="gap-4">
            {isParcelsLoading ? (
                <ActivityIndicator size="large" color={Colors.light.tint} className="mt-10" />
            ) : (
                <>
                    {filteredParcels.map((parcel) => (
                        <ParcelCard key={parcel.id} parcel={parcel} />
                    ))}
                    {filteredParcels.length === 0 && (
                        <Text className="text-center text-gray-400 mt-10">No parcels found</Text>
                    )}
                </>
            )}
        </View>

         {/* Emergency Alert */}
         <View className="mt-8 mb-4">
            <Text className="text-lg font-semibold text-gray-800 mb-3">Emergency Alert</Text>
            <Pressable className="bg-red-600 rounded-full py-4 flex-row items-center justify-center shadow-md">
                <AlertTriangle size={20} color="white" className="mr-2" />
                <Text className="text-white font-bold text-lg ml-2">Send Alert</Text>
            </Pressable>
            <Text className="text-center text-gray-500 text-xs mt-3">
                Press this button in case of any emergency
            </Text>
         </View>

      </ScrollView>
    </SafeAreaView>
  );
}
