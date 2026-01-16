

import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Plus, FileText, Trash2, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { useDocumentsStore, DocumentItem } from '@/store/useDocumentsStore';

export default function DocumentsScreen() {
  const router = useRouter();
  const { documents, removeDocument } = useDocumentsStore();
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

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
                className="bg-blue-500 flex-row items-center px-4 py-2 rounded-sm"
            >
                <Plus size={16} color="white" className="mr-1" />
                <Text className="text-white font-bold">Add</Text>
            </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            {documents.length === 0 ? (
                <View className="items-center justify-center py-10">
                    <Text className="text-gray-400">No documents found</Text>
                </View>
            ) : (
                <View className="gap-4">
                    {documents.map((doc) => (
                        <Pressable key={doc.id} onPress={() => setSelectedDoc(doc)}>
                            <View className="flex-row items-center bg-white p-4 rounded-sm shadow-[4px_4px_10px_0_rgba(0,0,0,0.08)]">
                                <View className="w-12 h-14 bg-gray-50 rounded-lg items-center justify-center border border-gray-200 mr-4">
                                    <View className="absolute top-3 left-1 bg-white px-0.5 rounded border border-gray-100 z-10">
                                        <Text style={{fontSize: 8, color: 'red', fontWeight: 'bold'}}>PDF</Text>
                                    </View>
                                    <FileText size={24} color="#9CA3AF" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-base font-bold text-foreground mb-1" numberOfLines={1}>{doc.name}</Text>
                                    <Text className="text-gray-400 text-sm">{doc.size}</Text>
                                </View>
                                <Pressable 
                                    onPress={() => {
                                        Alert.alert(
                                            "Delete Document",
                                            "Are you sure you want to delete this document?",
                                            [
                                                { text: "Cancel", style: "cancel" },
                                                { 
                                                    text: "Delete", 
                                                    onPress: () => removeDocument(doc.id),
                                                    style: "destructive"
                                                }
                                            ]
                                        );
                                    }}
                                    className="p-2"
                                    hitSlop={10}
                                >
                                    <Trash2 size={20} color="#EF4444" />
                                </Pressable>
                            </View>
                        </Pressable>
                    ))}
                </View>
            )}
        </ScrollView>

        {/* Document Preview Modal */}
        <Modal
            visible={!!selectedDoc}
            animationType="slide"
            onRequestClose={() => setSelectedDoc(null)}
        >
            <SafeAreaView className="flex-1 bg-white mt-8">
                <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-100">
                    <Text className="text-xl font-bold text-foreground flex-1" numberOfLines={1}>
                        {selectedDoc?.name || 'Document Preview'}
                    </Text>
                    <Pressable 
                        onPress={() => setSelectedDoc(null)}
                        className="p-2 bg-gray-100 rounded-full ml-2"
                    >
                        <X size={24} color="#6B7280" />
                    </Pressable>
                </View>

                <View className="flex-1 bg-gray-100">
                     {selectedDoc?.uri ? (
                        Platform.OS === 'ios' ? (
                            <WebView 
                                source={{ uri: selectedDoc.uri }} 
                                style={{ flex: 1 }}
                                startInLoadingState={true}
                                renderLoading={() => (
                                    <View className="absolute inset-0 items-center justify-center bg-white">
                                        <Text className="text-gray-400">Loading Preview...</Text>
                                    </View>
                                )}
                            />
                        ) : (
                             // Android Fallback
                            <View className="flex-1 items-center justify-center p-5">
                                <View className="w-20 h-24 bg-white rounded-2xl items-center justify-center border border-gray-200 mb-4 shadow-sm">
                                    <FileText size={40} color="#9CA3AF" />
                                </View>
                                <Text className="text-lg font-bold text-center text-foreground mb-2">
                                    {selectedDoc.name}
                                </Text>
                                <Text className="text-gray-500 text-center mb-6">
                                    Start download or open with external viewer to view content.
                                </Text>
                                {/* Note: Real PDF viewing on Android requires native modules or external intent */}
                            </View>
                        )
                    ) : (
                        <View className="flex-1 items-center justify-center">
                            <Text className="text-gray-400">No URI found for this document</Text>
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </Modal>
    </SafeAreaView>
  );
}
