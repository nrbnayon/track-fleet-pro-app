import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/ui/button";

export default function VerifyOTPPage() {
  const { mode } = useLocalSearchParams<{ mode: string }>();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputs = useRef<Array<TextInput | null>>([]);

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
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
        inputs.current[index - 1]?.focus();
    }
  };

  return (
    <LinearGradient
      colors={["#D0E9FD", "#FFFFFF", "#FFFFFF", "#D0E9FD"]}
      locations={[0.0854, 0.2055, 0.8274, 0.9902]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1"
    >
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 pt-32 px-5">
            <View className="items-center gap-3 mb-[60px]">
              <Image
                source={require("@/assets/icons/logo.png")}
                className="w-14 h-[35px]"
                resizeMode="contain"
              />
              <Text className="text-[28px] font-bold text-bluenormal text-center leading-[34px] mt-4">
                Enter OTP
              </Text>
              <Text className="text-sm text-blackblack-400 text-center leading-[20px] px-8">
                we sent a 4 code to your email
                dani********.com
              </Text>
            </View>

            <View className="flex-row justify-center gap-4 mb-[40px]">
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputs.current[index] = ref; }}
                  value={digit}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  className={`w-[60px] h-[60px] rounded-[15px] border-2 text-center text-2xl font-bold ${
                    digit ? "border-bluenormal text-black" : "border-bluenormal text-black"
                  } bg-white`}
                  // Note: Design shows blue borders for all inputs (or at least active). The image shows all blue borders.
                  // I'll stick to blue border as default from image.
                  style={{ lineHeight: 28 }} // Adjust for vertical centering if needed or rely on flex/padding
                />
              ))}
            </View>
            
            <View className="flex-row justify-center mb-8">
                <Text className="text-blackblack-400">Didn't get OTP? </Text>
                <Pressable onPress={() => console.log('Resend OTP')}>
                    <Text className="text-bluenormal font-bold">Resend</Text>
                </Pressable>
            </View>

            <Button onPress={handleVerify} className="w-full">
              Verify
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
