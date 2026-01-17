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
      <SafeAreaView style={{ flex: 1}}>
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
          <View className={`mt-4 p-6 rounded-3xl border border-white/80 shadow-sm ${Platform.OS === 'ios' ? 'bg-white/50' : 'bg-white'}`}>
            <Text className="text-sm text-secondary mb-6 italic">
              Last Updated: January 14, 2026
            </Text>

            <Section
              title="1. Information We Collect"
              content="We collect the following types of information to provide and improve our fleet tracking services:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • <Text className="font-semibold">Account Information:</Text> Name, email address, phone number, user ID, and vehicle number when you create an account{'\n'}
                • <Text className="font-semibold">Location Data:</Text> Precise GPS coordinates from your device (both foreground and background){'\n'}
                • <Text className="font-semibold">Device Information:</Text> Device type, operating system, and app version{'\n'}
                • <Text className="font-semibold">Usage Data:</Text> Delivery statistics, performance metrics, and app interaction data
              </Text>
            </View>

            <Section
              title="2. Why We Collect Your Data"
              content="We collect your personal information for the following essential purposes:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • <Text className="font-semibold">Account Management:</Text> To create and maintain your user profile, authenticate your identity, and provide personalized services{'\n'}
                • <Text className="font-semibold">Service Delivery:</Text> To enable core app functionality including delivery tracking, route optimization, and fleet management{'\n'}
                • <Text className="font-semibold">Performance Monitoring:</Text> To track your delivery statistics, completed deliveries, and ongoing assignments{'\n'}
                • <Text className="font-semibold">Communication:</Text> To send you important updates, notifications about deliveries, and service-related announcements{'\n'}
                • <Text className="font-semibold">Security:</Text> To protect your account, prevent fraud, and ensure the safety of our platform
              </Text>
            </View>

            <Section
              title="3. Location Data & Why We Need It"
              content="Location tracking is fundamental to Track Fleet Pro's core functionality. Here's how and why we use your location:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • <Text className="font-semibold">Real-Time Tracking:</Text> We collect your GPS location continuously (every 10 seconds when moving 50+ meters) to show your current position to fleet managers and customers{'\n'}
                • <Text className="font-semibold">Foreground Location:</Text> High-accuracy location updates when the app is open, used for active delivery navigation and route tracking{'\n'}
                • <Text className="font-semibold">Background Location:</Text> Continuous tracking even when the app is closed or minimized, essential for monitoring delivery progress and ensuring driver safety{'\n'}
                • <Text className="font-semibold">Route Optimization:</Text> Historical location data helps optimize delivery routes and improve efficiency{'\n'}
                • <Text className="font-semibold">Delivery Verification:</Text> Location data confirms delivery completion at the correct address{'\n\n'}
                <Text className="font-semibold italic">Important:</Text> Without location permissions, the app cannot function properly. You will be prompted to enable location services if they are turned off. Background location tracking runs as a foreground service with a persistent notification on Android.
              </Text>
            </View>

            <Section
              title="4. How We Use Your Information"
              content="Your data enables the following app functionality:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • Display your real-time location on the fleet management dashboard{'\n'}
                • Calculate accurate ETAs for deliveries{'\n'}
                • Generate performance reports and delivery statistics{'\n'}
                • Send push notifications about new assignments and delivery updates{'\n'}
                • Provide customer support and resolve delivery issues{'\n'}
                • Improve our services through analytics and usage patterns
              </Text>
            </View>

            <Section
              title="5. Sharing of Information"
              content="We do not sell your personal information to third parties. We may share your information only in the following limited circumstances:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • <Text className="font-semibold">Fleet Managers:</Text> Your location, delivery status, and performance metrics are visible to authorized fleet administrators{'\n'}
                • <Text className="font-semibold">Customers:</Text> Limited delivery tracking information (current location and ETA) may be shared with recipients{'\n'}
                • <Text className="font-semibold">Service Providers:</Text> Third-party services that help us operate the app (cloud hosting, analytics, notifications){'\n'}
                • <Text className="font-semibold">Legal Requirements:</Text> When required by law, court order, or government regulation
              </Text>
            </View>

            <Section
              title="6. Data Security"
              content="We implement industry-standard security measures to protect your personal information, including encrypted data transmission, secure cloud storage, and access controls. However, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security."
            />

            <Section
              title="7. Data Retention"
              content="We retain your personal information for as long as your account is active or as needed to provide services. Location data is typically retained for 90 days for operational purposes. Performance statistics and delivery history may be retained longer for analytics and reporting. Upon account deletion, all personal data is permanently removed within 30 days."
            />

            <Section
              title="8. Your Rights & Account Deletion"
              content="You have the following rights regarding your personal information:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • <Text className="font-semibold">Access:</Text> Request a copy of the personal data we hold about you{'\n'}
                • <Text className="font-semibold">Correction:</Text> Update or correct your account information at any time{'\n'}
                • <Text className="font-semibold">Deletion:</Text> Request complete deletion of your account and all associated data{'\n'}
                • <Text className="font-semibold">Opt-Out:</Text> Disable location tracking (note: this will prevent app functionality){'\n\n'}
                <Text className="font-semibold">To Delete Your Account & Data:{'\n'}</Text>
                1. Open the Track Fleet Pro app{'\n'}
                2. Navigate to the <Text className="font-semibold">Profile</Text> tab (bottom navigation){'\n'}
                3. Scroll down to Settings section{'\n'}
                4. Tap on <Text className="font-semibold">"Delete Account"</Text>{'\n'}
                5. Confirm your decision in the popup{'\n\n'}
                This action is <Text className="font-semibold">irreversible</Text> and will permanently delete all your data, including delivery history, performance stats, and account information.
              </Text>
            </View>

            <Section
              title="9. Children's Privacy"
              content="Track Fleet Pro is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately."
            />

            <Section
              title="10. Changes to This Policy"
              content="We may update our Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. Continued use of the app after changes constitutes acceptance of the updated policy."
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
