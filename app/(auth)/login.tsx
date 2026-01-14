import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EyeOff, Eye } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log("Login clicked", { email, password, rememberMe });
    // router.replace("/(tabs)");
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
          
          {/* CONTENT WRAPPER */}
          <View className="w-full max-w-md">

            {/* HEADER */}
            <View className="items-center gap-3 mb-14">
              <Image
                source={require("@/assets/icons/logo.png")}
                className="w-20 h-10"
                resizeMode="contain"
              />

              <Text className="text-4xl font-bold text-primary">
                Log In
              </Text>

              <Text className="text-base text-secondary text-center">
                Login to access your account
              </Text>
            </View>

            {/* FORM */}
            <View className="gap-5 mb-14">
              <View className="gap-2">
                <Label className="text-base text-foreground">Email</Label>
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
                <Label className="text-base text-foreground">Password</Label>

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

                <View className="flex-row items-center justify-between mt-2">
                  <Pressable
                    onPress={() => setRememberMe(!rememberMe)}
                    className="flex-row items-center gap-2"
                  >
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={setRememberMe}
                    />
                    <Text className="text-sm text-foreground font-medium">
                      Remember me
                    </Text>
                  </Pressable>

                  <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
                    <Text className="text-sm font-medium text-primary">
                      Forget Password?
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* BUTTON */}
            <Button onPress={handleLogin} className="w-full">
              Log In
            </Button>

            {/* FOOTER */}
            <View className="flex-row justify-center mt-6">
              <Text className="text-foreground">
                Don't have an account?{" "}
              </Text>
              <Pressable onPress={() => router.push("/(auth)/sign-up")}>
                <Text className="text-primary font-bold">
                  Sign Up
                </Text>
              </Pressable>
            </View>

          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
