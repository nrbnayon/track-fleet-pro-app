// app/parcel/[id].tsx
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
  Modal,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import { ParcelDetailSkeleton } from '@/components/ui/SkeletonCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Phone, Truck, Info } from 'lucide-react-native';
import { useState, useEffect, useRef } from 'react';
import { useParcelStore } from '@/store/useParcelStore';
import { useToastStore } from '@/store/useToastStore';
import {
  TruckIcon,
  ParcelBoxIcon,
  DeliveredIcon,
  CheckCircleIcon,
} from '@/components/icons/DeliveryIcons';

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
  const parts = location.split(',').filter((part) => part.trim());
  if (parts.length === 0) return 'Unknown';
  if (parts.length === 1) return parts[0].trim();
  const index = parts.length >= 2 ? parts.length - 2 : parts.length - 1;
  return parts[index].trim();
};

function RejectOrderModal({
  visible,
  onClose,
  onConfirm,
  loading,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <View className="flex-1 justify-center items-center bg-black/50 px-5">
        <View className="bg-white rounded-3xl p-6 w-full max-w-sm items-center">
          <View className="w-12 h-12 rounded-full bg-red-100 items-center justify-center mb-4">
            <Info size={24} color="#DC2626" />
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-2">Reject Order</Text>
          <Text className="text-gray-500 text-center mb-6">
            Are you sure you want to reject this order? This action cannot be undone.
          </Text>
          <View className="flex-row gap-3 w-full">
            <Pressable
              onPress={onClose}
              disabled={loading}
              className="flex-1 py-3 rounded-full border border-gray-300 items-center"
            >
              <Text className="text-gray-700 font-semibold">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              disabled={loading}
              className="flex-1 py-3 rounded-full bg-red-600 items-center"
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white font-semibold">Reject</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function ParcelDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    detailParcel,
    detailLoading,
    fetchParcelById,
    acceptOrder,
    rejectOrder,
    startTrip,
    markAsDelivered,
  } = useParcelStore();
  const { showToast } = useToastStore();

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (id) fetchParcelById(id);
  }, [id]);

  const parcel = detailParcel;

  const isPending = parcel?.status === 'PENDING';
  const isAssigned = parcel?.status === 'ASSIGNED';
  const isOngoing = parcel?.status === 'ONGOING';
  const isDelivered = parcel?.status === 'DELIVERED';

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

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (detailLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: 'white', paddingTop: Platform.OS === 'android' ? 5 : 0 }}
      >
        <ParcelDetailSkeleton />
      </SafeAreaView>
    );
  }

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

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAccept = async () => {
    setActionLoading('accept');
    const success = await acceptOrder(parcel.id);
    setActionLoading(null);
    if (success) {
      showToast('Order accepted successfully!', 'success');
    } else {
      showToast('Failed to accept. Please try again.', 'error');
    }
  };

  const handleRejectConfirm = async () => {
    setActionLoading('reject');
    const success = await rejectOrder(parcel.id);
    setActionLoading(null);
    setShowRejectModal(false);
    if (success) {
      showToast('Order rejected.', 'info');
      router.back();
    } else {
      showToast('Failed to reject. Please try again.', 'error');
    }
  };

  const handleStartTrip = async () => {
    setActionLoading('start');
    const success = await startTrip(parcel.id);
    setActionLoading(null);
    if (success) {
      showToast('Trip started! Parcel is now ongoing.', 'success');
    } else {
      showToast('Failed to start trip. Please try again.', 'error');
    }
  };

  const handleMarkAsDelivered = async () => {
    setActionLoading('deliver');
    const success = await markAsDelivered(parcel.id);
    setActionLoading(null);
    if (success) {
      showToast('Parcel marked as delivered! 🎉', 'success');
    } else {
      showToast('Failed to mark as delivered. Please try again.', 'error');
    }
  };

  // ── Derived display values ────────────────────────────────────────────────
  const pickupLocationName = getLocationName(parcel.pickup_location);
  const deliveryLocationName = getLocationName(parcel.delivery_location);
  const deliveryDate = formatDate(parcel.estimated_delivary_date);

  const statusColor = isDelivered
    ? { bg: 'bg-green-100', text: 'text-green-700' }
    : isOngoing
    ? { bg: 'bg-blue-100', text: 'text-blue-700' }
    : isPending
    ? { bg: 'bg-yellow-100', text: 'text-yellow-700' }
    : { bg: 'bg-indigo-100', text: 'text-indigo-700' };

  const renderTimelineIcon = () => {
    if (isPending || isAssigned) {
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
          style={{ left, top: -25, transform: [{ translateX: -15 }] }}
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

    return <View />;
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: Platform.OS === 'android' ? 5 : 0 }}
    >
      {/* ── Top bar ── */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <View className="flex-row items-center flex-1">
          <Pressable onPress={() => router.back()} className="mr-3 p-2 -ml-2">
            <ArrowLeft size={24} color="#000000" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-900">Delivery Details</Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${statusColor.bg}`}>
          <Text className={`text-xs font-semibold ${statusColor.text}`}>
            {parcel.status}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Tracking ID */}
        <View className="px-5 pt-2 pb-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-sm text-secondary">Track ID:</Text>
            <Text className="text-lg font-bold text-gray-900">{parcel.tracking_id}</Text>
          </View>
        </View>

        {/* ── Journey card ── */}
        <View
          className="mx-5 mb-6 bg-white rounded-2xl p-6"
          style={{
            shadowColor: '#979393',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 30,
            elevation: 8,
          }}
        >
          {/* Route header */}
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-xs text-secondary mb-1">Pickup</Text>
              <Text className="text-sm font-semibold text-gray-900">{pickupLocationName}</Text>
            </View>
            <View>
              <Text className="text-xs text-secondary mb-1 text-right">Est. Delivery</Text>
              <Text className="text-sm font-semibold text-gray-900 text-right">{deliveryDate}</Text>
            </View>
          </View>

          {/* Animated progress line */}
          <View className="relative mb-8 mt-4">
            <View
              className="absolute left-0 right-0 top-1/2 h-0.5 bg-blue-500"
              style={{ transform: [{ translateY: -1 }] }}
            />
            <View className="flex-row justify-between items-center">
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
              <View className="w-3 h-3 rounded-full bg-blue-500 z-10" />
            </View>
            {renderTimelineIcon()}
          </View>

          {/* ── From (Seller info) ── */}
          <View className="mb-6">
            <Text className="text-xs text-gray-500 mb-2">From (Seller)</Text>
            <Text className="text-base font-bold text-gray-900 mb-3">
              {parcel.seller?.Full_name || 'Unknown Seller'}
            </Text>
            <View className="flex-row items-start mb-2">
              <MapPin size={16} color="#6B7280" style={{ marginTop: 2, marginRight: 8 }} />
              <Text className="text-sm text-gray-700 flex-1">{parcel.pickup_location}</Text>
            </View>
            {parcel.seller?.phone_number && (
              <View className="flex-row items-center">
                <Phone size={16} color="#6B7280" style={{ marginRight: 8 }} />
                <Text className="text-sm text-gray-700">{parcel.seller.phone_number}</Text>
              </View>
            )}
          </View>

          {/* ── To (Customer info) ── */}
          <View className="mb-6">
            <Text className="text-xs text-gray-500 mb-2">To (Customer)</Text>
            <Text className="text-base font-bold text-gray-900 mb-3">{parcel.customer_name}</Text>
            <View className="flex-row items-start mb-2">
              <MapPin size={16} color="#6B7280" style={{ marginTop: 2, marginRight: 8 }} />
              <Text className="text-sm text-gray-700 flex-1">{parcel.delivery_location}</Text>
            </View>
            {parcel.customer_phone && (
              <View className="flex-row items-center mb-1">
                <Phone size={16} color="#6B7280" style={{ marginRight: 8 }} />
                <Text className="text-sm text-gray-700">{parcel.customer_phone}</Text>
              </View>
            )}
          </View>

          {/* ── Parcel meta ── */}
          <View className="flex-row justify-between border-t border-gray-100 pt-4 mb-4">
            <View className="flex-1">
              <Text className="text-xs text-gray-500 mb-1">Parcel Title</Text>
              <Text className="text-sm font-semibold text-gray-900">{parcel.title || 'N/A'}</Text>
            </View>
            <View className="flex-1 items-end">
              <Text className="text-xs text-gray-500 mb-1">Distance</Text>
              <Text className="text-sm font-semibold text-gray-900">
                {parcel.appoximate_distance || 'N/A'}
              </Text>
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

          {parcel.special_instructions && (
            <View className="mt-4 pt-4 border-t border-gray-100">
              <Text className="text-xs text-gray-500 mb-1">Special Instructions</Text>
              <Text className="text-sm text-gray-700">{parcel.special_instructions}</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ── Bottom action bar ── */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {/* PENDING: Reject + Accept */}
        {isPending && (
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setShowRejectModal(true)}
              disabled={!!actionLoading}
              className="flex-1 bg-red-50 py-4 rounded-xl items-center border border-red-100 active:bg-red-100"
            >
              <Text className="text-red-500 font-bold text-lg">Reject</Text>
            </Pressable>
            <Pressable
              onPress={handleAccept}
              disabled={!!actionLoading}
              className="flex-1 bg-green-600 py-4 rounded-xl items-center active:bg-green-700"
            >
              {actionLoading === 'accept' ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">Accept</Text>
              )}
            </Pressable>
          </View>
        )}

        {/* ASSIGNED: Start Trip */}
        {isAssigned && (
          <Pressable
            onPress={handleStartTrip}
            disabled={!!actionLoading}
            className="bg-blue-600 rounded-xl py-4 items-center active:bg-blue-700"
          >
            {actionLoading === 'start' ? (
              <ActivityIndicator color="white" />
            ) : (
              <View className="flex-row items-center gap-2">
                <Truck size={20} color="white" />
                <Text className="text-white font-bold text-lg">Start Trip</Text>
              </View>
            )}
          </Pressable>
        )}

        {/* ONGOING: Mark as Delivered */}
        {isOngoing && (
          <Pressable
            onPress={handleMarkAsDelivered}
            disabled={!!actionLoading}
            className="bg-green-600 rounded-xl py-4 items-center active:bg-green-700"
          >
            {actionLoading === 'deliver' ? (
              <ActivityIndicator color="white" />
            ) : (
              <View className="flex-row items-center gap-2">
                <CheckCircleIcon />
                <Text className="text-white font-bold text-lg">Mark as Delivered</Text>
              </View>
            )}
          </Pressable>
        )}

        {/* DELIVERED: Completed state */}
        {isDelivered && (
          <View className="bg-gray-100 rounded-xl py-4 items-center">
            <Text className="text-gray-500 font-bold text-lg">✓ Completed</Text>
          </View>
        )}
      </View>

      {/* Reject confirmation modal */}
      <RejectOrderModal
        visible={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleRejectConfirm}
        loading={actionLoading === 'reject'}
      />
    </SafeAreaView>
  );
}
