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
import { EyeOff, Eye, ArrowLeft } from "lucide-react-native";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Error states
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate full name (minimum 2 characters)
  const validateFullName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  // Validate password (minimum 6 characters)
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Handle field changes with error clearing
  const handleFullNameChange = (text: string) => {
    setFullName(text);
    if (fullNameError) setFullNameError("");
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (emailError) setEmailError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError("");
  };

  const handleAgreeTermsChange = (checked: boolean) => {
    setAgreeTerms(checked);
    if (termsError) setTermsError("");
  };

  const handleSignUp = async () => {
    // Reset all errors
    setFullNameError("");
    setEmailError("");
    setPasswordError("");
    setTermsError("");

    let hasError = false;

    // Validate full name
    if (!fullName.trim()) {
      setFullNameError("Full name is required");
      hasError = true;
    } else if (!validateFullName(fullName)) {
      setFullNameError("Full name must be at least 2 characters");
      hasError = true;
    }

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
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    }

    // Validate terms agreement
    if (!agreeTerms) {
      setTermsError("You must agree to Terms & Conditions");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Sign Up clicked", { fullName, email, password, agreeTerms });
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Navigate to verification
      router.push({ pathname: "/(auth)/verify-otp", params: { mode: "signup" } });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
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
            <View className="flex-1 items-center justify-center px-5 py-20">
              <View className="w-full max-w-md">
                {/* HEADER */}
                <View className="items-center gap-3 mb-10">
                  <Image
                    source={require("@/assets/icons/logo.png")}
                    className="w-20 h-10"
                    resizeMode="contain"
                  />

                  <Text className="text-3xl font-bold text-primary text-center leading-12 mt-3">
                    Register New Account
                  </Text>
                  <Text className="text-sm text-secondary text-center leading-5">
                    Hey! welcome to our app
                  </Text>
                </View>

                {/* FORM */}
                <View className="gap-5 mb-10">
                  {/* Full Name */}
                  <View className="gap-2">
                    <Label>Full Name</Label>
                    <Input
                      value={fullName}
                      onChangeText={handleFullNameChange}
                      placeholder="eg. John Doe"
                      autoCapitalize="words"
                      autoCorrect={false}
                      className={fullNameError ? "border-red-500" : ""}
                    />
                    {fullNameError ? (
                      <Text className="text-red-500 text-sm mt-1">
                        {fullNameError}
                      </Text>
                    ) : null}
                  </View>

                  {/* Email */}
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

                  {/* Password */}
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
                  </View>

                  {/* Terms & Conditions */}
                  <View className="gap-2">
                    <Pressable
                      onPress={() => handleAgreeTermsChange(!agreeTerms)}
                      className="flex-row items-start gap-2"
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Checkbox
                        checked={agreeTerms}
                        onCheckedChange={handleAgreeTermsChange}
                        className="mt-1"
                      />
                      <Text className="text-sm text-secondary leading-5 flex-1">
                        By using the Track Fleet app you agree to our{" "}
                        <Text 
                          className="font-bold underline text-primary"
                          onPress={(e) => {
                            e.stopPropagation();
                            router.push("/(public)/terms" as any);
                          }}
                        >
                          Terms & Conditions
                        </Text>{" "}
                        and{" "}
                        <Text 
                          className="font-bold underline text-primary"
                          onPress={(e) => {
                            e.stopPropagation();
                            router.push("/(public)/privacy" as any);
                          }}
                        >
                          Privacy-Policy
                        </Text>
                      </Text>
                    </Pressable>
                    {termsError ? (
                      <Text className="text-red-500 text-sm mt-1">
                        {termsError}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {/* BUTTON */}
                <Button
                  onPress={handleSignUp}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <View className="flex-row items-center justify-center gap-2">
                      <ActivityIndicator color="white" />
                      <Text className="text-white font-medium">
                        Creating account...
                      </Text>
                    </View>
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                {/* FOOTER */}
                <View className="flex-row justify-center mt-6">
                  <Text className="text-secondary">Already have an account? </Text>
                  <Pressable onPress={handleLogin}>
                    <Text className="text-primary font-bold">Log In</Text>
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