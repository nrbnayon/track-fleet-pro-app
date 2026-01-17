
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { Input } from '@/components/ui/input';
import { useToastStore } from '@/store/useToastStore';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{current?: string, new?: string, confirm?: string}>({});

  const validate = () => {
    let isValid = true;
    const newErrors: typeof errors = {};

    if (!currentPassword) {
      newErrors.current = 'Current password is required';
      isValid = false;
    }

    if (!newPassword) {
      newErrors.new = 'New password is required';
      isValid = false;
    } else if (newPassword.length < 6) {
      newErrors.new = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirm = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const { showToast } = useToastStore();

  const handleChangePassword = async () => {
    if (!validate()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        showToast("Password updated successfully");
        router.back();
        
        // Reset fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Header */}
            <View className="px-5 pt-2 pb-4">
                <Pressable onPress={() => router.back()} className="p-2 -ml-2 w-10">
                    <ArrowLeft size={24} color="#1f2937" />
                </Pressable>
                <View className="mt-3">
                    <Text className="text-2xl font-bold text-foreground">Privacy & Security</Text>
                    <Text className="text-gray-500 text-base">Protect your account and data</Text>
                </View>
            </View>

            {/* Change Password Form */}
            <View className="mx-5 mt-4 bg-white rounded-2xl p-5 mb-6" style={shadows.card}>
                <Text className="text-lg font-bold text-gray-800 mb-5">Change Password</Text>
                
                {/* Current Password */}
                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Current Password</Text>
                    <View className="relative">
                        <Input 
                            value={currentPassword}
                            onChangeText={(text) => {
                                setCurrentPassword(text);
                                if(errors.current) setErrors({...errors, current: undefined});
                            }}
                            placeholder="Enter Current Password"
                            secureTextEntry={!showCurrentPassword}
                            className={`border ${errors.current ? 'border-red-500' : 'border-gray-200'} p-3 text-base text-foreground pr-12`}
                        />
                        <Pressable 
                            onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-4 top-0 bottom-0 justify-center h-full"
                        >
                            {showCurrentPassword ? <Eye size={20} color="#9ca3af" /> : <EyeOff size={20} color="#9ca3af" />}
                        </Pressable>
                    </View>
                    {errors.current && <Text className="text-red-500 text-sm mt-1">{errors.current}</Text>}
                </View>

                {/* New Password */}
                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">New Password</Text>
                    <View className="relative">
                        <Input 
                            value={newPassword}
                            onChangeText={(text) => {
                                setNewPassword(text);
                                if(errors.new) setErrors({...errors, new: undefined});
                            }}
                            placeholder="Enter New Password"
                            secureTextEntry={!showNewPassword}
                            className={`border ${errors.new ? 'border-red-500' : 'border-gray-200'} p-3 text-base text-foreground pr-12`}
                        />
                        <Pressable 
                            onPress={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-4 top-0 bottom-0 justify-center h-full"
                        >
                            {showNewPassword ? <Eye size={20} color="#9ca3af" /> : <EyeOff size={20} color="#9ca3af" />}
                        </Pressable>
                    </View>
                    {errors.new && <Text className="text-red-500 text-sm mt-1">{errors.new}</Text>}
                </View>

                {/* Confirm Password */}
                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Confirm Password</Text>
                    <View className="relative">
                        <Input 
                            value={confirmPassword}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                if(errors.confirm) setErrors({...errors, confirm: undefined});
                            }}
                            placeholder="Confirm New Password"
                            secureTextEntry={!showConfirmPassword}
                            className={`border ${errors.confirm ? 'border-red-500' : 'border-gray-200'} p-3 text-base text-foreground pr-12`}
                        />
                        <Pressable 
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-0 bottom-0 justify-center h-full"
                        >
                            {showConfirmPassword ? <Eye size={20} color="#9ca3af" /> : <EyeOff size={20} color="#9ca3af" />}
                        </Pressable>
                    </View>
                    {errors.confirm && <Text className="text-red-500 text-sm mt-1">{errors.confirm}</Text>}
                </View>

            </View>

        </ScrollView>
        
        {/* Footer Button */}
        <View className="bg-white p-5 border-t border-gray-100">
             <Pressable 
                onPress={handleChangePassword}
                disabled={isLoading}
                className={`${isLoading ? 'bg-blue-300' : 'bg-blue-500'} rounded-full py-4 items-center shadow-sm flex-row justify-center gap-2`} 
                style={shadows.button}
             >
                {isLoading && <ActivityIndicator color="white" />}
                <Text className="text-white font-bold text-lg">Update Password</Text>
             </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
