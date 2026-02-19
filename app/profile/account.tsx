import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Image, Platform, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { shadows } from '@/lib/shadows';
import { Input } from '@/components/ui/input';
import { useToastStore } from '@/store/useToastStore';
import { useAuthStore } from '@/store/useAuthStore';

const USER_IMAGE_PLACEHOLDER = 'https://i.pravatar.cc/300';

export default function AccountSettingsScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuthStore();
  const { showToast } = useToastStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstName(user.driver_profile?.first_name || '');
      setLastName(user.driver_profile?.last_name || '');
      setEmail(user.email_address || '');
      setPhone(user.driver_profile?.phone_number || '');
      setVehicleNumber(user.driver_profile?.vehicle_number || '');
      setAddress(user.address || ''); 
    }
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Root level fields for User model
      const fullName = `${firstName} ${lastName}`.trim();
      formData.append('full_name', fullName);
      formData.append('address', address);

      // Nested fields for DriverProfile model using dot notation
      formData.append('driver_profile.first_name', firstName);
      formData.append('driver_profile.last_name', lastName);
      formData.append('driver_profile.vehicle_number', vehicleNumber);
      formData.append('driver_profile.phone_number', phone);
      formData.append('driver_profile.address', address);

      if (profileImage) {
        const filename = profileImage.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : `image`;

        // Profile image is on the User model
        // @ts-ignore
        formData.append('profile_image', {
          uri: profileImage,
          name: filename || 'profile.jpg',
          type,
        });
      }

      await updateProfile(formData);
      showToast("Profile updated successfully", "success");
      router.back();
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message || "Failed to update profile";
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
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
                            source={{ uri: profileImage || user?.profile_image || USER_IMAGE_PLACEHOLDER }} 
                            className="w-20 h-20 rounded-full border border-gray-200"
                        />
                        <Pressable onPress={pickImage} className="absolute bottom-0 right-0 bg-white/80 p-1.5 rounded-full border border-primary">
                            <Camera size={14} color="#1D92ED" />
                        </Pressable>
                    </View>
                    <View>
                        <Pressable onPress={pickImage}>
                            <Text className="text-base text-gray-800 font-medium">Change profile picture</Text>
                            <Text className="text-gray-400 text-sm">JPG, PNG max 5MB</Text>
                        </Pressable>
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
                            placeholder="First Name"
                            className="border border-gray-200 p-3 text-base text-foreground"
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-secondary mb-2 font-medium">Last Name</Text>
                        <Input 
                            value={lastName}
                            onChangeText={setLastName}
                            placeholder="Last Name"
                            className="border border-gray-200 p-3 text-base text-foreground"
                        />
                    </View>
                </View>

                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Email</Text>
                     <Input 
                        value={email}
                        editable={false}
                        className="border border-gray-200 p-3 text-base text-gray-500 bg-gray-50"
                        keyboardType="email-address"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Phone Number</Text>
                     <Input 
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone Number"
                        className="border border-gray-200 p-3 text-base text-foreground"
                        keyboardType="phone-pad"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Vehicle Number</Text>
                     <Input 
                        value={vehicleNumber}
                        onChangeText={setVehicleNumber}
                        placeholder="e.g. DHK-123456"
                        className="border border-gray-200 p-3 text-base text-foreground"
                    />
                </View>

                <View className="mb-4">
                    <Text className="text-secondary mb-2 font-medium">Address</Text>
                     <Input 
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Full Address"
                        className="border border-gray-200 p-3 text-base text-foreground"
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
