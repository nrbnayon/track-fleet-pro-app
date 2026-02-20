import { create } from 'zustand';
import api from '@/lib/api';

// ─── Types matching API response ─────────────────────────────────────────────
export interface DriverNotification {
  id: string;
  parcel_id: number | null;
  type: string; // 'NEW_REVIEW' | 'ORDER_ASSIGNED' | 'TRIP_STARTED' | 'DELIVERED' etc.
  title: string;
  message: string;
  created_at: string;
}

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  count: number;
}

interface NotificationState {
  notifications: DriverNotification[];
  meta: PaginationMeta;
  loading: boolean;
  error: string | null;
  autoRefreshInterval: ReturnType<typeof setInterval> | null;

  fetchNotifications: (page?: number, force?: boolean) => Promise<void>;
  fetchNextPage: () => Promise<void>;
  fetchPrevPage: () => Promise<void>;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
}

const PAGE_SIZE = 10;
const DEFAULT_META: PaginationMeta = { currentPage: 1, totalPages: 1, count: 0 };

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  meta: { ...DEFAULT_META },
  loading: false,
  error: null,
  autoRefreshInterval: null,

  fetchNotifications: async (page = 1, force = false) => {
    const { loading, notifications } = get();

    // Skip if already loaded page 1 and not forced
    if (!force && page === 1 && notifications.length > 0) return;
    if (loading) return;

    set({ loading: true, error: null });
    try {
      const response = await api.get(
        `/api/parcel/notification-driver/?page=${page}&page_size=${PAGE_SIZE}`
      );
      const resData = response.data;
      const fetched: DriverNotification[] = resData?.data ?? [];
      const newMeta: PaginationMeta = {
        currentPage: resData?.current_page ?? page,
        totalPages: resData?.total_pages ?? 1,
        count: resData?.count ?? fetched.length,
      };

      set({ notifications: fetched, meta: newMeta, loading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Failed to load notifications',
        loading: false,
      });
    }
  },

  fetchNextPage: async () => {
    const { meta } = get();
    if (meta.currentPage < meta.totalPages) {
      await get().fetchNotifications(meta.currentPage + 1, true);
    }
  },

  fetchPrevPage: async () => {
    const { meta } = get();
    if (meta.currentPage > 1) {
      await get().fetchNotifications(meta.currentPage - 1, true);
    }
  },

  // ── Auto-refresh: silently poll page 1 every 15 minutes ────────────────────
  startAutoRefresh: () => {
    const existing = get().autoRefreshInterval;
    if (existing) {
      clearInterval(existing);
    }

    const interval = setInterval(async () => {
      // Silent refresh — does NOT set loading: true so UI doesn't flash skeleton
      try {
        const response = await api.get(
          `/api/parcel/notification-driver/?page=1&page_size=${PAGE_SIZE}`
        );
        const resData = response.data;
        const fetched: DriverNotification[] = resData?.data ?? [];
        const newMeta: PaginationMeta = {
          currentPage: resData?.current_page ?? 1,
          totalPages: resData?.total_pages ?? 1,
          count: resData?.count ?? fetched.length,
        };
        set({ notifications: fetched, meta: newMeta });
      } catch {
        // silently ignore background refresh errors
      }
    }, 15 * 60 * 1000); // 15 minutes

    set({ autoRefreshInterval: interval });
  },

  stopAutoRefresh: () => {
    const { autoRefreshInterval } = get();
    if (autoRefreshInterval) {
      clearInterval(autoRefreshInterval);
      set({ autoRefreshInterval: null });
    }
  },
}));
