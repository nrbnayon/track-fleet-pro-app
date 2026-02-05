import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";

export default function ForgotPasswordPage() {
  const { showToast } = useToastStore();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change with error clearing
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError("");
    }
  };

  const { forgotPassword } = useAuthStore();

  const handleResetPassword = async () => {
    // Reset error
    setEmailError("");

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      
      const response = await forgotPassword(email.trim());
      
      showToast("Verification code sent to your email", "success");

      // Navigate to OTP verification with userId
      router.push({ 
        pathname: "/(auth)/verify-otp", 
        params: { 
          mode: "reset",
          userId: response.user_id,
          email: email.trim()
        } 
      });
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to send reset code";
      
      if (error.response?.data?.errors?.email_address) {
          setEmailError(error.response.data.errors.email_address);
      } else {
          setEmailError(errorMessage);
      }
      
      showToast(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={["#D0E9FD", "#FFFFFF", "#FFFFFF", "#D0E9FD"]}
      locations={[0.0854, 0.2055, 0.8274, 0.9902]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <Pressable
        onPress={() => router.back()}
        className="absolute top-14 left-5 z-20 w-10 h-10 items-center justify-center rounded-full border border-gray-100 bg-transparent shadow-sm"
      >
        <ArrowLeft size={20} color="#000" />
      </Pressable>

      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View className="flex-1 items-center justify-center px-5 py-10">
              <View className="w-full max-w-md">
                {/* HEADER */}
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

                {/* FORM */}
                <View className="gap-5 mb-14">
                  <View className="gap-2">
                    <Label>Email</Label>
                    <Input
                      value={email}
                      onChangeText={handleEmailChange}
                      placeholder="eg. mail@gmail.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className={emailError ? "border-red-500" : ""}
                    />
                    {emailError ? (
                      <Text className="text-red-500 text-sm mt-1">
                        {emailError}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* BUTTON */}
                <Button
                  onPress={handleResetPassword}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center justify-center gap-2">
                      <ActivityIndicator color="white" />
                      <Text className="text-white font-medium">
                        Sending code...
                      </Text>
                    </View>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}