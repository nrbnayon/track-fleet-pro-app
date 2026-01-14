import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </Text>
        </View>

        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4 bg-white/50 p-6 rounded-3xl border border-white/80 shadow-sm">
            <Text className="text-sm text-secondary mb-6 italic">
              Last Updated: January 14, 2026
            </Text>

            <Section
              title="1. Information We Collect"
              content="We collect information that you provide directly to us, such as when you create an account, update your profile, or use our fleet tracking services. This may include your name, email address, phone number, and vehicle information."
            />

            <Section
              title="2. Location Data"
              content="To provide fleet tracking services, we collect precise location data from your vehicles or mobile devices. This data is essential for the core functionality of the Track Fleet app."
            />

            <Section
              title="3. How We Use Information"
              content="We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our users and services. Your location data is used exclusively for fleet management and tracking purposes."
            />

            <Section
              title="4. Sharing of Information"
              content="We do not sell your personal information to third parties. We may share information with service providers who perform services on our behalf, or as required by law."
            />

            <Section
              title="5. Data Security"
              content="We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure."
            />

            <Section
              title="6. Data Retention"
              content="We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements."
            />

            <Section
              title="7. Your Rights"
              content="Depending on your location, you may have certain rights regarding your personal information, such as the right to access, correct, or delete the data we hold about you."
            />

            <Section
              title="8. Changes to This Policy"
              content="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date."
            />

            <View className="mt-8 pt-6 border-t border-gray-100">
              <Text className="text-sm text-secondary text-center">
                For privacy-related inquiries, please contact our Data Protection Officer at privacy@trackfleet.com
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
