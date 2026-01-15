import { Platform, ViewStyle } from 'react-native';

export const shadows = {
  // Main card shadow: box-shadow: 0px 4px 60px 0px #9793934D;
  card: Platform.select({
    ios: {
      shadowColor: '#979393',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3, 
      shadowRadius: 30, // 60px blur is very large, 30 is a reasonable RN approximation
    },
    android: {
      elevation: 10,
      shadowColor: '#979393',
    },
  }) as ViewStyle,

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

  // Truck icon card shadow
  truckCard: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.25,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }) as ViewStyle,
};