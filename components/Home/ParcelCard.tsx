import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { PickupMapPin, DestinationMapPin } from '@/components/icons/MapPinIcons';
import { LinearGradient } from 'expo-linear-gradient';

interface ParcelCardProps {
  parcel: any;
}

export const ParcelCard: React.FC<ParcelCardProps> = ({ parcel }) => {
  const isDelivered = parcel.parcel_status === 'delivered';
  const isOngoing = parcel.parcel_status === 'ongoing';

  const formatDateTime = (dateString: string) => {
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

  return (
    <Pressable
      className="bg-white rounded-2xl p-4 mb-4"
      style={shadows.card}
      onPress={() => router.push({ pathname: '/parcel/[id]', params: { id: parcel.id } })}
    >
      <View className="mb-4">
        <Text className="text-gray-500 font-medium text-xs">
          TRIP-2026-{parcel.id.padStart(3, '0')}
        </Text>
      </View>

      <View className="flex-row mb-6">
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
        <View className="flex-1 justify-between py-1">
          <View className="flex-row justify-between mb-6">
            <View>
              <Text className="text-gray-500 text-xs mb-1">Pickup</Text>
              <Text className="font-semibold text-gray-800">
                {getPickupLocation()}
              </Text>
            </View>
            <View>
              <Text className="text-gray-500 text-xs mb-1 text-right">
                Date of dispatch
              </Text>
              <Text className="font-medium text-gray-800 text-xs text-right">
                {formatDateTime(parcel.createdAt)}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View>
              <Text className="text-gray-500 text-xs mb-1">Destination:</Text>
              <Text className="font-semibold text-gray-800">
                {getDeliveryLocation()}
              </Text>
            </View>
            <View>
              <Text className="text-gray-500 text-xs mb-1 text-right">
                Date of delivery
              </Text>
              <Text className="font-medium text-gray-800 text-xs text-right">
                {formatDateTime(parcel.estimated_delivery)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Action Button */}
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