import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TermsAndConditions() {
  return (
    <LinearGradient
      colors={["#D0E9FD", "#FFFFFF", "#FFFFFF", "#D0E9FD"]}
      locations={[0.0854, 0.2055, 0.8274, 0.9902]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View className="px-5 py-4 flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full border border-gray-100 bg-transparent shadow-sm"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <Text className="text-xl font-bold text-primary ml-4">
            Terms & Conditions
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className={`mt-4 p-6 rounded-3xl border border-white/80 shadow-sm ${Platform.OS === 'ios' ? 'bg-white/50' : 'bg-white'}`}>
            <Text className="text-sm text-secondary mb-6 italic">
              Last Updated: January 14, 2026
            </Text>

            <Section
              title="1. Introduction"
              content="Welcome to Track Fleet. These Terms and Conditions govern your use of our application and services. By accessing or using Track Fleet, you agree to be bound by these terms."
            />

            <Section
              title="2. Use of License"
              content="Permission is granted to temporarily download one copy of the materials (information or software) on Track Fleet's app for personal, non-commercial transitory viewing only."
            />

            <Section
              title="3. User Account"
              content="To access certain features of the app, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account."
            />

            <Section
              title="4. Privacy Policy"
              content="Your use of Track Fleet is also governed by our Privacy Policy. Please review our Privacy Policy, which explains how we collect, use, and disclose information that pertains to your privacy."
            />

            <Section
              title="5. Fleet Tracking Services"
              content="Track Fleet provides real-time tracking and management tools for vehicle fleets. While we strive for 100% accuracy, tracking data may be subject to delays or inaccuracies based on GPS connectivity and network availability."
            />

            <Section
              title="6. Data Accuracy"
              content="Users are responsible for the accuracy of the data they input into the system. Track Fleet is not liable for issues arising from incorrect data provided by the user."
            />

            <Section
              title="7. Limitation of Liability"
              content="In no event shall Track Fleet or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the app."
            />

            <Section
              title="8. Governing Law"
              content="These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the company operates and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
            />

            <View className="mt-8 pt-6 border-t border-gray-100">
              <Text className="text-sm text-secondary text-center">
                If you have any questions about these Terms, please contact us at support@trackfleet.com
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Section({ title, content }: { title: string; content: string }) {
  return (
    <View className="mb-6">
      <Text className="text-lg font-bold text-primary mb-2">{title}</Text>
      <Text className="text-base text-secondary leading-6">{content}</Text>
    </View>
  );
}
