import { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    console.log("Reset Password clicked", { email });
    router.push({ pathname: "/(auth)/verify-otp", params: { mode: "reset" } });
  };

  return (
    <LinearGradient
      colors={["#D0E9FD", "#FFFFFF", "#FFFFFF", "#D0E9FD"]}
      locations={[0.0854, 0.2055, 0.8274, 0.9902]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center px-5">
          <View className="w-full max-w-md">
            <View className="items-center gap-3 mb-14">
              <Image
                source={require("@/assets/icons/logo.png")}
                className="w-20 h-10"
                resizeMode="contain"
              />

              <Text className="text-3xl font-bold text-primary text-center leading-12 mt-3">
                Forget Password?
              </Text>
              <Text className="text-sm text-secondary text-center leading-5 px-4">
                Enter the email used for your account and we'll send you a code for the confirmation
              </Text>
            </View>

            <View className="gap-5 mb-14">
              <View className="gap-3">
                <Label>Email</Label>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="eg. mail@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <Button onPress={handleResetPassword} className="w-full">
              Reset Password
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
