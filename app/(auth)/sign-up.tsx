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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    console.log("Sign Up clicked", { fullName, email, password, agreeTerms });
    // Navigate to verification
    router.push({ pathname: "/(auth)/verify-otp", params: { mode: "signup" } });
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
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
            <View className="items-center gap-3 mb-[40px]">
              <Image
                source={require("@/assets/icons/logo.png")}
                className="w-14 h-[35px]"
                resizeMode="contain"
              />

              <Text className="text-[28px] font-bold text-bluenormal text-center leading-[34px] mt-4">
                Register New Account
              </Text>
              <Text className="text-sm text-blackblack-400 text-center leading-[17px]">
                Hey! welcome to our app
              </Text>
            </View>

            <View className="gap-5 mb-[40px]">
              <View className="gap-3">
                <Label>Full Name</Label>
                <Input
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="eg. John Doe"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>

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

              <View className="flex-row items-start gap-2 mt-2">
                 <Checkbox
                    checked={agreeTerms}
                    onCheckedChange={setAgreeTerms}
                    className="mt-1"
                  />
                  <Text className="text-sm text-blackblack-500 leading-5 flex-1">
                    By using the Track Fleet app you agree to our{' '}
                    <Text className="font-bold underline">Terms & Conditions</Text> and{' '}
                    <Text className="font-bold underline">Privacy-Policy</Text>
                  </Text>
              </View>
            </View>

            <Button onPress={handleSignUp} className="w-full">
              Sign Up
            </Button>
            
            <View className="flex-row justify-center mt-6 mb-10">
                <Text className="text-blackblack-400">Already have an account? </Text>
                <Pressable onPress={handleLogin}>
                    <Text className="text-bluenormal font-bold">Log In</Text>
                </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
