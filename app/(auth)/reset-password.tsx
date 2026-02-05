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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EyeOff, Eye, ArrowLeft } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export default function ResetPasswordPage() {
  const { userId, secretKey } = useLocalSearchParams<{ userId: string; secretKey: string }>();
  const { resetPassword } = useAuthStore();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error states
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Validate password (minimum 6 characters)
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };
  
  // ... password validation logic ...

  const validatePasswordStrength = (password: string): string | null => {
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  // ... event handlers ...
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError("");
    if (confirmPasswordError && confirmPassword && text === confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (confirmPasswordError) setConfirmPasswordError("");
  };

  const handleReset = async () => {
    // Reset all errors
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      const strengthError = validatePasswordStrength(password);
      if (strengthError) {
        setPasswordError(strengthError);
        hasError = true;
      }
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    }

    if (hasError) {
      return;
    }
    
    if (!userId || !secretKey) {
        Alert.alert("Error", "Missing verification details. Please start over.");
        router.push("/(auth)/forgot-password");
        return;
    }

    try {
      setIsSubmitting(true);
      await resetPassword(userId, secretKey, password, confirmPassword);
      
      Alert.alert("Success", "Password reset successful! Please login.", [
          { text: "OK", onPress: () => router.push("/(auth)/login") }
      ]);
      
    } catch (error: any) {
      console.error(error);
      setPasswordError(error.message || "Failed to reset password. Please try again.");
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
                    Create New Password
                  </Text>
                  <Text className="text-sm text-secondary text-center leading-5">
                    Create a new unique password
                  </Text>
                </View>

                {/* FORM */}
                <View className="gap-5 mb-14">
                  {/* Password Field */}
                  <View className="gap-2">
                    <Label>Password</Label>
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
                    {/* Password hint when no error */}
                    {!passwordError && password.length > 0 && password.length < 8 ? (
                      <Text className="text-gray-500 text-xs mt-1">
                        Use 8+ characters with numbers and letters for a strong password
                      </Text>
                    ) : null}
                  </View>

                  {/* Confirm Password Field */}
                  <View className="gap-2">
                    <Label>Confirm Password</Label>
                    <View className="relative">
                      <Input
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        placeholder="••••••••••••••••••••"
                        secureTextEntry={!showConfirmPassword}
                        className={`pr-12 ${confirmPasswordError ? "border-red-500" : ""}`}
                      />
                      <Pressable
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 h-14 justify-center"
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        {showConfirmPassword ? (
                          <Eye size={20} color="#b5b5b5" />
                        ) : (
                          <EyeOff size={20} color="#b5b5b5" />
                        )}
                      </Pressable>
                    </View>
                    {confirmPasswordError ? (
                      <Text className="text-red-500 text-sm mt-1">
                        {confirmPasswordError}
                      </Text>
                    ) : null}
                    {/* Success message when passwords match */}
                    {!confirmPasswordError && 
                     confirmPassword.length > 0 && 
                     password === confirmPassword ? (
                      <Text className="text-green-600 text-sm mt-1">
                        ✓ Passwords match
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* BUTTON */}
                <Button
                  onPress={handleReset}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center justify-center gap-2">
                      <ActivityIndicator color="white" />
                      <Text className="text-white font-medium">
                        Resetting password...
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