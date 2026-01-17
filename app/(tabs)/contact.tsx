import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, Mail, CircleUserRound } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { shadows } from '@/lib/shadows';

export default function ContactScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View className="px-5">
          <View className="flex-row items-center py-4 gap-4">
            <Pressable onPress={() => router.back()} className="p-2 -ml-2">
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
          <View className="w-25 h-25 rounded-full items-center justify-center mb-4">
            <CircleUserRound size={100} color="#111111" strokeWidth={1} />
          </View>
          <Text className="text-lg font-bold text-foreground mb-2">Admin</Text>
          <Text className="text-gray-500 text-center px-6 leading-5">
            Lorem ipsum dolor sit amet consectetur. Magna lacinia id faucibus erat.
          </Text>
        </View>

        {/* Contact Information Card */}
        <View 
          className="mx-5 mb-6 bg-white rounded-2xl p-6"
          style={shadows.card}
        >
          <Text className="text-lg font-bold text-secondary mb-6">Contact Information</Text>

          {/* Phone Row */}
          <View className="flex-row items-center mb-6">
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Phone size={20} color="#1D92ED" strokeWidth={2} />
            </View>
            <Text className="text-secondary text-base font-medium flex-1">Phone Number:</Text>
            <Text className="text-foreground text-base font-medium">000--0000-000</Text>
          </View>

          {/* Email Row */}
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
              <Mail size={20} color="#1D92ED" strokeWidth={2} />
            </View>
            <Text className="text-secondary text-base font-medium flex-1">Email:</Text>
            <Text className="text-foreground text-base font-medium">example@gmail.com</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}