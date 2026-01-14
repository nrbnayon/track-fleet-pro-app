import { useState } from "react";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EyeOff, Eye } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { signIn } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password (minimum 6 characters)
  const validatePassword = (password: string): boolean => {
    return password.length >= 4;
  };

  // Handle email change with validation
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) {
      setEmailError("");
    }
  };

  // Handle password change with validation
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleLogin = async () => {
    // Reset errors
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Validate email
    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email.trim())) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (!validatePassword(password)) {
      setPasswordError("Password must be at least 4 characters");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);
      await signIn(email.trim(), password);
    } catch (error) {
      console.error(error);
      Alert.alert("Login Failed", "Invalid credentials or network error");
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
                  {/* Email Field */}
                  <View className="gap-2">
                    <Label className="text-base text-foreground">Email</Label>
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

                  {/* Password Field */}
                  <View className="gap-2">
                    <Label className="text-base text-foreground">
                      Password
                    </Label>

                    <View className="relative">
                      <Input
                        value={password}
                        onChangeText={handlePasswordChange}
                        placeholder="••••••••••••••••••••"
                        secureTextEntry={!showPassword}
                        className={`pr-12 ${passwordError ? "border-red-500" : ""}`}
                      />

                      <Pressable
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 h-14 justify-center"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        {showPassword ? (
                          <Eye size={20} color="#b5b5b5" />
                        ) : (
                          <EyeOff size={20} color="#b5b5b5" />
                        )}
                      </Pressable>
                    </View>

                    {passwordError ? (
                      <Text className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </Text>
                    ) : null}

                    <View className="flex-row items-center justify-between mt-2">
                      <Pressable
                        onPress={() => setRememberMe(!rememberMe)}
                        className="flex-row items-center gap-2"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Checkbox
                          checked={rememberMe}
                          onCheckedChange={setRememberMe}
                        />
                        <Text className="text-sm text-foreground font-medium">
                          Remember me
                        </Text>
                      </Pressable>

                      <Pressable
                        onPress={() => router.push("/(auth)/forgot-password")}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Text className="text-sm font-medium text-primary">
                          Forget Password?
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>

                {/* BUTTON */}
                <Button
                  onPress={handleLogin}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center justify-center gap-2">
                      <ActivityIndicator color="white" />
                      <Text className="text-white font-medium">
                        Logging in...
                      </Text>
                    </View>
                  ) : (
                    "Log In"
                  )}
                </Button>

                {/* FOOTER */}
                <View className="flex-row justify-center mt-6">
                  <Text className="text-foreground">
                    Don&lsquo;t have an account?{" "}
                  </Text>
                  <Pressable onPress={() => router.push("/(auth)/sign-up")}>
                    <Text className="text-primary font-bold">Sign Up</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}