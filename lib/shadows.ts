// utils/shadows.ts
import { Platform, ViewStyle } from 'react-native';

export const shadows = {
  tab: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
  }) as ViewStyle,

  card: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 30,
    },
    android: {
      elevation: 8,
    },
  }) as ViewStyle,

  button: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 3,
    },
  }) as ViewStyle,
};