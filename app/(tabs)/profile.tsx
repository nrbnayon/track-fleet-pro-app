
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, Switch, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  CreditCard, 
  Phone, 
  Mail, 
  Calendar, 
  Truck, 
  Settings, 
  ShieldCheck, 
  FileText, 
  Globe, 
  LogOut, 
  ChevronRight,
  Clock,
  Trash2,
  Bell,
  PackageCheck,
  Lock
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { shadows } from '@/lib/shadows';
import { useAuthStore } from '@/store/useAuthStore';
import { DeliveryTruckIcon } from '@/components/icons/DeliveryIcons';

// Placeholder image for user
const USER_IMAGE = 'https://i.pravatar.cc/300';

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useAuthStore();
  const [isActive, setIsActive] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = async () => {
    setShowLogoutModal(false);
    await signOut();
    router.replace('/(auth)/login');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    // Simulate API call for account deletion
    setTimeout(async () => {
      setIsDeleting(false);
      setShowDeleteModal(false);
      await signOut(); // Sign out after deletion
      router.replace('/(auth)/login'); // Redirect to login
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View className="px-5">
        <View className="flex-row items-center py-4 gap-4">
            <Pressable onPress={() => router.back()} className="px-2 -ml-2">
                <ArrowLeft size={24} color="#1f2937" />
            </Pressable>
        </View>
        
        <View className="mb-8">
          <Text className="text-2xl font-bold text-foreground mb-1">Profile</Text>
          <Text className="text-gray-500 text-base">Manage your account and preferences</Text>
        </View>
        </View>

        {/* User Info */}
        <View className="items-center mb-6">
            <View className="relative">
                <Image 
                    source={{ uri: USER_IMAGE }} 
                    className="w-24 h-24 rounded-full"
                />
                <View className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </View>
            <Text className="text-xl font-bold text-foreground mt-3">Jack Verner</Text>
            <Text className="text-secondary text-center px-10 text-sm mt-1">
                Lorem ipsum dolor sit amet consectetur. Magna lacinia id faucibus erat.
            </Text>
        </View>

        {/* Contact Information Card */}
        <View className="mx-5 mb-6 bg-white rounded-2xl p-5" style={shadows.card}>
            <Text className="text-lg font-bold text-gray-800 mb-4">Contact Information</Text>
            
            <View className="gap-4">
                <InfoRow icon={<CreditCard size={20} color="#1D92ED" />} label="User ID:" value="23056" />
                <InfoRow icon={<Phone size={20} color="#1D92ED" />} label="Phone Number:" value="01333223056" />
                <InfoRow icon={<Mail size={20} color="#1D92ED" />} label="Email:" value="jack@gmail.com" />
                <InfoRow icon={<Calendar size={20} color="#1D92ED" />} label="Joined Date:" value="21 Jan, 2025" />
                <InfoRow icon={<Truck size={20} color="#1D92ED" />} label="Vehicle Number:" value="2132" />
            </View>
        </View>

        {/* Performance Stats */}
        <View className="mx-5 mb-6 bg-white rounded-2xl px-5 py-8 mt-5" style={shadows.card}>
            <Text className="text-lg font-bold text-foreground mb-5">Performance Stats</Text>
                  <View className="flex-row gap-4">
                <View className="flex-1 bg-white rounded-2xl p-4 items-center justify-center shadow-xs h-40" style={shadows.box}>
                    <View className="w-10 h-10 rounded-full bg-[#1E972C33] items-center justify-center mb-2">
                        <PackageCheck size={20} color="#1E972C" />
                    </View>
                    <Text className="text-2xl font-bold text-foreground">234</Text>
                    <Text className="text-gray-500 text-center text-xs mt-1">Deliveries Completed</Text>
                </View>
                <View className="flex-1 bg-white rounded-2xl p-4 items-center justify-center shadow-xs h-40" style={shadows.box}>
                    <View className="w-10 h-10 rounded-full bg-[#1D92ED33] items-center justify-center mb-2">
                         <DeliveryTruckIcon />
                    </View>
                    <Text className="text-2xl font-bold text-foreground">120</Text>
                    <Text className="text-gray-500 text-center text-xs mt-1">Ongoing Deliveries</Text>
                </View>
            </View>
        </View>

        {/* Settings */}
        <View className="mx-5 mb-10 bg-white rounded-2xl px-5 py-8 mt-5" style={shadows.card}>
            <Text className="text-lg font-bold text-gray-800 mb-5">Settings</Text>
            
            <View className="gap-2">
                <SettingItem 
                    icon={<Settings size={22} color="#414141" />} 
                    label="Account Settings" 
                    onPress={() => router.push('/profile/account')}
                      />
                <SettingItem 
                    icon={<FileText size={22} color="#414141" />} 
                    label="Documents" 
                    onPress={() => router.push('/profile/documents' as any)}
                />
                
                <View className="flex-row items-center py-3">
                    <View className="w-8 items-center mr-3">
                         <View className="w-6 h-6 items-center justify-center">
                            <Clock size={22} color="#414141" />
                         </View>
                    </View>
                    <Text className="text-base text-gray-700 flex-1 font-medium">Activity Status</Text>
                    <Switch
                        value={isActive}
                        onValueChange={setIsActive}
                        trackColor={{ false: '#767577', true: '#1D92ED' }}
                        thumbColor={'#fff'}
                    />
                </View>

                {/* Notifications Link - Navigates to app/notifications.tsx if it exists, or just placeholder */}
                <SettingItem 
                    icon={<Bell size={22} color="#414141" />} 
                    label="Notifications" 
                    onPress={() => router.push('/notifications')} 
                />
                <SettingItem 
                    icon={<Lock size={22} color="#414141" />} 
                    label="Change Password" 
                    onPress={() => router.push('/profile/change-password')} 
                />
                <SettingItem 
                    icon={<ShieldCheck size={22} color="#414141" />} 
                    label="Privacy & Security" 
                    onPress={() => router.push('/(public)/privacy')} 
                />
                <SettingItem 
                    icon={<Globe size={22} color="#414141" />} 
                    label="Language" 
                    value="English (Default)"
                    onPress={() => {}} 
                    hideArrow
                />
                
                {/* Delete Account */}
                 <SettingItem 
                    icon={<Trash2 size={22} color="#EF4444" />} 
                    label="Delete Account" 
                    labelColor="text-red-500"
                    onPress={() => setShowDeleteModal(true)} 
                    hideArrow
                />

                <SettingItem 
                    icon={<LogOut size={22} color="#414141" />} 
                    label="Logout" 
                    onPress={() => setShowLogoutModal(true)} 
                    hideArrow
                />
            </View>
        </View>

      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-5">
            <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
                <Text className="text-xl font-bold text-foreground text-center mb-2">
                    Logout?
                </Text>
                <Text className="text-gray-500 text-center mb-6">
                    Are you sure you want to logout from your account?
                </Text>

                <View className="flex-row gap-3">
                    <Pressable
                        onPress={() => setShowLogoutModal(false)}
                        className="flex-1 py-3 border border-gray-300 rounded-full items-center"
                    >
                        <Text className="text-gray-700 font-bold text-base">Cancel</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleLogout}
                        className="flex-1 py-3 bg-red-600 rounded-full items-center"
                    >
                        <Text className="text-white font-bold text-base">Logout</Text>
                    </Pressable>
                </View>
            </View>
        </View>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => !isDeleting && setShowDeleteModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-5">
            <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
                <Text className="text-xl font-bold text-red-600 text-center mb-2">
                    Delete Account?
                </Text>
                <Text className="text-gray-500 text-center mb-6">
                    This action is irreversible. All your data will be permanently deleted.
                </Text>

                <View className="flex-row gap-3">
                    <Pressable
                        onPress={() => setShowDeleteModal(false)}
                        disabled={isDeleting}
                        className="flex-1 py-3 border border-gray-300 rounded-full items-center"
                    >
                        <Text className="text-gray-700 font-bold text-base">Cancel</Text>
                    </Pressable>
                    <Pressable
                        onPress={handleDeleteAccount}
                        disabled={isDeleting}
                        className="flex-1 py-3 bg-red-600 rounded-full items-center justify-center"
                    >
                        {isDeleting ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text className="text-white font-bold text-base">Delete</Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <View className="flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
            {icon}
        </View>
        <Text className="text-gray-500 text-sm flex-1">{label}</Text>
        <Text className="text-gray-900 text-sm font-semibold">{value}</Text>
    </View>
);

const SettingItem = ({ 
    icon, 
    label, 
    value,
    onPress, 
    hideArrow = false,
    labelColor = 'text-[#414141]'
}: { 
    icon: React.ReactNode, 
    label: string, 
    value?: string,
    onPress: () => void, 
    hideArrow?: boolean,
    labelColor?: string
}) => (
    <Pressable onPress={onPress} className="flex-row items-center py-3">
        <View className="w-8 items-center mr-3">
             <View className="w-6 h-6 items-center justify-center">
                {icon}
             </View>
        </View>
        <View className="flex-1 flex-row items-center justify-between">
            <Text className={`text-base font-medium ${labelColor}`}>{label}</Text>
            {value && <Text className="text-gray-500 text-sm mr-2">{value}</Text>}
        </View>
        {!hideArrow && <ChevronRight size={20} color="#9CA3AF" />}
    </Pressable>
);

