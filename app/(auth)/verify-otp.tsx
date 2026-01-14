import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Button } from "@/components/ui/button";

export default function VerifyOTPPage() {
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleVerify = () => {
    const code = otp.join("");
    console.log("Verify clicked", { code, mode });

    if (mode === "signup") {
      router.push({ pathname: "/(auth)/success", params: { mode: "signup" } });
    } else {
      router.push("/(auth)/reset-password");
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
            <View className="items-center gap-3 mb-14">
              <Image
                source={require("@/assets/icons/logo.png")}
                className="w-20 h-10"
                resizeMode="contain"
              />
              <Text className="text-3xl font-bold text-primary text-center leading-12 mt-3">
                Enter OTP
              </Text>
              <Text className="text-sm text-secondary text-center leading-5 px-8">
                we sent a 4 code to your email dani********.com
              </Text>
            </View>

            <View className="flex-row justify-center gap-4 mb-14">
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
                  className={`w-[60px] h-[60px] rounded-[15px] border-2 text-center text-2xl font-bold ${
                    digit
                      ? "border-primary text-black"
                      : "border-primary text-black"
                  } bg-white`}
                  style={{ lineHeight: 28 }}
                />
              ))}
            </View>

            <View className="flex-row justify-center mb-8">
              <Text className="text-secondary">Didn&lsquo;t get OTP? </Text>
              <Pressable onPress={() => console.log("Resend OTP")}>
                <Text className="text-primary font-bold">Resend</Text>
              </Pressable>
            </View>

            <Button onPress={handleVerify} className="w-full">
              Verify
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
