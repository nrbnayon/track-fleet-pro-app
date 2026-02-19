import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Mail, CircleUserRound, MapPin, ShieldCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { useAuthStore } from '@/store/useAuthStore';

export default function ContactScreen() {
  const router = useRouter();
  const { admin, getAdminDetails } = useAuthStore();
  const [loading, setLoading] = useState(!admin);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        await getAdminDetails();
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#1D92ED" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View className="px-5">
          <View className="flex-row items-center py-4 gap-4">
            <Pressable onPress={() => router.back()} className="px-2 -ml-2">
              <ArrowLeft size={24} color="#1f2937" />
            </Pressable>
          </View>

          <View className="mb-8">
            <Text className="text-2xl font-bold text-foreground mb-1">Contact with Admin</Text>
            <Text className="text-gray-500 text-base">Get help anytime when you need</Text>
          </View>
        </View>

        {/* Profile Section */}
        <View className="items-center mb-10">
          <View className="w-32 h-32 rounded-full overflow-hidden items-center justify-center mb-4 bg-gray-100">
             {admin?.profile_image ? (
                <Image 
                    source={{ uri: admin.profile_image }} 
                    className="w-full h-full border border-gray-200 rounded-full"
                />
             ) : (
                <CircleUserRound size={100} color="#111111" strokeWidth={1} />
             )}
          </View>
          <View className="flex-row items-center gap-1">
            <Text className="text-xl font-bold text-foreground">{admin?.full_name || 'Admin'}</Text>
            {admin?.is_verified && <ShieldCheck size={18} color="#1D92ED" />}
          </View>
          <Text className="text-gray-500 text-center px-10 leading-5 mt-2">
            The administrator can help you with account issues, delivery inquiries, and other issues.
          </Text>
        </View>

        {/* Contact Information Card */}
        <View 
          className="mx-5 mb-6 bg-white rounded-2xl p-6"
          style={shadows.card}
        >
          <Text className="text-lg font-bold text-gray-800 mb-6">Contact Information</Text>

          {/* Phone Row */}
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Phone size={20} color="#1D92ED" strokeWidth={2} />
            </View>
            <View className="flex-1">
                <Text className="text-gray-500 text-sm font-medium">Phone Number</Text>
                <Text className="text-foreground text-base font-bold">{admin?.phone_number || 'N/A'}</Text>
            </View>
          </View>

          {/* Email Row */}
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Mail size={20} color="#1D92ED" strokeWidth={2} />
            </View>
            <View className="flex-1">
                <Text className="text-gray-500 text-sm font-medium">Email Address</Text>
                <Text className="text-foreground text-base font-bold">{admin?.email_address || 'N/A'}</Text>
            </View>
          </View>

          {/* Address Row */}
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
              <MapPin size={20} color="#1D92ED" strokeWidth={2} />
            </View>
            <View className="flex-1">
                <Text className="text-gray-500 text-sm font-medium">Office Address</Text>
                <Text className="text-foreground text-base font-bold">{admin?.address || 'N/A'}</Text>
            </View>
          </View>
        </View>

        {/* Extra Information */}
        {/* <View className="mx-5 p-4 border border-blue-100 rounded-xl bg-blue-50/30">
            <Text className="text-blue-800 font-semibold mb-1">Response Time</Text>
            <Text className="text-blue-600/80 text-sm">Typically responds within 2 hours during office hours (9 AM - 6 PM).</Text>
        </View> */}

      </ScrollView>
    </SafeAreaView>
  );
}