
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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


// //track-fleet-pro-app\app\parcel\[id].tsx
// import { View, Text, ScrollView, Pressable, Platform, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useLocalSearchParams, router } from 'expo-router';
// import { ArrowLeft, MapPin, Phone, Truck, Package, Calendar, Box, Check } from 'lucide-react-native';
// import { useParcelStore } from '@/store/useParcelStore';
// import { useToastStore } from '@/store/useToastStore';

// export default function ParcelDetailsScreen() {
//   const { id } = useLocalSearchParams();
//   const { parcels, startTrip, markAsDelivered } = useParcelStore();
//   const { showToast } = useToastStore();
  
//   const parcel = parcels.find((p) => p.id === id);

//   if (!parcel) {
//     return (
//       <View className="flex-1 items-center justify-center bg-gray-50">
//         <Text className="text-gray-500 font-medium text-lg">Parcel not found</Text>
//         <Pressable onPress={() => router.back()} className="mt-4 px-4 py-2 bg-blue-500 rounded-lg">
//           <Text className="text-white">Go Back</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   const isPending = parcel.parcel_status === 'pending';
//   const isOngoing = parcel.parcel_status === 'ongoing';
//   const isDelivered = parcel.parcel_status === 'delivered';
//   const isReturn = parcel.parcel_status === 'return';
//   const isCancelled = parcel.parcel_status === 'cancelled';

//   const handleStartTrip = () => {
//     startTrip(parcel.id);
//     showToast('Trip Started Successfully', 'success');
//   };

//   const handleMarkAsDelivered = () => {
//     markAsDelivered(parcel.id);
//     showToast('Parcel Marked as Delivered', 'success');
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
//       {/* Header */}
//       <View className="flex-row items-center px-5 py-4 border-b border-gray-100">
//         <Pressable onPress={() => router.back()} className="mr-4 p-2 -ml-2 rounded-full active:bg-gray-100">
//           <ArrowLeft size={24} color="#1f2937" />
//         </Pressable>
//         <Text className="text-xl font-bold text-gray-900">Delivery Details</Text>
//         <View className="flex-1 items-end">
//             <View className={`px-3 py-1 rounded-full ${isDelivered ? 'bg-green-100' : isOngoing ? 'bg-blue-100' : isPending ? 'bg-yellow-100' : 'bg-red-100'}`}>
//                 <Text className={`text-xs font-semibold capitalize ${isDelivered ? 'text-green-700' : isOngoing ? 'text-blue-700' : isPending ? 'text-yellow-700' : 'text-red-700'}`}>
//                     {parcel.parcel_status}
//                 </Text>
//             </View>
//         </View>
//       </View>

//       <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 100 }}>
        
//         {/* Track ID Section */}
//         <View className="bg-white px-5 py-6 mb-2">
//             <View className="flex-row justify-between items-center mb-4">
//                 <View>
//                     <Text className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Tracking ID</Text>
//                     <Text className="font-bold text-gray-900 text-lg">{parcel.tracking_no || `TRK-${parcel.id}`}</Text>
//                 </View>
//                 <View>
//                      {parcel.parcel_type && (
//                          <View className="bg-gray-100 p-2 rounded-lg">
//                              <Package size={20} color="#4b5563" />
//                          </View>
//                      )}
//                 </View>
//             </View>
//             <View className="flex-row items-center gap-4">
//                  <View className="flex-row items-center bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
//                     <Box size={14} color="#6b7280" className="mr-2" />
//                     <Text className="text-gray-700 font-medium text-xs">{parcel.parcel_weight} kg</Text>
//                  </View>
//                  <View className="flex-row items-center bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
//                     <Calendar size={14} color="#6b7280" className="mr-2" />
//                     <Text className="text-gray-700 font-medium text-xs">{new Date(parcel.createdAt).toLocaleDateString()}</Text>
//                  </View>
//             </View>
//         </View>

