import { View, Text, Platform } from 'react-native';
import { useToastStore } from '@/store/useToastStore';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { Check, X, Info } from 'lucide-react-native';

export const Toast = () => {
  const { visible, message, type } = useToastStore();

  if (!visible) return null;

  const bgColors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  const Icon = () => {
    switch (type) {
        case 'success': return <Check color="white" size={20} />;
        case 'error': return <X color="white" size={20} />;
        default: return <Info color="white" size={20} />;
    }
  };

  return (
    <Animated.View 
      entering={FadeInUp.springify()} 
      exiting={FadeOutUp} 
      className={`absolute top-14 left-4 right-4 z-[9999] p-4 rounded-xl flex-row items-center shadow-md ${bgColors[type]}`}
      style={{
        marginTop: Platform.OS === 'android' ? 20 : 0
      }}
    >
      <Icon />
      <Text className="text-white ml-2 font-medium flex-1">{message}</Text>
    </Animated.View>
  );
};
