import { View, Text, ScrollView, Pressable, Platform, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Phone, Truck, Check, Info } from 'lucide-react-native';
import { useState } from 'react';
import { useParcelStore } from '@/store/useParcelStore';
import { useToastStore } from '@/store/useToastStore';
import Svg, { Path, G, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

// Custom Truck Icon SVG Component
function TruckIcon() {
  return (
    <Svg width="30" height="34" viewBox="0 0 30 34" fill="none">
      <Defs>
        <Filter id="filter0_d_417_2892" x="0" y="0" width="30" height="33.25" filterUnits="userSpaceOnUse">
          <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
          <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <FeOffset dy="1"/>
          <FeGaussianBlur stdDeviation="1"/>
          <FeComposite in2="hardAlpha" operator="out"/>
          <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_417_2892"/>
          <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_417_2892" result="shape"/>
        </Filter>
      </Defs>
      <G filter="url(#filter0_d_417_2892)">
        <Path d="M28 21.4353C28 24.1704 25.7827 26.3877 23.0476 26.3877H21.3536C20.0613 26.3877 18.8201 26.8928 17.8951 27.7953L15.6494 29.9863C15.2887 30.3379 14.7131 30.3381 14.3525 29.9863L12.1079 27.7958C11.1828 26.893 9.94152 26.3877 8.64899 26.3877H6.95238C4.21726 26.3877 2 24.1704 2 21.4353V5.95238C2 3.21726 4.21726 1 6.95238 1H23.0476C25.7827 1 28 3.21726 28 5.95238V21.4353Z" fill="white"/>
        <Path d="M20.625 18.25C20.625 19.2855 19.7855 20.125 18.75 20.125C17.7145 20.125 16.875 19.2855 16.875 18.25C16.875 17.2145 17.7145 16.375 18.75 16.375C19.7855 16.375 20.625 17.2145 20.625 18.25Z" stroke="#1D92ED" strokeWidth="1.125"/>
        <Path d="M13.125 18.25C13.125 19.2855 12.2855 20.125 11.25 20.125C10.2145 20.125 9.375 19.2855 9.375 18.25C9.375 17.2145 10.2145 16.375 11.25 16.375C12.2855 16.375 13.125 17.2145 13.125 18.25Z" stroke="#1D92ED" strokeWidth="1.125"/>
        <Path d="M16.875 18.25H13.125M7.5 8.125H15C16.0606 8.125 16.591 8.125 16.9205 8.45451C17.25 8.78401 17.25 9.31434 17.25 10.375V16.75M17.625 10H18.976C19.5983 10 19.9094 10 20.1673 10.146C20.4252 10.292 20.5853 10.5588 20.9054 11.0924L22.1794 13.2156C22.3387 13.4811 22.4183 13.6139 22.4592 13.7613C22.5 13.9087 22.5 14.0635 22.5 14.3733V16.375C22.5 17.0759 22.5 17.4264 22.3492 17.6875C22.2505 17.8585 22.1085 18.0005 21.9375 18.0992C21.6764 18.25 21.3259 18.25 20.625 18.25M7.5 14.875V16.375C7.5 17.0759 7.5 17.4264 7.65072 17.6875C7.74946 17.8585 7.89148 18.0005 8.0625 18.0992C8.32356 18.25 8.67403 18.25 9.375 18.25" stroke="#1D92ED" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M7.5 10.375H12M7.5 12.625H10.5" stroke="#1D92ED" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
      </G>
    </Svg>
  );
}

// CheckCircle Icon Component for Delivered Button
function CheckCircleIcon() {
  return (
    <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
      <Check size={14} color="white" strokeWidth={3} />
    </View>
  );
}

// Helper function to format date
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return 'N/A';
  }
};

// Helper function to extract location name (last part)
const getLocationName = (location: string | undefined): string => {
  if (!location) return 'Unknown';
  const parts = location.split(',');
  return parts[parts.length - 2].trim();
};

