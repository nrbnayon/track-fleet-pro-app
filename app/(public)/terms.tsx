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
              content="Welcome to Track Fleet Pro. These Terms and Conditions ('Terms') govern your use of our mobile application and fleet tracking services. By creating an account, accessing, or using Track Fleet Pro, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services."
            />

            <Section
              title="2. Acceptance of Terms"
              content="By registering for an account and using Track Fleet Pro, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms constitute a legally binding agreement between you and Track Fleet Pro."
            />

            <Section
              title="3. User Account & Eligibility"
              content="To access certain features of the app, you must create an account. You must be at least 18 years old to use Track Fleet Pro. You are responsible for:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • Providing accurate and complete registration information{'\n'}
                • Maintaining the confidentiality of your account credentials{'\n'}
                • All activities that occur under your account{'\n'}
                • Notifying us immediately of any unauthorized access{'\n'}
                • Ensuring you have the legal right to operate the vehicle associated with your account
              </Text>
            </View>

            <Section
              title="4. Location Permissions & Requirements"
              content="Track Fleet Pro requires continuous access to your device's location services to function properly. By using the app, you agree to:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • Grant foreground and background location permissions{'\n'}
                • Keep location services enabled on your device at all times during active deliveries{'\n'}
                • Allow the app to track your location even when the app is closed or not in use{'\n'}
                • Understand that disabling location services will prevent the app from functioning{'\n\n'}
                <Text className="font-semibold">Important:</Text> Background location tracking is essential for delivery monitoring, driver safety, and service quality. Refusing to grant these permissions may result in account suspension or termination.
              </Text>
            </View>

            <Section
              title="5. Fleet Tracking & Delivery Services"
              content="Track Fleet Pro provides real-time GPS tracking and fleet management tools. You acknowledge and agree that:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • Tracking data may be subject to delays or inaccuracies based on GPS signal strength, network connectivity, and device limitations{'\n'}
                • We strive for accuracy but do not guarantee 100% precision in location data{'\n'}
                • Your location, delivery status, and performance metrics will be visible to authorized fleet managers{'\n'}
                • You are responsible for completing deliveries professionally and on time{'\n'}
                • You must follow all traffic laws and safety regulations while making deliveries
              </Text>
            </View>

            <Section
              title="6. User Responsibilities"
              content="As a user of Track Fleet Pro, you agree to:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • Use the app only for lawful purposes and in accordance with these Terms{'\n'}
                • Provide accurate data and information when using the app{'\n'}
                • Not interfere with or disrupt the app's functionality or servers{'\n'}
                • Not attempt to gain unauthorized access to any part of the app{'\n'}
                • Not use the app in any way that could damage, disable, or impair the service{'\n'}
                • Maintain a valid driver's license and vehicle insurance (if applicable){'\n'}
                • Report any technical issues or security vulnerabilities to us promptly
              </Text>
            </View>

            <Section
              title="7. Privacy Policy"
              content="Your use of Track Fleet Pro is also governed by our Privacy Policy, which explains how we collect, use, store, and protect your personal information, including location data. Please review our Privacy Policy carefully. By using the app, you consent to our data practices as described in the Privacy Policy."
            />

            <Section
              title="8. Intellectual Property"
              content="All content, features, and functionality of Track Fleet Pro, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the exclusive property of Track Fleet Pro and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse engineer any part of the app without our express written permission."
            />

            <Section
              title="9. Account Termination & Suspension"
              content="We reserve the right to suspend or terminate your account at any time, with or without notice, for any reason, including but not limited to:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • Violation of these Terms{'\n'}
                • Fraudulent or illegal activity{'\n'}
                • Providing false or misleading information{'\n'}
                • Disabling location services or refusing to grant required permissions{'\n'}
                • Poor performance or repeated customer complaints{'\n\n'}
                You may delete your account at any time by navigating to Profile → Settings → Delete Account. Account deletion is permanent and irreversible.
              </Text>
            </View>

            <Section
              title="10. Data Accuracy & User Input"
              content="You are responsible for the accuracy of all data you input into the system, including delivery confirmations, notes, and status updates. Track Fleet Pro is not liable for issues, losses, or damages arising from incorrect or incomplete data provided by users."
            />

            <Section
              title="11. Limitation of Liability"
              content="To the fullest extent permitted by law, Track Fleet Pro and its affiliates, officers, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:"
            />
            <View className="mb-6 ml-4">
              <Text className="text-base text-secondary leading-6">
                • Your use or inability to use the app{'\n'}
                • Any unauthorized access to or alteration of your data{'\n'}
                • Any interruption or cessation of the service{'\n'}
                • Any bugs, viruses, or malicious code transmitted through the app{'\n'}
                • GPS inaccuracies or location tracking errors{'\n'}
                • Any accidents, injuries, or damages occurring during deliveries
              </Text>
            </View>

            <Section
              title="12. Indemnification"
              content="You agree to indemnify, defend, and hold harmless Track Fleet Pro and its affiliates from any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or related to your use of the app, violation of these Terms, or violation of any rights of another party."
            />

            <Section
              title="13. Service Availability"
              content="We strive to provide uninterrupted service, but we do not guarantee that the app will be available at all times. The app may be temporarily unavailable due to maintenance, updates, technical issues, or circumstances beyond our control. We reserve the right to modify, suspend, or discontinue any part of the service at any time without notice."
            />

            <Section
              title="14. Changes to These Terms"
              content="We reserve the right to modify or update these Terms at any time. We will notify you of material changes by posting the updated Terms in the app and updating the 'Last Updated' date. Your continued use of Track Fleet Pro after changes are posted constitutes your acceptance of the revised Terms."
            />

            <Section
              title="15. Governing Law & Dispute Resolution"
              content="These Terms are governed by and construed in accordance with the laws of the jurisdiction in which Track Fleet Pro operates, without regard to conflict of law principles. Any disputes arising from these Terms or your use of the app shall be resolved through binding arbitration or in the courts of the applicable jurisdiction."
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
