
import { View, Text, ScrollView, SafeAreaView, Pressable, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { allParcelsData } from '@/data/parcels';
import { ArrowLeft, MapPin, Phone, Truck } from 'lucide-react-native';

export default function ParcelDetailsScreen() {
  const { id } = useLocalSearchParams();
  const parcel = allParcelsData.find((p) => p.id === id);

  if (!parcel) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Parcel not found</Text>
      </View>
    );
  }

  const isDelivered = parcel.parcel_status === 'delivered';
  const isOngoing = parcel.parcel_status === 'ongoing';

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="flex-row items-center px-5 py-4">
        <Pressable onPress={() => router.back()} className="mr-4">
          <ArrowLeft size={24} color="#111" />
        </Pressable>
        <Text className="text-xl font-bold text-gray-900">Delivery Details</Text>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Track ID Row */}
        <View className="flex-row justify-between items-center mb-6 mt-2">
            <Text className="font-semibold text-gray-900 text-base">Track ID:</Text>
            <Text className="font-bold text-gray-900 text-base">TRIP-2025-{parcel.id.padStart(3, '0')}</Text>
        </View>

        {/* Card */}
        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100 elevation-sm">
            
            {/* Horizontal Timeline */}
            <View className="mb-8 relative">
                 {/* Line */}
                 <View className="absolute top-[14px] left-2 right-2 h-[2px] bg-blue-100" />
                 <View className="absolute top-[14px] left-2 w-1/2 h-[2px] bg-blue-500" />

                 <View className="flex-row justify-between items-center">
                    {/* Start Point */}
                    <View className="items-center">
                         <View className="w-4 h-4 rounded-full bg-blue-500 mb-2 border-2 border-white shadow-sm" />
                         <Text className="text-[10px] text-gray-500 mb-1">{new Date(parcel.createdAt).toLocaleDateString()}</Text>
                         <Text className="text-xs font-semibold text-gray-800">{(parcel.pickup_location || '').split(',')[0].trim() || 'Unknown'}</Text>
                    </View>

                    {/* Truck Icon (Middle) */}
                    <View className="bg-white p-1 rounded-full border border-blue-100 shadow-sm z-10">
                        <Truck size={16} color="#3b82f6" />
                    </View>

                    {/* End Point */}
                    <View className="items-center">
                         <View className="w-4 h-4 rounded-full bg-blue-500 mb-2 border-2 border-white shadow-sm" />
                         <Text className="text-[10px] text-gray-500 mb-1">
                            {parcel.estimated_delivery ? new Date(parcel.estimated_delivery).toLocaleDateString() : 'Pending'}
                         </Text>
                         <Text className="text-xs font-semibold text-gray-800">{(parcel.delivery_location || '').split(',')[0].trim() || 'Unknown'}</Text>
                    </View>
                 </View>
            </View>

            {/* From Section */}
            <View className="mb-6">
                <Text className="text-gray-500 text-sm mb-2">From</Text>
                <Text className="text-lg font-bold text-gray-900 mb-1">{parcel.senderInfo?.name || 'Unknown Sender'}</Text>
                
                <View className="flex-row items-start mb-1">
                    <MapPin size={14} color="#6b7280" className="mt-1 mr-2" />
                    <Text className="text-gray-600 text-sm flex-1">{parcel.senderInfo?.address || parcel.pickup_location}</Text>
                </View>
                <View className="flex-row items-center">
                    <Phone size={14} color="#6b7280" className="mr-2" />
                    <Text className="text-gray-600 text-sm">{parcel.senderInfo?.phone || '000-0000-000'}</Text>
                </View>
            </View>

            {/* To Section */}
            <View className="mb-6">
                <Text className="text-gray-500 text-sm mb-2">To</Text>
                <Text className="text-lg font-bold text-gray-900 mb-1">{parcel.receiverInfo?.name || 'Unknown Receiver'}</Text>
                
                <View className="flex-row items-start mb-1">
                    <MapPin size={14} color="#6b7280" className="mt-1 mr-2" />
                    <Text className="text-gray-600 text-sm flex-1">{parcel.receiverInfo?.address || parcel.delivery_location}</Text>
                </View>
                 <View className="flex-row items-center">
                    <Phone size={14} color="#6b7280" className="mr-2" />
                    <Text className="text-gray-600 text-sm">{parcel.receiverInfo?.phone || '000-0000-000'}</Text>
                </View>
            </View>

            {/* Dates Grid */}
            <View className="border-t border-gray-100 pt-4 flex-row justify-between mb-4">
                <View>
                     <Text className="text-gray-500 text-sm mb-1">Date of dispatch</Text>
                     <Text className="font-bold text-gray-900 text-base">
                        {new Date(parcel.createdAt).toLocaleDateString()}
                     </Text>
                </View>
                <View className="items-end">
                     <Text className="text-gray-500 text-sm mb-1">Date of delivery</Text>
                     <Text className="font-bold text-gray-900 text-base">
                        {parcel.estimated_delivery ? new Date(parcel.estimated_delivery).toLocaleDateString() : 'Pending'}
                     </Text>
                </View>
            </View>

            {/* Parcel Details Grid */}
            <View className="flex-row justify-between">
                <View>
                     <Text className="text-gray-500 text-sm mb-1">Parcel Type</Text>
                     <Text className="font-semibold text-gray-900 text-base capitalize">{parcel.parcel_type}</Text>
                </View>
                <View className="items-end">
                     <Text className="text-gray-500 text-sm mb-1">Parcel Weight</Text>
                     <Text className="font-semibold text-gray-900 text-base">{parcel.parcel_weight} Kg</Text>
                </View>
            </View>

        </View>

        {isDelivered ? (
         <View className="bg-green-600 rounded-full py-4 items-center mb-8">
            <Text className="text-white font-bold text-lg">Delivered</Text>
         </View>
        ) : (
            <Pressable className="bg-green-600 rounded-full py-4 items-center mb-8 shadow-md">
                <Text className="text-white font-bold text-lg">Delivered</Text>
            </Pressable>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}
