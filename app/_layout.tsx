import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "../global.css"
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/useAuthStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';
import { Toast } from '@/components/ui/Toast';
import { LocationProvider } from '@/context/LocationContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, checkAuth, isLoading: isAuthLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  // Load Inter font from Google Fonts
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Initial Auth Check
  useEffect(() => {
    checkAuth();
  }, []);

  // Hide Splash Screen when everything is ready
  useEffect(() => {
    if ((fontsLoaded || fontError) && !isAuthLoading) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, isAuthLoading]);

  // Auth Protection / Redirection Logic
  useEffect(() => {
    if (isAuthLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inPublicGroup = segments[0] === '(public)' as any;

    if (isAuthenticated) {
        // If authenticated but in auth pages OR at root, go to tabs
        if (inAuthGroup) {
            router.replace('/(tabs)');
        }
    } else {
        // If NOT authenticated and NOT in auth pages or public group, go to login
        if (!inAuthGroup && !inPublicGroup) {
            router.replace('/(auth)/login');
        }
    }
  }, [isAuthenticated, segments, isAuthLoading]);

  // Render
  if ((!fontsLoaded && !fontError) || isAuthLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#1D92ED" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <LocationProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(public)" options={{ headerShown: false }} />
          </Stack>
          <Toast />
          <StatusBar style="dark" />
        </LocationProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
