// components/modals/EmergencyAlertModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
} from 'react-native';
import { X } from 'lucide-react-native';

interface EmergencyAlertModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const EmergencyAlertModal: React.FC<EmergencyAlertModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center px-5"
        onPress={onClose}
      >
        <Pressable
          className="bg-white rounded-3xl p-8 w-full max-w-md items-center relative"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <Pressable
            onPress={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full items-center justify-center z-10"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={20} color="#6b7280" />
          </Pressable>

          {/* Illustration */}
          <View className="mb-6">
            <Image
              source={require('@/assets/images/emergency-alert.png')}
              className="w-64 h-48"
              resizeMode="contain"
            />
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
            Turn on the Location!
          </Text>

          {/* Description */}
          <Text className="text-gray-600 text-center mb-8 leading-6">
            You can not turn of your location while on a delivery. Turn it on so that the parcel can be tracked.
          </Text>

          {/* Button */}
          <Pressable
            className="bg-primary rounded-full py-4 w-full items-center"
            onPress={onConfirm}
          >
            <Text className="text-white font-bold text-lg">
              Turn on Location
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};