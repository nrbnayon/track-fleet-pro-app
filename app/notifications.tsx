import React, { useState } from 'react';
import { View, Text, SectionList, Pressable, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { driverNotifications, DriverNotification } from '@/data/driverNotifications';

function NotificationTruckIcon() {
  return (
    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <Path d="M2.91667 9.9165C2.91667 10.2259 3.03958 10.5227 3.25838 10.7415C3.47717 10.9603 3.77391 11.0832 4.08333 11.0832C4.39275 11.0832 4.6895 10.9603 4.90829 10.7415C5.12708 10.5227 5.25 10.2259 5.25 9.9165M2.91667 9.9165C2.91667 9.60709 3.03958 9.31034 3.25838 9.09155C3.47717 8.87275 3.77391 8.74984 4.08333 8.74984C4.39275 8.74984 4.6895 8.87275 4.90829 9.09155C5.12708 9.31034 5.25 9.60709 5.25 9.9165M2.91667 9.9165H1.75V3.49984C1.75 3.34513 1.81146 3.19675 1.92085 3.08736C2.03025 2.97796 2.17862 2.9165 2.33333 2.9165H7.58333V9.9165M5.25 9.9165H8.75M8.75 9.9165C8.75 10.2259 8.87292 10.5227 9.09171 10.7415C9.3105 10.9603 9.60725 11.0832 9.91667 11.0832C10.2261 11.0832 10.5228 10.9603 10.7416 10.7415C10.9604 10.5227 11.0833 10.2259 11.0833 9.9165M8.75 9.9165C8.75 9.60709 8.87292 9.31034 9.09171 9.09155C9.3105 8.87275 9.60725 8.74984 9.91667 8.74984C10.2261 8.74984 10.5228 8.87275 10.7416 9.09155C10.9604 9.31034 11.0833 9.60709 11.0833 9.9165M11.0833 9.9165H12.25V6.4165M12.25 6.4165H7.58333M12.25 6.4165L10.5 3.49984H7.58333" stroke="#1D92ED" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(driverNotifications);

  const sections = [
    {
      title: 'Today',
      data: notifications.filter((n) => n.date === 'Today'),
    },
    {
      title: 'Yesterday',
      data: notifications.filter((n) => n.date === 'Yesterday'),
    },
  ];

  const handlePress = (notification: DriverNotification) => {
    // Mark as read
    if (!notification.isRead) {
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n)
      );
    }
    
    if (notification.parcelId) {
      router.push(`/parcel/${notification.parcelId}`);
    }
  };

  const handleMarkAllAsRead = () => {
    Alert.alert(
      "Mark all as read",
      "Are you sure you want to mark all notifications as read?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Yes", 
          onPress: () => {
             setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: DriverNotification }) => (
    <Pressable
      onPress={() => handlePress(item)}
      className={`flex-row items-start p-4 bg-white border-b border-gray-100 ${
        !item.isRead ? 'bg-blue-50/30' : ''
      }`}
    >
      <View className={`w-10 h-10 rounded-full items-center justify-center mr-3 mt-1 ${!item.isRead ? 'bg-white' : 'bg-blue-100'}`}>
        <NotificationTruckIcon />
      </View>
      <View className="flex-1">
        <Text className={`text-sm leading-5 mb-1 ${!item.isRead ? 'text-gray-900 font-bold' : 'text-secondary'}`}>
          {item.title}
        </Text>
        <Text className="text-gray-400 text-xs">{item.time}</Text>
      </View>
      {!item.isRead && (
          <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 ml-2" />
      )}
    </Pressable>
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View className="bg-white px-4 py-3 mt-2">
      <Text className="text-gray-900 font-semibold text-base">{title}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" style={{ paddingTop: Platform.OS === 'android' ? 40 : 0 }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2 mr-2">
            <ArrowLeft size={24} color="#1f2937" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-900">Notifications</Text>
        </View>
        <Pressable onPress={handleMarkAllAsRead}>
          <Text className="text-blue-500 font-medium text-sm">Mark all as read</Text>
        </Pressable>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
