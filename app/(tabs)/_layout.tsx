import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Text } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Home, Package, User, Phone } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            borderTopWidth: 0,
            paddingTop: 10,
            height: 90, // Increase height to accommodate padding
            shadowColor: '#242424',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.16, // roughly 0x29 / 255
            shadowRadius: 51,
            backgroundColor: Colors[colorScheme ?? 'light'].background, // Ensure background is set
          },
          default: {
            borderTopWidth: 0,
            paddingTop: 10,
            height: 70,
            paddingBottom: 10,
            shadowColor: '#242424',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.16,
            shadowRadius: 51,
            elevation: 5,
            backgroundColor: Colors[colorScheme ?? 'light'].background,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ color, fontSize: 10, fontWeight: focused ? 'bold' : '400', marginBottom: 5 }}>Home</Text>
          ),
          tabBarIcon: ({ color, focused }) => <Home size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="deliveries"
        options={{
          title: 'Deliveries',
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ color, fontSize: 10, fontWeight: focused ? 'bold' : '400', marginBottom: 5 }}>Deliveries</Text>
          ),
          tabBarIcon: ({ color, focused }) => <Package size={28} color={color} />,
          // fill={focused ? color : 'transparent'} 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ color, fontSize: 10, fontWeight: focused ? 'bold' : '400', marginBottom: 5 }}>Profile</Text>
          ),
          tabBarIcon: ({ color, focused }) => <User size={28} color={color} />,
        }}
      />
       <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarLabel: ({ color, focused }) => (
            <Text style={{ color, fontSize: 10, fontWeight: focused ? 'bold' : '400', marginBottom: 5 }}>Contact</Text>
          ),
          tabBarIcon: ({ color, focused }) => <Phone size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
