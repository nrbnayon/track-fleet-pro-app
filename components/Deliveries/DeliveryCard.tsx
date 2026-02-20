import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { PickupMapPin, DestinationMapPin } from '@/components/icons/MapPinIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Parcel } from '@/store/useParcelStore';

interface DeliveryCardProps {
  parcel: Parcel;
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({ parcel }) => {
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  };

  const getPickupLocation = () => {
    return (parcel.pickup_location || '').split(',')[0].trim() || 'Unknown';
  };

  const getDeliveryLocation = () => {
    return (parcel.delivery_location || '').split(',')[0].trim() || 'Unknown';
  };

  const getStatusColor = () => {
    switch (parcel.status) {
      case 'DELIVERED': return 'bg-green-100 text-green-600';
      case 'ONGOING': return 'bg-blue-100 text-blue-600';
      case 'ASSIGNED': return 'bg-yellow-100 text-yellow-600';
      case 'PENDING': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-secondary';
    }
  };

  const statusStyle = getStatusColor();
  const [bgClass, textClass] = statusStyle.split(' ');

  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-5"
      style={shadows.card}
      onPress={() => router.push({ pathname: '/parcel/[id]', params: { id: parcel.id } })}
    >
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-900 font-bold text-base">
          Track ID: #{parcel.tracking_id || `TRIP-${parcel.id}`}
        </Text>
        <View className={`px-3 py-1 rounded-full ${bgClass}`}>
          <Text className={`text-xs font-semibold capitalize ${textClass}`}>
            {parcel.status === 'PENDING' ? 'Active' : parcel.status.toLowerCase()}
          </Text>
        </View>
      </View>

      <View className="flex-row">
        {/* Timeline */}
        <View className="mr-4 items-center">
          <View 
            className="w-8 h-8 rounded-md items-center justify-center z-10"
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#0A0D12',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <PickupMapPin size={20} />
          </View>
          <LinearGradient
            colors={['#609AFE', '#FF4E74']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              width: 2,
              flex: 1,
              marginVertical: -4,
            }}
          />
          <View 
            className="w-8 h-8 rounded-md items-center justify-center z-10"
            style={{
              backgroundColor: '#FFFFFF',
              shadowColor: '#0A0D12',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.12,
              shadowRadius: 10,
              elevation: 3,
            }}
          >
            <DestinationMapPin size={20} />
          </View>
        </View>

        {/* Locations and Dates */}
        <View className="flex-1 gap-4">
          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text className="text-gray-900 font-semibold text-sm mb-1">Pickup</Text>
              <Text className="text-gray-500 text-xs text-wrap">
                {getPickupLocation()}
              </Text>
            </View>
            {/* Dispatch date removed as it is not in the store type */}
          </View>

          <View className="flex-row justify-between items-start">
            <View className="flex-1 mr-2">
              <Text className="text-gray-900 font-semibold text-sm mb-1">Destination:</Text>
              <Text className="text-gray-500 text-xs text-wrap">
                {getDeliveryLocation()}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-gray-900 font-semibold text-sm mb-1">
                {parcel.status === 'DELIVERED' ? 'Date of delivery' : 'Estimated delivery'}
              </Text>
              <Text className="text-gray-500 text-xs">
                {formatDateTime(parcel.estimated_delivary_date)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