function RejectOrderModal({ visible, onClose, onConfirm }: { visible: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50 px-5">
        <View className="bg-white rounded-3xl p-6 w-full max-w-sm items-center">
          <View className="w-12 h-12 rounded-full bg-red-100 items-center justify-center mb-4">
            <Info size={24} color="#DC2626" />
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-2">Reject Order</Text>
          <Text className="text-gray-500 text-center mb-6">
            Are you sure you want to reject the order?
          </Text>
          <View className="flex-row gap-3 w-full">
            <Pressable 
              onPress={onClose}
              className="flex-1 py-3 rounded-full border border-gray-300 items-center"
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </Pressable>
            <Pressable 
              onPress={onConfirm}
              className="flex-1 py-3 rounded-full bg-red-600 items-center"
            >
              <Text className="text-white font-semibold">Reject</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function ParcelDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { parcels, startTrip, markAsDelivered } = useParcelStore();
  const { showToast } = useToastStore();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  
  const parcel = parcels.find((p) => p.id === id);

  if (!parcel) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-gray-500 font-medium text-lg">Parcel not found</Text>
        <Pressable onPress={() => router.back()} className="mt-4 px-4 py-2 bg-blue-500 rounded-lg">
          <Text className="text-white">Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const isPending = parcel.parcel_status === 'pending';
  const isOngoing = parcel.parcel_status === 'ongoing';
  const isDelivered = parcel.parcel_status === 'delivered';
  const isReturn = parcel.parcel_status === 'return';
  const isCancelled = parcel.parcel_status === 'cancelled';

  const handleStartTrip = () => {
    startTrip(parcel.id);
    showToast('Trip Started Successfully', 'success');
  };

  const handleMarkAsDelivered = () => {
    markAsDelivered(parcel.id);
    showToast('Parcel Marked as Delivered', 'success');
  };

  const handleAccept = () => {
    setHasAccepted(true);
    showToast('Order Accepted', 'success');
  };

  const handleRejectConfirm = () => {
    setShowRejectModal(false);
    showToast('Order Rejected', 'success'); // In real app, update status
    router.back();
  };

  // Extract dates
  const pickupLocationName = getLocationName(parcel.pickup_location);
  const deliveryLocationName = getLocationName(parcel.delivery_location);
  const dispatchDate = formatDate(parcel.createdAt);
  const deliveryDate = formatDate(parcel.estimated_delivery || parcel.actual_delivery);

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center flex-1">
          <Pressable onPress={() => router.back()} className="mr-3 p-2 -ml-2">
            <ArrowLeft size={24} color="#000000" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-900">Delivery Details</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${isDelivered ? 'bg-green-100' : isOngoing ? 'bg-blue-100' : isPending ? 'bg-yellow-100' : 'bg-red-100'}`}>
          <Text className={`text-xs font-semibold capitalize ${isDelivered ? 'text-green-700' : isOngoing ? 'text-blue-700' : isPending ? 'text-yellow-700' : 'text-red-700'}`}>
            {parcel.parcel_status}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Track ID Section */}
        <View className="px-5 pt-2 pb-6">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-sm text-gray-600">Track ID:</Text>
            <Text className="text-lg font-bold text-gray-900">{parcel.tracking_no || 'N/A'}</Text>
          </View>
        </View>

        {/* Timeline Card with Shadow */}
        <View className="mx-5 mb-6 bg-white rounded-2xl p-6" 
          style={{
            shadowColor: '#979393',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            elevation: 8,
          }}>
          
          {/* Timeline Header with Dates */}
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-xs text-gray-600 mb-1">{dispatchDate}</Text>
              <Text className="text-sm font-semibold text-gray-900">{pickupLocationName}</Text>
            </View>
            <View>
              <Text className="text-xs text-gray-600 mb-1 text-right">{deliveryDate}</Text>
              <Text className="text-sm font-semibold text-gray-900">{deliveryLocationName}</Text>
            </View>
          </View>

          {/* Timeline Progress Bar */}
          <View className="relative mb-8">
            {/* Background line */}
            <View className="absolute left-0 right-0 top-1/2 h-0.5 bg-blue-500" style={{ transform: [{ translateY: -1 }] }} />
            
            {/* Progress dots */}
            <View className="flex-row justify-between items-center">
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              
              {/* Truck icon positioned on timeline */}
              <View className="absolute" style={{ left: '60%', top: -25, transform: [{ translateX: -15 }] }}>
                <TruckIcon />
              </View>
              
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
            </View>
          </View>

          {/* From Section */}
          <View className="mb-6">
            <Text className="text-xs text-gray-500 mb-2">From</Text>
            <Text className="text-base font-bold text-gray-900 mb-3">
              {parcel.senderInfo?.name || parcel.sellerInfo?.name || 'Unknown Sender'}
            </Text>
            
            <View className="flex-row items-start mb-2">
              <MapPin size={16} color="#6B7280" style={{ marginTop: 2, marginRight: 8 }} />
              <Text className="text-sm text-gray-700 flex-1">
                {parcel.pickup_location || parcel.senderInfo?.address || 'Address not available'}
              </Text>
            </View>
            
            {(parcel.senderInfo?.phone || parcel.sellerInfo?.phone) && (
              <View className="flex-row items-center">
                <Phone size={16} color="#6B7280" style={{ marginRight: 8 }} />
                <Text className="text-sm text-gray-700">
                  {parcel.senderInfo?.phone || parcel.sellerInfo?.phone}
                </Text>
              </View>
            )}
          </View>

          {/* To Section */}
          <View className="mb-6">
            <Text className="text-xs text-gray-500 mb-2">To</Text>
            <Text className="text-base font-bold text-gray-900 mb-3">
              {parcel.receiverInfo?.name || 'Unknown Receiver'}
            </Text>
            
            <View className="flex-row items-start mb-2">
              <MapPin size={16} color="#6B7280" style={{ marginTop: 2, marginRight: 8 }} />
              <Text className="text-sm text-gray-700 flex-1">
                {parcel.delivery_location || parcel.receiverInfo?.address || 'Address not available'}
              </Text>
            </View>
            
            {parcel.receiverInfo?.phone && (
              <View className="flex-row items-center">
                <Phone size={16} color="#6B7280" style={{ marginRight: 8 }} />
                <Text className="text-sm text-gray-700">{parcel.receiverInfo.phone}</Text>
              </View>
            )}
          </View>

          {/* Date Information */}
          <View className="flex-row justify-between border-t border-gray-100 pt-4 mb-4">
            <View className="flex-1">
              <Text className="text-xs text-gray-500 mb-1">Date of dispatch</Text>
              <Text className="text-sm font-semibold text-gray-900">{dispatchDate}</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-xs text-gray-500 mb-1">
                {isDelivered ? 'Date of delivery' : 'Estimated delivery'}
              </Text>
              <Text className="text-sm font-semibold text-gray-900">{deliveryDate}</Text>
            </View>
          </View>

          {/* Parcel Details */}
          <View className="flex-row justify-between border-t border-gray-100 pt-4">
            <View className="flex-1">
              <Text className="text-xs text-gray-500 mb-1">Parcel Type</Text>
              <Text className="text-sm font-semibold text-gray-900 capitalize">
                {parcel.parcel_type || 'N/A'}
              </Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-xs text-gray-500 mb-1">Parcel Weight</Text>
              <Text className="text-sm font-semibold text-gray-900">
                {parcel.parcel_weight ? `${parcel.parcel_weight} Kg` : 'N/A'}
              </Text>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Action Buttons Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {isPending && !hasAccepted && (
          <View className="flex-row gap-3">
             <Pressable 
              onPress={() => setShowRejectModal(true)}
              className="flex-1 bg-red-50 py-4 rounded-xl items-center"
            >
              <Text className="text-red-500 font-bold text-lg">Reject</Text>
            </Pressable>
            <Pressable 
              onPress={handleAccept}
              className="flex-1 bg-green-600 py-4 rounded-xl items-center shadow-md active:bg-green-700"
            >
              <Text className="text-white font-bold text-lg">Accept</Text>
            </Pressable>
          </View>
        )}

        {isPending && hasAccepted && (
          <Pressable 
            onPress={handleStartTrip}
            className="bg-blue-600 rounded-xl py-4 items-center shadow-md active:bg-blue-700"
          >
            <View className="flex-row items-center">
              <Truck size={20} color="white" className="mr-2" />
              <Text className="text-white font-bold text-lg">Start Trip</Text>
            </View>
          </Pressable>
        )}

        {isOngoing && (
          <Pressable 
            onPress={handleMarkAsDelivered}
            className="bg-green-600 rounded-xl py-4 items-center shadow-md active:bg-green-700"
          >
            <View className="flex-row items-center">
              <CheckCircleIcon />
              <Text className="text-white font-bold text-lg ml-2">Mark as Delivered</Text>
            </View>
          </Pressable>
        )}

        {isDelivered && (
          <View className="bg-gray-100 rounded-xl py-4 items-center">
            <Text className="text-gray-500 font-bold text-lg">Completed</Text>
          </View>
        )}
        
        {(isReturn || isCancelled) && (
          <View className="bg-red-50 rounded-xl py-4 items-center border border-red-100">
            <Text className="text-red-500 font-bold text-lg capitalize">{parcel.parcel_status}</Text>
          </View>
        )}
      </View>
      <RejectOrderModal 
        visible={showRejectModal} 
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleRejectConfirm}
      />
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