//         {/* Timeline Visual */}
//         <View className="bg-white p-5 mb-2 mx-5 mt-4 rounded-xl shadow-sm border border-gray-100">
//              <View className="relative pl-4 border-l-2 border-dashed border-gray-200 ml-2 space-y-8 pb-2">
//                 {/* Sender */}
//                 <View className="relative">
//                     <View className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${isPending ? 'bg-blue-500' : 'bg-gray-300'}`} />
//                     <Text className="text-xs text-gray-500 mb-1">Pickup Location</Text>
//                     <Text className="text-base font-bold text-gray-900 mb-1">{parcel.senderInfo?.name || 'Sender'}</Text>
//                     <Text className="text-gray-600 text-sm leading-relaxed">{parcel.pickup_location}</Text>
//                      {parcel.senderInfo?.phone && (
//                         <Pressable className="flex-row items-center mt-2 bg-gray-50 self-start px-3 py-1.5 rounded-full border border-gray-100">
//                             <Phone size={12} color="#4b5563" className="mr-1.5" />
//                             <Text className="text-xs font-medium text-gray-700">{parcel.senderInfo.phone}</Text>
//                         </Pressable>
//                     )}
//                 </View>

//                 {/* Receiver */}
//                 <View className="relative">
//                      <View className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${isDelivered ? 'bg-green-500' : 'bg-blue-500'}`} />
//                     <Text className="text-xs text-gray-500 mb-1">Delivery Location</Text>
//                     <Text className="text-base font-bold text-gray-900 mb-1">{parcel.receiverInfo?.name || 'Receiver'}</Text>
//                     <Text className="text-gray-600 text-sm leading-relaxed">{parcel.delivery_location}</Text>
//                      {parcel.receiverInfo?.phone && (
//                         <Pressable className="flex-row items-center mt-2 bg-gray-50 self-start px-3 py-1.5 rounded-full border border-gray-100">
//                             <Phone size={12} color="#4b5563" className="mr-1.5" />
//                             <Text className="text-xs font-medium text-gray-700">{parcel.receiverInfo.phone}</Text>
//                         </Pressable>
//                     )}
//                 </View>
//              </View>
//         </View>


//         {/* Additional Details */}
//         <View className="px-5 mt-2">
//             <Text className="text-gray-900 font-bold text-lg mb-4">Payment Details</Text>
//             <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3">
//                  <View className="flex-row justify-between">
//                      <Text className="text-gray-500">Delivery Fee</Text>
//                      <Text className="font-semibold text-gray-900">${parcel.delivery_fee || '0.00'}</Text>
//                  </View>
//                   <View className="flex-row justify-between">
//                      <Text className="text-gray-500">Value</Text>
//                      <Text className="font-semibold text-gray-900">${parcel.parcel_value || '0.00'}</Text>
//                  </View>
//                   <View className="h-[1px] bg-gray-100 my-1" />
//                   <View className="flex-row justify-between">
//                      <Text className="text-gray-500 font-medium">Payment Status</Text>
//                      <Text className={`font-bold capitalize ${parcel.payment_status === 'paid' ? 'text-green-600' : 'text-orange-500'}`}>
//                         {parcel.payment_status || 'Pending'}
//                      </Text>
//                  </View>
//             </View>
//         </View>

//       </ScrollView>

//       {/* Action Buttons Footer */}
//       <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
//         {isPending && (
//             <Pressable 
//                 onPress={handleStartTrip}
//                 className="bg-blue-600 rounded-xl py-4 items-center shadow-md active:bg-blue-700"
//             >
//                 <View className="flex-row items-center">
//                     <Truck size={20} color="white" className="mr-2" />
//                     <Text className="text-white font-bold text-lg">Start Trip</Text>
//                 </View>
//             </Pressable>
//         )}

//         {isOngoing && (
//              <Pressable 
//                 onPress={handleMarkAsDelivered}
//                 className="bg-green-600 rounded-xl py-4 items-center shadow-md active:bg-green-700"
//             >
//                 <View className="flex-row items-center">
//                     <CheckCircleIcon />
//                     <Text className="text-white font-bold text-lg ml-2">Mark as Delivered</Text>
//                 </View>
//             </Pressable>
//         )}

//          {isDelivered && (
//              <View className="bg-gray-100 rounded-xl py-4 items-center">
//                 <Text className="text-gray-500 font-bold text-lg">Completed</Text>
//             </View>
//         )}
        
//          {(isReturn || isCancelled) && (
//              <View className="bg-red-50 rounded-xl py-4 items-center border border-red-100">
//                 <Text className="text-red-500 font-bold text-lg capitalize">{parcel.parcel_status}</Text>
//             </View>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

// function CheckCircleIcon() {
//     return (
//         <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
//              <Check size={14} color="white" strokeWidth={3} />
//         </View>
//     )
// }
