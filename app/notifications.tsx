import React, { useEffect, useCallback, useState } from 'react';
import {
  View, Text, SectionList, Pressable, Platform,
  RefreshControl, Modal, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, X, ChevronLeft, ChevronRight, Bell } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '@/constants/theme';
import { useNotificationStore, DriverNotification } from '@/store/useNotificationStore';
import { NotificationRowSkeleton } from '@/components/ui/SkeletonCard';

// ─── Original truck icon ──────────────────────────────────────────────────────
function NotificationTruckIcon() {
  return (
    <Svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <Path
        d="M2.91667 9.9165C2.91667 10.2259 3.03958 10.5227 3.25838 10.7415C3.47717 10.9603 3.77391 11.0832 4.08333 11.0832C4.39275 11.0832 4.6895 10.9603 4.90829 10.7415C5.12708 10.5227 5.25 10.2259 5.25 9.9165M2.91667 9.9165C2.91667 9.60709 3.03958 9.31034 3.25838 9.09155C3.47717 8.87275 3.77391 8.74984 4.08333 8.74984C4.39275 8.74984 4.6895 8.87275 4.90829 9.09155C5.12708 9.31034 5.25 9.60709 5.25 9.9165M2.91667 9.9165H1.75V3.49984C1.75 3.34513 1.81146 3.19675 1.92085 3.08736C2.03025 2.97796 2.17862 2.9165 2.33333 2.9165H7.58333V9.9165M5.25 9.9165H8.75M8.75 9.9165C8.75 10.2259 8.87292 10.5227 9.09171 10.7415C9.3105 10.9603 9.60725 11.0832 9.91667 11.0832C10.2261 11.0832 10.5228 10.9603 10.7416 10.7415C10.9604 10.5227 11.0833 10.2259 11.0833 9.9165M8.75 9.9165C8.75 9.60709 8.87292 9.31034 9.09171 9.09155C9.3105 8.87275 9.60725 8.74984 9.91667 8.74984C10.2261 8.74984 10.5228 8.87275 10.7416 9.09155C10.9604 9.31034 11.0833 9.60709 11.0833 9.9165M11.0833 9.9165H12.25V6.4165M12.25 6.4165H7.58333M12.25 6.4165L10.5 3.49984H7.58333"
        stroke="#1D92ED"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const yesterdayStart = new Date(todayStart.getTime() - 86400000);
  const itemDay = new Date(date);
  itemDay.setHours(0, 0, 0, 0);
  if (itemDay.getTime() === todayStart.getTime()) return 'Today';
  if (itemDay.getTime() === yesterdayStart.getTime()) return 'Yesterday';
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function formatFullDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

// ─── Pagination control ───────────────────────────────────────────────────────
function Pagination({
  currentPage, totalPages, onPrev, onNext, loading,
}: {
  currentPage: number; totalPages: number;
  onPrev: () => void; onNext: () => void; loading: boolean;
}) {
  if (totalPages <= 1) return null;
  const prevDisabled = currentPage <= 1 || loading;
  const nextDisabled = currentPage >= totalPages || loading;

  return (
    <View className="flex-row items-center justify-center gap-4 mt-4 mb-2">
      <Pressable
        onPress={onPrev}
        disabled={prevDisabled}
        className={`flex-row items-center px-4 py-2 rounded-full ${
          prevDisabled ? 'bg-gray-100' : 'bg-white border border-gray-200'
        }`}
        style={!prevDisabled ? {
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
        } : undefined}
      >
        <ChevronLeft size={16} color={prevDisabled ? '#9CA3AF' : '#374151'} strokeWidth={2.5} />
        <Text className={`ml-1 font-semibold text-sm ${prevDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
          Prev
        </Text>
      </Pressable>

      <View className="px-4 py-2 bg-primary rounded-full">
        <Text className="text-white font-bold text-sm">{currentPage} / {totalPages}</Text>
      </View>

      <Pressable
        onPress={onNext}
        disabled={nextDisabled}
        className={`flex-row items-center px-4 py-2 rounded-full ${
          nextDisabled ? 'bg-gray-100' : 'bg-white border border-gray-200'
        }`}
        style={!nextDisabled ? {
          shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
        } : undefined}
      >
        <Text className={`mr-1 font-semibold text-sm ${nextDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
          Next
        </Text>
        <ChevronRight size={16} color={nextDisabled ? '#9CA3AF' : '#374151'} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

// ─── Notification Detail Modal ────────────────────────────────────────────────
function NotificationDetailModal({
  notification,
  onClose,
}: {
  notification: DriverNotification | null;
  onClose: () => void;
}) {
  if (!notification) return null;

  const handleViewParcel = () => {
    onClose();
    if (notification.parcel_id) {
      router.push(`/parcel/${notification.parcel_id}`);
    }
  };

  return (
    <Modal visible animationType="fade" transparent onRequestClose={onClose}>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center px-5"
        onPress={onClose}
      >
        <Pressable
          className="bg-white rounded-3xl p-6 w-full max-w-sm"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <Pressable
            onPress={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"
          >
            <X size={18} color="#6B7280" />
          </Pressable>

          {/* Icon */}
          <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-4">
            <NotificationTruckIcon />
          </View>

          {/* Title */}
          <Text className="text-lg font-bold text-gray-900 mb-2">{notification.title}</Text>

          {/* Message */}
          <Text className="text-gray-600 text-sm leading-5 mb-4">{notification.message}</Text>

          {/* Type badge */}
          <View className="bg-gray-100 self-start px-3 py-1 rounded-full mb-4">
            <Text className="text-gray-500 text-xs font-medium">
              {notification.type.replace(/_/g, ' ')}
            </Text>
          </View>

          {/* Timestamp */}
          <Text className="text-gray-400 text-xs mb-5">{formatFullDate(notification.created_at)}</Text>

          {/* View parcel CTA — only if there's a parcel_id */}
          {notification.parcel_id ? (
            <Pressable
              onPress={handleViewParcel}
              className="bg-primary py-3 rounded-full items-center"
            >
              <Text className="text-white font-bold text-sm">View Parcel</Text>
            </Pressable>
          ) : (
            <Pressable
              onPress={onClose}
              className="bg-gray-100 py-3 rounded-full items-center"
            >
              <Text className="text-gray-600 font-semibold text-sm">Dismiss</Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function NotificationsScreen() {
  const {
    notifications, meta, loading,
    fetchNotifications, fetchNextPage, fetchPrevPage,
    startAutoRefresh, stopAutoRefresh,
  } = useNotificationStore();

  const [refreshing, setRefreshing] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState<DriverNotification | null>(null);

  useEffect(() => {
    fetchNotifications(1);
    startAutoRefresh();
    return () => stopAutoRefresh();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchNotifications(1, true);
    setRefreshing(false);
  }, []);

  // ── Build SectionList sections grouped by date label ─────────────────────
  const sectionMap = new Map<string, DriverNotification[]>();
  for (const n of notifications) {
    const label = formatDateLabel(n.created_at);
    if (!sectionMap.has(label)) sectionMap.set(label, []);
    sectionMap.get(label)!.push(n);
  }
  const sections = Array.from(sectionMap.entries()).map(([title, data]) => ({ title, data }));

  // ── Row ───────────────────────────────────────────────────────────────────
  const renderItem = ({ item }: { item: DriverNotification }) => (
    <Pressable
      onPress={() => setSelectedNotif(item)}
      className="flex-row items-start p-4 bg-white border-b border-gray-100"
    >
      {/* Icon circle — original style */}
      <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3 mt-1">
        <NotificationTruckIcon />
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-sm font-bold text-gray-900 leading-5 mb-1" numberOfLines={2}>
          {item.title}
        </Text>
        <Text className="text-gray-500 text-xs leading-4 mb-1" numberOfLines={2}>
          {item.message}
        </Text>
        <Text className="text-gray-400 text-xs">{formatTime(item.created_at)}</Text>
      </View>
    </Pressable>
  );

  // ── Section header ────────────────────────────────────────────────────────
  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View className="bg-white px-4 py-3 mt-2">
      <Text className="text-gray-900 font-semibold text-base">{title}</Text>
    </View>
  );

  // ── Footer for pagination ──────────────────────────────────────────────────
  const ListFooter = () => (
    <Pagination
      currentPage={meta.currentPage}
      totalPages={meta.totalPages}
      onPrev={fetchPrevPage}
      onNext={fetchNextPage}
      loading={loading}
    />
  );

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{ paddingTop: Platform.OS === 'android' ? 5 : 0 }}
    >
      {/* ── Header — original design ── */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="p-2 -ml-2 mr-2">
            <ArrowLeft size={24} color="#1f2937" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-900">Notifications</Text>
        </View>
        {/* Count badge */}
        {meta.count > 0 && (
          <View className="bg-blue-50 px-3 py-1 rounded-full">
            <Text className="text-blue-600 text-xs font-semibold">{meta.count} total</Text>
          </View>
        )}
      </View>

      {/* ── Skeleton while first load ── */}
      {loading && notifications.length === 0 ? (
        <ScrollView>
          {/* Section header placeholder */}
          <View className="bg-white px-4 py-3 mt-2">
            <View style={{ height: 14, width: 60, borderRadius: 6, backgroundColor: '#E5E7EB' }} />
          </View>
          {Array.from({ length: 6 }).map((_, i) => (
            <NotificationRowSkeleton key={i} />
          ))}
        </ScrollView>
      ) : sections.length === 0 ? (
        // ── Empty state ──
        <View className="flex-1 items-center justify-center">
          <View className="w-20 h-20 rounded-full bg-gray-100 items-center justify-center mb-4">
            <Bell size={40} color="#9CA3AF" strokeWidth={1.5} />
          </View>
          <Text className="text-base font-semibold text-gray-500">No notifications yet</Text>
          <Text className="text-sm text-gray-400 mt-1">You're all caught up!</Text>
        </View>
      ) : (
        // ── Original SectionList ──
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.light.tint}
              colors={[Colors.light.tint]}
            />
          }
          ListFooterComponent={<ListFooter />}
        />
      )}

      {/* ── Notification detail modal ── */}
      <NotificationDetailModal
        notification={selectedNotif}
        onClose={() => setSelectedNotif(null)}
      />
    </SafeAreaView>
  );
}
