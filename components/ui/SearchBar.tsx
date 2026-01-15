// components/ui/SearchBar.tsx
import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Search } from 'lucide-react-native';
import { shadows } from '@/lib/shadows';

interface SearchBarProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = "Search...",
  ...props 
}) => {
  return (
    <View 
      className="flex-row items-center bg-white rounded-full px-4 py-3 border border-[#E7E7E7]"
      // style={shadows.tab}
    >
      <Search size={20} color="#9ca3af" />
      <TextInput
        className="flex-1 ml-3 text-gray-900 text-base"
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        style={{
        lineHeight: 16,
        textAlignVertical: 'center',
        includeFontPadding: false,
      }}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};