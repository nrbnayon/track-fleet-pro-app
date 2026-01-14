// components/ui/EmergencyButton.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import { shadows } from '@/lib/shadows';

interface EmergencyButtonProps {
  onPress: () => void;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onPress }) => {
  return (
    <View className="mt-8 mb-4">
      <Text className="text-lg font-semibold text-gray-800 mb-3">
        Emergency Alert
      </Text>
      <Pressable
        className="bg-red-600 rounded-full py-4 flex-row items-center justify-center"
        style={shadows.button}
        onPress={onPress}
      >
        <AlertTriangle size={20} color="white" />
        <Text className="text-white font-bold text-lg ml-2">Send Alert</Text>
      </Pressable>
      <Text className="text-center text-gray-500 text-sm mt-3">
        Press this button in case of any emergency
      </Text>
    </View>
  );
};