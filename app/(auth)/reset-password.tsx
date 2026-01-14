import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EyeOff, Eye } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleReset = () => {
    console.log("Reset Password Submit clicked", { password, confirmPassword });
    // Navigate to success page
    router.replace("/(auth)/success");
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
                Create New Password
              </Text>
              <Text className="text-sm text-blackblack-400 text-center leading-[20px]">
                Create a new unique password
              </Text>
            </View>

            <View className="gap-5 mb-[40px]">
              <View className="gap-2">
                <Label>Password</Label>
                <View className="relative">
                  <Input
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••••••••••••••"
                    secureTextEntry={!showPassword}
                    className="pr-12"
                  />
                  <Pressable 
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3"
                  >
                    {showPassword ? (
                       <Eye size={20} color="#b5b5b5" />
                    ) : (
                       <EyeOff size={20} color="#b5b5b5" />
                    )}
                  </Pressable>
                </View>
              </View>

              <View className="gap-2">
                <Label>Confirm Password</Label>
                <View className="relative">
                  <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="••••••••••••••••••••"
                    secureTextEntry={!showConfirmPassword}
                    className="pr-12"
                  />
                  <Pressable 
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-3"
                  >
                    {showConfirmPassword ? (
                       <Eye size={20} color="#b5b5b5" />
                    ) : (
                       <EyeOff size={20} color="#b5b5b5" />
                    )}
                  </Pressable>
                </View>
              </View>
            </View>

            <Button onPress={handleReset} className="w-full">
              Reset Password
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
