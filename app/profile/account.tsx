
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Platform, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { Input } from '@/components/ui/input';
import { useToastStore } from '@/store/useToastStore';

const USER_IMAGE = 'https://i.pravatar.cc/300';

export default function AccountSettingsScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('Jack');
  const [lastName, setLastName] = useState('Verner');
  const [email, setEmail] = useState('jack@gmail.com');
  const [phone, setPhone] = useState('01333223056');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
        setIsLoading(false);
        showToast("Profile updated successfully");
        router.back();
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
                    <Text className="text-2xl font-bold text-foreground">Account setting</Text>
                    <Text className="text-gray-500 text-base">Manage your account and preferences</Text>
                </View>
            </View>

            {/* Profile Photo Section */}
            <View className="mx-5 mt-4 bg-white rounded-2xl p-5 mb-6" style={shadows.card}>
                <Text className="text-lg font-bold text-gray-800 mb-5">Profile Photo</Text>
                <View className="flex-row items-center gap-4">
                    <View className="relative">
                        <Image 
                            source={{ uri: USER_IMAGE }} 
                            className="w-20 h-20 rounded-full"
                        />
                        <Pressable className="absolute bottom-0 right-0 bg-white/80 p-1.5 rounded-full border border-primary">
                            <Camera size={14} color="#1D92ED" />
                        </Pressable>
                    </View>
                    <View>
                        <Text className="text-base text-gray-800 font-medium">Change profile picture</Text>
                        <Text className="text-gray-400 text-sm">JPG, PNG max 5MB</Text>
                    </View>
                </View>
            </View>

            {/* Personal Information */}
            <View className="mx-5 bg-white rounded-2xl p-5 mb-6" style={shadows.card}>
                <Text className="text-lg font-bold text-gray-800 mb-5">Personal Information</Text>
                
                <View className="flex-row gap-4 mb-4">
                    <View className="flex-1">
                        <Text className="text-secondary mb-2 font-medium">First Name</Text>
                        <Input 
                            value={firstName}
                            onChangeText={setFirstName}
                            className="border border-gray-200 rounded-xl p-3 text-base text-foreground"
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-secondary mb-2 font-medium">Last Name</Text>
                        <Input 
                            value={lastName}
                            onChangeText={setLastName}
                            className="border border-gray-200 rounded-xl p-3 text-base text-foreground"
                        />
                    </View>
                </View>

                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Email</Text>
                     <Input 
                        value={email}
                        editable={false}
                        className="border border-gray-200 rounded-xl p-3 text-base text-gray-500 bg-gray-50"
                        keyboardType="email-address"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Phone Number</Text>
                     <Input 
                        value={phone}
                        onChangeText={setPhone}
                        className="border border-gray-200 rounded-xl p-3 text-base text-foreground"
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

        </ScrollView>
        
        {/* Footer Button */}
        <View className="bg-white p-5 border-t border-gray-100">
             <Pressable 
                onPress={handleSave}
                disabled={isLoading}
                className={`${isLoading ? 'bg-blue-300' : 'bg-blue-500'} rounded-full py-4 items-center shadow-sm flex-row justify-center gap-2`} 
                style={shadows.button}
             >
                {isLoading && <ActivityIndicator color="white" />}
                <Text className="text-white font-bold text-lg">Save Changes</Text>
             </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
