import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/useAuthStore';

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  // If authenticated, go to tabs
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/index" />;
  }

  // If not authenticated, go to login
  return <Redirect href="/(auth)/login" />;
}
