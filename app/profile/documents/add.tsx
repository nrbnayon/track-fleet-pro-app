
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CloudUpload, FileText, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { useDocumentsStore } from '@/store/useDocumentsStore';
import { Input } from '@/components/ui/input';

export default function AddDocumentScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addDocument } = useDocumentsStore();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      if (result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (err) {
      console.log('Unknown error: ', err);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const formatSize = (bytes: number | undefined) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleAdd = () => {
    if (!title.trim()) {
        Alert.alert("Error", "Please enter a document title");
        return;
    }
    if (!selectedFile) {
        Alert.alert("Error", "Please upload a document");
        return;
    }

    setIsLoading(true);

    // Simulate upload delay
    setTimeout(() => {
        addDocument({
            id: Date.now().toString(),
            name: title.trim(), 
            size: formatSize(selectedFile.size),
            uri: selectedFile.uri,
            type: selectedFile.mimeType || 'application/pdf',
            timestamp: Date.now()
        });
        setIsLoading(false);
        router.back();
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
       <View className="px-5 pt-2 pb-4 flex-row items-center">
            <Pressable onPress={() => router.back()} className="p-2 -ml-2 mr-2">
                <ArrowLeft size={24} color="#1f2937" />
            </Pressable>
            <Text className="text-2xl font-bold text-foreground">Add Documents</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            
            {/* Document Title Input */}
            <View className="mb-6 mt-4">
                <Text className="text-lg font-bold text-foreground mb-3">Document Title</Text>
                <Input 
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g., Vehicle Insurance"
                    placeholderTextColor="#9CA3AF"
                    className="border border-gray-200 rounded-xl p-4 text-base text-foreground bg-white"
                />
            </View>

            {/* Upload Area or Preview */}
            <Text className="text-lg font-bold text-foreground mb-3">Upload File</Text>
            
            {!selectedFile ? (
                <Pressable 
                    onPress={pickDocument}
                    className="border-2 border-dashed border-gray-300 rounded-2xl h-48 items-center justify-center bg-gray-50 mb-8"
                >
                    <CloudUpload size={40} color="#6B7280" className="mb-3" />
                    <Text className="text-secondary font-bold text-lg mb-1">Click to Upload</Text>
                    <Text className="text-gray-400 text-center px-10">
                        PDF, DOC, DOCX (Max 5MB)
                    </Text>
                </Pressable>
            ) : (
                <View className="bg-white p-4 rounded-xl shadow-[4px_4px_10px_0_rgba(0,0,0,0.08)] mb-8 flex-row items-center">
                    <View className="w-12 h-14 bg-gray-50 rounded-lg items-center justify-center border border-gray-200 mr-4 relative">
                         <View className="absolute top-3 left-1 bg-white px-0.5 rounded border border-gray-100 z-10">
                            <Text style={{fontSize: 8, color: 'red', fontWeight: 'bold'}}>PDF</Text>
                        </View>
                        <FileText size={24} color="#9CA3AF" />
                    </View>
                    <View className="flex-1">
                        <Text className="text-base font-bold text-foreground mb-1" numberOfLines={1}>{selectedFile.name}</Text>
                        <Text className="text-gray-400 text-sm">{formatSize(selectedFile.size)}</Text>
                    </View>
                    <Pressable onPress={removeFile} className="p-2 bg-gray-100 rounded-full">
                        <X size={20} color="#6B7280" />
                    </Pressable>
                </View>
            )}

        </ScrollView>
        
         {/* Footer Buttons */}
         <View className="absolute bottom-10 left-0 right-0 px-5 flex-row gap-4">
             <Pressable 
                onPress={() => router.back()}
                className="flex-1 py-4 rounded-full border border-gray-300 items-center"
                disabled={isLoading}
            >
                <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
             </Pressable>
             <Pressable 
                onPress={handleAdd}
                className={`${isLoading ? 'bg-blue-300' : 'bg-blue-500'} flex-1 py-4 rounded-full items-center shadow-[4px_4px_10px_0_rgba(0,0,0,0.08)] flex-row justify-center gap-2`}
                disabled={isLoading}
            >
                {isLoading && <ActivityIndicator color="white" size="small" />}
                <Text className="text-white font-bold text-lg">Add</Text>
             </Pressable>
        </View>
    </SafeAreaView>
  );
}
