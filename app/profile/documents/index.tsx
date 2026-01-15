
import React from 'react';
import { View, Text, ScrollView, Pressable, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { shadows } from '@/lib/shadows';

const DOCUMENTS = [
    { id: 1, name: 'Medical Document.pdf', size: '200 KB' },
    { id: 2, name: 'Driving Licence.pdf', size: '720 KB' },
    { id: 3, name: 'Work Permit.pdf', size: '16 MB' },
];

export default function DocumentsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
       <View className="px-5 pt-2 pb-4 flex-row items-center justify-between">
            <View className="flex-row items-center">
                <Pressable onPress={() => router.back()} className="p-2 -ml-2 mr-2">
                    <ArrowLeft size={24} color="#1f2937" />
                </Pressable>
                <Text className="text-2xl font-bold text-foreground">Documents</Text>
            </View>
            <Pressable 
                onPress={() => router.push('/profile/documents/add')}
                className="bg-blue-500 flex-row items-center px-4 py-2 rounded-lg"
            >
                <Plus size={16} color="white" className="mr-1" />
                <Text className="text-white font-bold">Add</Text>
            </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            <View className="gap-4">
                {DOCUMENTS.map((doc) => (
                    <View key={doc.id} className="flex-row items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <View className="w-12 h-14 bg-gray-50 rounded-lg items-center justify-center border border-gray-200 mr-4">
                            <View className="text-[10px] font-bold text-red-500 absolute top-3 left-1 bg-white px-0.5 rounded border border-gray-100 z-10">
                                <Text style={{fontSize: 8, color: 'red'}}>PDF</Text>
                            </View>
                            <FileText size={24} color="#9CA3AF" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-bold text-foreground mb-1">{doc.name}</Text>
                            <Text className="text-gray-400 text-sm">{doc.size}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}
