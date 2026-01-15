
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CloudUpload } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function AddDocumentScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
       <View className="px-5 pt-2 pb-4 flex-row items-center">
            <Pressable onPress={() => router.back()} className="p-2 -ml-2 mr-2">
                <ArrowLeft size={24} color="#1f2937" />
            </Pressable>
            <Text className="text-2xl font-bold text-foreground">Add Documents</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            
            {/* Upload Area */}
            <Pressable className="mt-6 border-2 border-dashed border-gray-300 rounded-2xl h-48 items-center justify-center bg-gray-50 mb-8">
                <CloudUpload size={40} color="#6B7280" className="mb-3" />
                <Text className="text-secondary font-bold text-lg mb-1">Upload</Text>
                <Text className="text-gray-400 text-center px-10">
                    Upload images showcasing your service
                </Text>
            </Pressable>

            {/* Document Title Input */}
            <View className="mb-4">
                <Text className="text-lg font-bold text-foreground mb-3">Document Title</Text>
                <TextInput 
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Your title goes here..."
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-200 rounded-xl p-4 text-base text-foreground bg-white"
                />
            </View>

        </ScrollView>
        
         {/* Footer Buttons */}
         <View className="absolute bottom-10 left-0 right-0 px-5 flex-row gap-4">
             <Pressable 
                onPress={() => router.back()}
                className="flex-1 py-4 rounded-full border border-gray-300 items-center"
            >
                <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
             </Pressable>
             <Pressable 
                onPress={() => router.back()}
                className="flex-1 py-4 rounded-full bg-blue-500 items-center shadow-sm"
            >
                <Text className="text-white font-bold text-lg">Add</Text>
             </Pressable>
        </View>
    </SafeAreaView>
  );
}
