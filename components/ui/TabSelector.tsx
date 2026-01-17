// components/ui/TabSelector.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { shadows } from '@/lib/shadows';

interface TabSelectorProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabSelector: React.FC<TabSelectorProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <View 
      className="flex-row bg-white rounded-full p-2 shadow-[4px_4px_16px_0_rgba(0,0,0,0.12)]"
      // style={shadows.tab}
    >
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          onPress={() => onTabChange(tab)}
          className={`flex-1 py-2.5 items-center rounded-full ${
            activeTab === tab ? 'bg-primary' : 'bg-transparent'
          }`}
        >
          <Text
            className={`font-medium ${
              activeTab === tab ? 'text-white' : 'text-foreground'
            }`}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};