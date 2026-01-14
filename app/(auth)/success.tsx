import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react-native";

export default function SuccessPage() {
  const { mode } = useLocalSearchParams<{ mode: string }>();
  
  const handleLogin = () => {
    router.replace("/(auth)/login");
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 items-center justify-center px-5">
          <View className="w-full max-w-md items-center">
            
            {/* Success Icon Placeholder - Replicating the distinct blue circle look */}
            <View className="relative items-center justify-center mb-10">
                 {/* Decorative elements (dots) */}
                 <View className="absolute -top-8 -left-10 w-4 h-4 rounded-full bg-primary opacity-80" />
                 <View className="absolute top-10 -left-16 w-3 h-3 rounded-full bg-primary opacity-80" />
                 <View className="absolute -top-5 right-10 w-5 h-5 rounded-full bg-primary opacity-80" />
                 <View className="absolute bottom-0 -right-12 w-3 h-3 rounded-full bg-primary opacity-80" />
                 <View className="absolute top-20 right-14 w-3 h-3 rounded-full bg-primary opacity-80" />
                 <View className="absolute bottom-[-20px] left-[-20px] w-5 h-5 rounded-full bg-primary opacity-80" />

                 {/* Main Circle */}
                 <View className="w-32 h-32 rounded-full bg-primary items-center justify-center shadow-lg shadow-blue-200">
                    <ShieldCheck size={48} color="white" strokeWidth={3} />
                 </View>
            </View>

            <Text className="text-3xl font-bold text-black text-center leading-10 mb-3">
              Congratulations !
            </Text>
            <Text className="text-sm text-blackblack-400 text-center leading-5 px-8 mb-10">
              {mode === 'signup' 
                ? "Account created successfully! You'll be redirected to the login screen now" 
                : "Password Reset successful! You'll be redirected to the login screen now"}
            </Text>

            <Button onPress={handleLogin} className="w-full">
              Log In
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
