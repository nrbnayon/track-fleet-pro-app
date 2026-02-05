import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useToastStore } from "@/store/useToastStore";

export default function VerifyOTPPage() {
  const { mode, userId, email } = useLocalSearchParams<{ mode: string; userId: string; email: string }>();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);
  const { showToast } = useToastStore();
  const { verifyEmail, verifyResetCode, resendOTP, isLoading } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
        showToast("Please enter the full 4-digit code", "error");
        return;
    }
    
    try {
        setIsVerifying(true);
        if (mode === "signup") {
            await verifyEmail(userId, code);
            showToast("Email verified successfully!", "success");
        } else {
            const data = await verifyResetCode(userId, code);
            showToast("Code verified successfully!", "success");
            router.push({
                pathname: "/(auth)/reset-password",
                params: {
                    userId,
                    secretKey: data.secret_key
                }
            });
        }
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || "Invalid code";
        showToast(errorMessage, "error");
    } finally {
        setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      showToast("Email not found. Please try again.", "error");
      return;
    }

    try {
      setIsResending(true);
      await resendOTP(email);
      showToast("OTP resent successfully! Please check your email.", "success");
      // Clear the OTP inputs
      setOtp(["", "", "", ""]);
      inputs.current[0]?.focus();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to resend OTP";
      showToast(errorMessage, "error");
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to focus previous
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 items-center justify-center px-5">
          <View className="w-full max-w-md">
            <View className="items-center gap-3 mb-10">
              <Image
                source={require("@/assets/icons/logo.png")}
                className="w-20 h-10"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-primary text-center leading-12 mt-3">
                Enter OTP
              </Text>
              <Text className="text-sm text-secondary text-center leading-5 px-8">
                We sent a 4-digit code to your email {email ? email : ''}
              </Text>
            </View>

            <View className="flex-row justify-center gap-4 mb-10">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref;
                  }}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  className={`w-[55px] h-[55px] rounded-[10px] border-2 text-center text-xl font-bold ${
                    digit
                      ? "border-primary text-black"
                      : "border-gray-200 text-black"
                  } bg-white`}
                  style={{ lineHeight: 28 }}
                />
              ))}
            </View>

            <View className="flex-row justify-center mb-8">
              <Text className="text-secondary">Didn&lsquo;t get OTP? </Text>
              <Pressable onPress={handleResendOTP} disabled={isResending}>
                <Text className={`font-bold ${isResending ? 'text-gray-400' : 'text-primary'}`}>
                  {isResending ? 'Resending...' : 'Resend'}
                </Text>
              </Pressable>
            </View>

            <Button onPress={handleVerify} className="w-full" disabled={isVerifying}>
              {isVerifying ? (
                  <View className="flex-row items-center justify-center gap-2">
                      <ActivityIndicator color="white" />
                      <Text className="text-white font-medium">Verifying...</Text>
                  </View>
              ) : (
                  "Verify"
              )}
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
