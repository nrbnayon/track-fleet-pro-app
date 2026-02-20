
import React, { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { X, AlertTriangle, ArrowLeft } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useParcelStore } from '@/store/useParcelStore';
import { useToastStore } from '@/store/useToastStore';

interface EmergencyAlertModalProps {
  visible: boolean;
  onClose: () => void;
}

const ISSUES = [
  { label: 'Vehicle Breakdown', value: 'VEHICLE_BREAKDOWN' },
  { label: 'Accident', value: 'ACCIDENT' },
  { label: 'Health Emergency', value: 'HEALTH_EMERGENCY' },
  { label: 'Safety Threat', value: 'SAFETY_THREAT' },
  { label: 'Other', value: 'OTHER' }
];

export const EmergencyAlertModal: React.FC<EmergencyAlertModalProps> = ({ visible, onClose }) => {
  const { sendEmergencyAlert, actionLoading } = useParcelStore();
  const { showToast } = useToastStore();
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSendPress = () => {
    if (selectedIssue) {
      setShowConfirmModal(true);
    }
  };

  const handleConfirmSend = async () => {
    if (!selectedIssue) return;
    
    const success = await sendEmergencyAlert(selectedIssue, description || 'Emergency alert reported');
    
    if (success) {
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } else {
      setShowConfirmModal(false);
      showToast('Failed to send emergency alert. Please try again.', 'error');
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccessModal(false);
    setSelectedIssue(null);
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center px-5 py-4 mt-2">
          <Pressable onPress={onClose} className="mr-4 p-2 -ml-2">
            <ArrowLeft size={24} color="#1f2937" />
          </Pressable>
        </View>

        <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 40 }}>
          <Text className="text-2xl font-bold text-foreground mb-6">Emergency Alert</Text>

          <Text className="text-lg font-semibold text-foreground mb-4">What's the issue?</Text>

          <View className="gap-4 mb-6">
            {ISSUES.map((issue) => (
              <Pressable
                key={issue.value}
                onPress={() => setSelectedIssue(issue.value)}
                className="flex-row items-center gap-3"
              >
                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                  selectedIssue === issue.value ? 'border-foreground' : 'border-foreground'
                }`}>
                  {selectedIssue === issue.value && (
                    <View className="w-3 h-3 rounded-full bg-foreground" />
                  )}
                </View>
                <Text className="text-gray-700 text-base">{issue.label}</Text>
              </Pressable>
            ))}
          </View>

          <Text className="text-secondary mb-4 text-base">Or</Text>

          <View className="bg-white border border-gray-200 rounded-xl p-4 h-32 mb-8">
            <TextInput
              placeholder="Describe reason here"
              placeholderTextColor="#9CA3AF"
              multiline
              value={description}
              onChangeText={setDescription}
              className="text-foreground text-base flex-1"
              textAlignVertical="top"
            />
          </View>

          <Pressable
            onPress={handleSendPress}
            className={`flex-row items-center justify-center py-4 rounded-full ${
              selectedIssue ? 'bg-red-600' : 'bg-red-300'
            }`}
            disabled={!selectedIssue}
          >
            <AlertTriangle size={24} color="white" className="mr-2" />
            <Text className="text-white font-bold text-lg ml-2">Send Alert</Text>
          </Pressable>
        </ScrollView>

        {/* Confirmation Overlay */}
        {showConfirmModal && (
          <View className="absolute inset-0 bg-black/50 justify-center items-center px-5 z-50">
            <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
              <Text className="text-xl font-bold text-foreground text-center mb-2">
                Send Emergency Alert?
              </Text>
              <Text className="text-gray-500 text-center mb-6">
                Admin & support will be notified
              </Text>

              <View className="flex-row gap-3">
                <Pressable
                  onPress={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 border border-blue-500 rounded-full items-center"
                >
                  <Text className="text-blue-500 font-bold text-base">Cancel</Text>
                </Pressable>
                <Pressable
                  onPress={handleConfirmSend}
                  disabled={actionLoading}
                  className="flex-1 py-3 bg-red-600 rounded-full items-center"
                >
                  {actionLoading ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <Text className="text-white font-bold text-base">Send</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {/* Success Overlay */}
        {showSuccessModal && (
          <View className="absolute inset-0 bg-black/50 justify-center items-center px-5 z-50">
            <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center relative">
              {/* Close Button */}
              <Pressable 
                onPress={handleSuccessDismiss}
                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full z-10"
              >
                <X size={20} color="#1f2937" />
              </Pressable>

              <View className="w-12 h-12 rounded-xl items-center justify-center mb-4 transform rotate-3">
                 <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                    <Path d="M6 0C4.4087 0 2.88258 0.632141 1.75736 1.75736C0.632141 2.88258 0 4.4087 0 6V18C0 19.5913 0.632141 21.1174 1.75736 22.2426C2.88258 23.3679 4.4087 24 6 24H18C19.5913 24 21.1174 23.3679 22.2426 22.2426C23.3679 21.1174 24 19.5913 24 18V6C24 4.4087 23.3679 2.88258 22.2426 1.75736C21.1174 0.632141 19.5913 0 18 0H6ZM18.66 7.248C18.859 7.4229 18.9804 7.66961 18.9977 7.93397C19.0149 8.19833 18.9266 8.45872 18.752 8.658L11.752 16.658C11.6619 16.7612 11.5516 16.8448 11.4279 16.9036C11.3042 16.9624 11.1697 16.9951 11.0329 16.9998C10.896 17.0045 10.7596 16.981 10.6321 16.9308C10.5047 16.8806 10.3889 16.8048 10.292 16.708L6.292 12.708C6.19902 12.615 6.12527 12.5046 6.07495 12.3832C6.02463 12.2617 5.99874 12.1315 5.99874 12C5.99874 11.8685 6.02463 11.7383 6.07495 11.6168C6.12527 11.4954 6.19902 11.385 6.292 11.292C6.38498 11.199 6.49535 11.1253 6.61683 11.075C6.73831 11.0246 6.86851 10.9987 7 10.9987C7.13149 10.9987 7.26169 11.0246 7.38317 11.075C7.50465 11.1253 7.61502 11.199 7.708 11.292L10.952 14.536L17.248 7.342C17.4226 7.14274 17.6692 7.02092 17.9336 7.0033C18.1979 6.98567 18.4605 7.07368 18.66 7.248ZM5.506 26C6.606 27.228 8.2 28 9.978 28H18.978C21.3649 28 23.6541 27.0518 25.342 25.364C27.0298 23.6761 27.978 21.3869 27.978 19V10C27.978 8.232 27.212 6.64 25.996 5.544V16C25.996 16.2 25.9893 16.3993 25.976 16.598V18.998C25.976 18.9173 25.7949 20.8275 25.4432 21.6768C25.0914 22.5261 24.5758 23.2977 23.9257 23.9477C23.2757 24.5978 22.5041 25.1134 21.6548 25.4652C20.8055 25.8169 19.8953 25.998 18.976 25.998H16.108L15.996 26H5.506Z" fill="#40D451"/>
                 </Svg>

              </View>
              
              <Text className="text-xl font-bold text-foreground text-center mb-2">
                Emergency Alert Sent
              </Text>
              <Text className="text-secondary text-center mb-1">
                Admin has been notified
              </Text>
              <Text className="text-secondary text-center">
                Help is on the way
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};
