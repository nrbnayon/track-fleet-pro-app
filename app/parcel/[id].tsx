// app/[id].tsx
import { View, Text, ScrollView, Pressable, Platform, Modal, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Phone, Truck, Info } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { useParcelStore } from '@/store/useParcelStore';
import { useToastStore } from '@/store/useToastStore';
import { TruckIcon, ParcelBoxIcon, DeliveredIcon, CheckCircleIcon } from '@/components/icons/DeliveryIcons';

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
  const { parcels, startTrip, markAsDelivered, acceptOrder, rejectOrder } = useParcelStore();
  const { showToast } = useToastStore();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  const parcel = parcels.find((p) => p.id === id);

  const isPending = parcel?.parcel_status === 'pending';
  const isOngoing = parcel?.parcel_status === 'ongoing';
  const isDelivered = parcel?.parcel_status === 'delivered';
  const isReturn = parcel?.parcel_status === 'return';
  const isCancelled = parcel?.parcel_status === 'cancelled';

  useEffect(() => {
    if (isOngoing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 8000,
            easing: Easing.linear,
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }),
        ])
      ).start();
    } else {
        animatedValue.setValue(0);
    }
  }, [isOngoing]);

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

  const handleStartTrip = () => {
    startTrip(parcel.id);
    showToast('Trip Started Successfully', 'success');
  };

  const handleMarkAsDelivered = () => {
    markAsDelivered(parcel.id);
    showToast('Parcel Marked as Delivered', 'success');
  };

  const handleAccept = () => {
    acceptOrder(parcel.id);
    showToast('Order Accepted', 'success');
  };

  const handleRejectConfirm = () => {
    rejectOrder(parcel.id);
    setShowRejectModal(false);
    showToast('Order Rejected', 'success');
    router.back();
  };

  const pickupLocationName = getLocationName(parcel.pickup_location);
  const deliveryLocationName = getLocationName(parcel.delivery_location);
  const dispatchDate = formatDate(parcel.createdAt);
  const deliveryDate = formatDate(parcel.estimated_delivery || parcel.actual_delivery);

  const renderTimelineIcon = () => {
    if (isPending) {
      return (
        <View className="absolute" style={{ left: '0%', top: -25, transform: [{ translateX: -15 }] }}>
          <ParcelBoxIcon />
        </View>
      );
    }
    
    if (isOngoing) {
      const left = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      });

      return (
        <Animated.View 
          className="absolute" 
          style={{ 
            left, 
            top: -25, 
            transform: [{ translateX: -15 }] 
          }}
        >
          <TruckIcon />
        </Animated.View>
      );
    }
    
    if (isDelivered) {
      return (
        <View className="absolute" style={{ left: '100%', top: -25, transform: [{ translateX: -15 }] }}>
          <DeliveredIcon />
        </View>
      );
    }
    
    return null;
  };

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
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
        
        <View className="px-5 pt-2 pb-6">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-sm text-gray-600">Track ID:</Text>
            <Text className="text-lg font-bold text-gray-900">{parcel.tracking_no || 'N/A'}</Text>
          </View>
        </View>

        <View className="mx-5 mb-6 bg-white rounded-2xl p-6" 
          style={{
            shadowColor: '#979393',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            elevation: 8,
          }}>
          
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

          <View className="relative mb-8 mt-4">
            <View className="absolute left-0 right-0 top-1/2 h-0.5 bg-blue-500" style={{ transform: [{ translateY: -1 }] }} />
            
            <View className="flex-row justify-between items-center">
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
            </View>
            
            {renderTimelineIcon()}
          </View>

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

      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {isPending && !parcel.isAccepted && (
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

        {isPending && parcel.isAccepted && (
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
