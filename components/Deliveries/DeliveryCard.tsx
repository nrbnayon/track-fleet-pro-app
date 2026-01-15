import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { PickupMapPin, DestinationMapPin } from '@/components/icons/MapPinIcons';
import { LinearGradient } from 'expo-linear-gradient';

interface DeliveryCardProps {
  parcel: any;
}

export const DeliveryCard: React.FC<DeliveryCardProps> = ({ parcel }) => {
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

  const getStatusColor = () => {
    switch (parcel.parcel_status) {
      case 'delivered': return 'bg-green-100 text-green-600';
      case 'ongoing': return 'bg-blue-100 text-blue-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
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
          Track ID: #{parcel.tracking_no || `TRIP-2026-${parcel.id.padStart(3, '0')}`}
        </Text>
        <View className={`px-3 py-1 rounded-full ${bgClass}`}>
          <Text className={`text-xs font-semibold capitalize ${textClass}`}>
            {parcel.parcel_status === 'pending' ? 'Active' : parcel.parcel_status}
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
            <View className="items-end">
              <Text className="text-gray-900 font-semibold text-sm mb-1">
                Date of dispatch
              </Text>
              <Text className="text-gray-500 text-xs">
                {formatDateTime(parcel.createdAt)}
              </Text>
            </View>
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
                {parcel.parcel_status === 'delivered' ? 'Date of delivery' : 'Estimated delivery'}
              </Text>
              <Text className="text-gray-500 text-xs">
                {formatDateTime(parcel.actual_delivery || parcel.estimated_delivery)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};