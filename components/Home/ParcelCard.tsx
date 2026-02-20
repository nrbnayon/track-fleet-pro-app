import React, { useState } from 'react';
import { View, Text, Pressable, Modal, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { PickupMapPin, DestinationMapPin } from '@/components/icons/MapPinIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Info } from 'lucide-react-native';
import { useParcelStore, Parcel } from '@/store/useParcelStore';
import { useToastStore } from '@/store/useToastStore';

interface ParcelCardProps {
  parcel: Parcel;
}

function RejectConfirmModal({
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 20 }}>
        <View style={{ backgroundColor: 'white', borderRadius: 24, padding: 24, width: '100%', maxWidth: 360, alignItems: 'center' }}>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <Info size={24} color="#DC2626" />
          </View>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 8 }}>Reject Order</Text>
          <Text style={{ color: '#6B7280', textAlign: 'center', marginBottom: 24, lineHeight: 20 }}>
            Are you sure you want to reject this order? This action cannot be undone.
          </Text>
          <View style={{ flexDirection: 'row', gap: 12, width: '100%' }}>
            <Pressable
              onPress={onClose}
              disabled={loading}
              style={{ flex: 1, paddingVertical: 12, borderRadius: 50, borderWidth: 1, borderColor: '#D1D5DB', alignItems: 'center' }}
            >
              <Text style={{ color: '#374151', fontWeight: '600' }}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              disabled={loading}
              style={{ flex: 1, paddingVertical: 12, borderRadius: 50, backgroundColor: '#DC2626', alignItems: 'center' }}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={{ color: 'white', fontWeight: '600' }}>Reject</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export const ParcelCard: React.FC<ParcelCardProps> = ({ parcel }) => {
  const { acceptOrder, rejectOrder, startTrip } = useParcelStore();
  const { showToast } = useToastStore();
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [localLoading, setLocalLoading] = useState<string | null>(null);

  const isPending = parcel.status === 'PENDING';
  const isAssigned = parcel.status === 'ASSIGNED';
  const isOngoing = parcel.status === 'ONGOING';
  const isDelivered = parcel.status === 'DELIVERED';

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Returns only the first meaningful segment of a location string
  const getShortLocation = (location: string) => {
    const first = (location || '').split(',')[0].trim();
    return first || 'Unknown';
  };

  const handleAccept = async () => {
    setLocalLoading('accept');
    const success = await acceptOrder(parcel.id);
    setLocalLoading(null);
    if (success) {
      showToast('Order accepted successfully!', 'success');
      router.push({ pathname: '/parcel/[id]', params: { id: parcel.id } });
    } else {
      showToast('Failed to accept order. Please try again.', 'error');
    }
  };

  const handleRejectConfirm = async () => {
    setLocalLoading('reject');
    const success = await rejectOrder(parcel.id);
    setLocalLoading(null);
    setShowRejectModal(false);
    if (success) {
      showToast('Order rejected.', 'info');
    } else {
      showToast('Failed to reject order. Please try again.', 'error');
    }
  };

  const handleStartTrip = async () => {
    setLocalLoading('start');
    const success = await startTrip(parcel.id);
    setLocalLoading(null);
    if (success) {
      showToast('Trip started! Parcel is now ongoing.', 'success');
      router.push({ pathname: '/parcel/[id]', params: { id: parcel.id } });
    } else {
      showToast('Failed to start trip. Please try again.', 'error');
    }
  };

  // Status badge config
  const statusStyle = isDelivered
    ? { bg: '#D1FAE5', text: '#065F46' }
    : isOngoing
    ? { bg: '#DBEAFE', text: '#1E40AF' }
    : isPending
    ? { bg: '#FEF3C7', text: '#92400E' }
    : { bg: '#EDE9FE', text: '#5B21B6' }; // ASSIGNED = indigo

  return (
    <>
      <Pressable
        style={[
          {
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          },
          shadows.card,
        ]}
        onPress={() => router.push({ pathname: '/parcel/[id]', params: { id: parcel.id } })}
      >
        {/* ── Header: tracking ID + status badge ── */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <Text
            style={{ color: '#6B7280', fontWeight: '500', fontSize: 11, flexShrink: 1, marginRight: 8 }}
            numberOfLines={1}
          >
            {parcel.tracking_id}
          </Text>
          <View style={{ backgroundColor: statusStyle.bg, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 50 }}>
            <Text style={{ color: statusStyle.text, fontSize: 10, fontWeight: '700' }}>
              {parcel.status}
            </Text>
          </View>
        </View>

        {/* ── Timeline + location info ── */}
        <View style={{ flexDirection: 'row', marginBottom: 14 }}>

          {/* Left: pin icons + gradient line */}
          <View style={{ marginRight: 12, alignItems: 'center', width: 32 }}>
            <View
              style={{
                width: 32, height: 32, borderRadius: 8,
                backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
                shadowColor: '#0A0D12', shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.12, shadowRadius: 10, elevation: 3,
              }}
            >
              <PickupMapPin size={20} />
            </View>
            <LinearGradient
              colors={['#609AFE', '#FF4E74']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ width: 2, flex: 1, marginVertical: -4 }}
            />
            <View
              style={{
                width: 32, height: 32, borderRadius: 8,
                backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
                zIndex: 10,
                shadowColor: '#0A0D12', shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.12, shadowRadius: 10, elevation: 3,
              }}
            >
              <DestinationMapPin size={20} />
            </View>
          </View>

          {/* Right: all text info — two rows, each split into left-label and right-label */}
          <View style={{ flex: 1, justifyContent: 'space-between' }}>

            {/* Row 1: Pickup | Customer */}
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              {/* Pickup — takes most of the width */}
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={{ color: '#9CA3AF', fontSize: 11, marginBottom: 2 }}>Pickup</Text>
                <Text
                  style={{ fontWeight: '600', color: '#1F2937', fontSize: 13 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {getShortLocation(parcel.pickup_location)}
                </Text>
              </View>
              {/* Customer — fixed width so it never pushes into pickup */}
              <View style={{ maxWidth: 110, alignItems: 'flex-end' }}>
                <Text style={{ color: '#9CA3AF', fontSize: 11, marginBottom: 2 }}>Customer</Text>
                <Text
                  style={{ fontWeight: '500', color: '#1F2937', fontSize: 12, textAlign: 'right' }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {parcel.customer_name}
                </Text>
              </View>
            </View>

            {/* Row 2: Destination | Est. Delivery */}
            <View style={{ flexDirection: 'row' }}>
              {/* Destination */}
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={{ color: '#9CA3AF', fontSize: 11, marginBottom: 2 }}>Destination</Text>
                <Text
                  style={{ fontWeight: '600', color: '#1F2937', fontSize: 13 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {getShortLocation(parcel.delivery_location)}
                </Text>
              </View>
              {/* Est. Delivery */}
              <View style={{ maxWidth: 110, alignItems: 'flex-end' }}>
                <Text style={{ color: '#9CA3AF', fontSize: 11, marginBottom: 2 }}>Est. Delivery</Text>
                <Text
                  style={{ fontWeight: '500', color: '#1F2937', fontSize: 12, textAlign: 'right' }}
                  numberOfLines={1}
                >
                  {formatDate(parcel.estimated_delivary_date)}
                </Text>
              </View>
            </View>

          </View>
        </View>

        {/* ── Divider ── */}
        <View style={{ height: 1, backgroundColor: '#F3F4F6', marginBottom: 12 }} />

        {/* ── Action Buttons ── */}

        {/* PENDING → Reject + Accept */}
        {isPending && (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable
              onPress={(e) => { e.stopPropagation?.(); setShowRejectModal(true); }}
              disabled={!!localLoading}
              style={{
                flex: 1, paddingVertical: 11, borderRadius: 12,
                backgroundColor: '#FEF2F2', borderWidth: 1, borderColor: '#FECACA',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#EF4444', fontWeight: '700', fontSize: 14 }}>Reject</Text>
            </Pressable>
            <Pressable
              onPress={(e) => { e.stopPropagation?.(); handleAccept(); }}
              disabled={!!localLoading}
              style={{
                flex: 1, paddingVertical: 11, borderRadius: 12,
                backgroundColor: '#16A34A', alignItems: 'center',
              }}
            >
              {localLoading === 'accept' ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 14 }}>Accept</Text>
              )}
            </Pressable>
          </View>
        )}

        {/* ASSIGNED → Start Trip */}
        {isAssigned && (
          <Pressable
            onPress={(e) => { e.stopPropagation?.(); handleStartTrip(); }}
            disabled={!!localLoading}
            style={{
              paddingVertical: 12, borderRadius: 50,
              backgroundColor: '#2563EB', alignItems: 'center',
            }}
          >
            {localLoading === 'start' ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>🚚  Start Trip</Text>
            )}
          </Pressable>
        )}

        {/* ONGOING */}
        {isOngoing && (
          <View style={{ paddingVertical: 12, borderRadius: 50, backgroundColor: '#2563EB', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Ongoing</Text>
          </View>
        )}

        {/* DELIVERED */}
        {isDelivered && (
          <View style={{ paddingVertical: 12, borderRadius: 50, backgroundColor: '#16A34A', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>✓  Delivered</Text>
          </View>
        )}
      </Pressable>

      {/* Reject confirmation modal */}
      <RejectConfirmModal
        visible={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleRejectConfirm}
        loading={localLoading === 'reject'}
      />
    </>
  );
};