import { create } from 'zustand';
import api from '@/lib/api';

// ─── Types matching real API response ────────────────────────────────────────
export interface DriverInfo {
  id: string;
  full_name: string;
  phone_number: string;
  vehicle_number: string | null;
  profile_image: string | null;
  lat: number | null;
  lng: number | null;
  current_location: string | null;
}

export interface SellerInfo {
  Full_name: string;
  phone_number: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Parcel {
  id: number;
  tracking_id: string;
  title: string;
  status: 'PENDING' | 'ASSIGNED' | 'ONGOING' | 'DELIVERED' | 'REJECTED';
  estimated_delivary_date: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  vehicle_number: string | null;
  pickup_location: string;
  delivery_location: string;
  parcel_weight: number;
  parcel_type: string;
  special_instructions: string | null;
  appoximate_distance: string | null;
  pickup_coordinates: Coordinates | null;
  delivery_coordinates: Coordinates | null;
  driver: DriverInfo | null;
  seller: SellerInfo | null;
}

export type TabType = 'Assigned' | 'Ongoing' | 'Completed';

const PAGE_SIZE = 10;

// ─── Pagination meta per tab ──────────────────────────────────────────────────
interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  count: number;
}

interface ParcelState {
  // Per-tab parcel lists
  assignedParcels: Parcel[];
  ongoingParcels: Parcel[];
  completedParcels: Parcel[];

  // Per-tab pagination
  assignedMeta: PaginationMeta;
  ongoingMeta: PaginationMeta;
  completedMeta: PaginationMeta;

  // Detail view
  detailParcel: Parcel | null;
  detailLoading: boolean;

  loading: boolean;
  actionLoading: boolean;
  error: string | null;
  activeTab: TabType;
  searchQuery: string;

  // Auto-refresh interval ref (stored as number so we can clear it)
  autoRefreshInterval: ReturnType<typeof setInterval> | null;

  // Actions
  fetchParcelsByTab: (tab: TabType, force?: boolean) => Promise<void>;
  fetchParcelsByPage: (tab: TabType, page: number) => Promise<void>;
  fetchParcelById: (id: number | string) => Promise<void>;
  startAutoRefresh: () => void;
  stopAutoRefresh: () => void;
  setTab: (tab: TabType) => void;
  setSearchQuery: (query: string) => void;
  getFilteredParcels: () => Parcel[];

  acceptOrder: (id: number) => Promise<boolean>;
  rejectOrder: (id: number) => Promise<boolean>;
  startTrip: (id: number) => Promise<boolean>;
  markAsDelivered: (id: number) => Promise<boolean>;
}

// Map tab names to API status query values
const DEFAULT_META: PaginationMeta = { currentPage: 1, totalPages: 1, count: 0 };

// ─── Build the correct URL per tab ───────────────────────────────────────────
// The Assigned tab API expects TWO separate query params:
//   status=PENDING  AND  ACCEPTED  (standalone flag, not a value)
// Other tabs use a single  status=VALUE  param.
function buildParcelUrl(tab: TabType, page: number): string {
  const base = `/api/parcel/driver/all-parcels/?page=${page}&page_size=${PAGE_SIZE}`;
  if (tab === 'Assigned') {
    // Produces: ...&status=PENDING&ACCEPTED  (two separate params)
    return `${base}&status=PENDING&ACCEPTED`;
  }
  if (tab === 'Ongoing')   return `${base}&status=ONGOING`;
  if (tab === 'Completed') return `${base}&status=DELIVERED`;
  return base;
}

// ─── Core fetch helper ────────────────────────────────────────────────────────
async function fetchParcelsFromApi(tab: TabType, page: number) {
  const url = buildParcelUrl(tab, page);
  const response = await api.get(url);
  const resData = response.data; // { success, data: [...], count, total_pages, current_page }

  // console.log(`[${tab}] parcels response:`, resData);

  const parcels: Parcel[] = resData?.data ?? [];
  const meta: PaginationMeta = {
    currentPage: resData?.current_page ?? page,
    totalPages:  resData?.total_pages ?? 1,
    count:       resData?.count ?? parcels.length,
  };
  return { parcels, meta };
}

export const useParcelStore = create<ParcelState>((set, get) => ({
  assignedParcels:  [],
  ongoingParcels:   [],
  completedParcels: [],

  assignedMeta:  { ...DEFAULT_META },
  ongoingMeta:   { ...DEFAULT_META },
  completedMeta: { ...DEFAULT_META },

  detailParcel:  null,
  detailLoading: false,
  loading:       false,
  actionLoading: false,
  error:         null,
  activeTab:     'Assigned',
  searchQuery:   '',
  autoRefreshInterval: null,

  // ── Fetch page 1 for a tab (skip if already loaded, unless force) ───────────
  fetchParcelsByTab: async (tab: TabType, force = false) => {
    const { assignedParcels, ongoingParcels, completedParcels } = get();
    const currentList =
      tab === 'Assigned'  ? assignedParcels :
      tab === 'Ongoing'   ? ongoingParcels  :
                            completedParcels;

    if (!force && currentList.length > 0) return;

    set({ loading: true, error: null });
    try {
      const { parcels, meta } = await fetchParcelsFromApi(tab, 1);
      if (tab === 'Assigned') {
        set({ assignedParcels: parcels, assignedMeta: meta, loading: false });
      } else if (tab === 'Ongoing') {
        set({ ongoingParcels: parcels, ongoingMeta: meta, loading: false });
      } else {
        set({ completedParcels: parcels, completedMeta: meta, loading: false });
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Failed to fetch parcels',
        loading: false,
      });
    }
  },

  // ── Fetch a specific page for pagination ─────────────────────────────────────
  fetchParcelsByPage: async (tab: TabType, page: number) => {
    set({ loading: true, error: null });
    try {
      const { parcels, meta } = await fetchParcelsFromApi(tab, page);
      if (tab === 'Assigned') {
        set({ assignedParcels: parcels, assignedMeta: meta, loading: false });
      } else if (tab === 'Ongoing') {
        set({ ongoingParcels: parcels, ongoingMeta: meta, loading: false });
      } else {
        set({ completedParcels: parcels, completedMeta: meta, loading: false });
      }
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Failed to fetch parcels',
        loading: false,
      });
    }
  },

  // ── Fetch single parcel by ID ─────────────────────────────────────────────────
  fetchParcelById: async (id: number | string) => {
    set({ detailLoading: true, detailParcel: null });
    try {
      const response = await api.get(`/api/parcel/driver/all-parcels/?parcel_id=${id}`);

      // console.log('Parcel details:', response.data);
      // Single-parcel endpoint returns: { data: [...], ... } (top-level, NOT nested)
      const arr: Parcel[] = response.data?.data ?? [];
      const parcel = Array.isArray(arr) ? arr[0] ?? null : null;
      set({ detailParcel: parcel, detailLoading: false });
    } catch (err: any) {
      set({
        detailLoading: false,
        error: err?.response?.data?.message || 'Failed to fetch parcel',
      });
    }
  },

  // ── Auto-refresh: poll Assigned tab every 25 minutes ─────────────────────────
  startAutoRefresh: () => {
    const { autoRefreshInterval, stopAutoRefresh } = get();
    if (autoRefreshInterval) stopAutoRefresh(); // clear existing

    const interval = setInterval(async () => {
      const { assignedMeta } = get();
      const { parcels, meta } = await fetchParcelsFromApi('Assigned', assignedMeta.currentPage)
        .catch(() => ({ parcels: null, meta: null }));
      if (parcels) {
        set({ assignedParcels: parcels, assignedMeta: meta! });
      }
    }, 25 * 60 * 1000); // 25 minutes

    set({ autoRefreshInterval: interval });
  },

  stopAutoRefresh: () => {
    const { autoRefreshInterval } = get();
    if (autoRefreshInterval) {
      clearInterval(autoRefreshInterval);
      set({ autoRefreshInterval: null });
    }
  },

  // ── Accept order ──────────────────────────────────────────────────────────────
  acceptOrder: async (id: number) => {
    set({ actionLoading: true });
    try {
      await api.post(`/api/parcel/accept-request/${id}/`);
      set((state) => ({
        assignedParcels: state.assignedParcels.map((p) =>
          p.id === id ? { ...p, status: 'ASSIGNED' as const } : p
        ),
        detailParcel:
          state.detailParcel?.id === id
            ? { ...state.detailParcel, status: 'ASSIGNED' as const }
            : state.detailParcel,
        actionLoading: false,
      }));
      return true;
    } catch (err: any) {
      set({ actionLoading: false });
      return false;
    }
  },

  // ── Reject order ──────────────────────────────────────────────────────────────
  rejectOrder: async (id: number) => {
    set({ actionLoading: true });
    try {
      await api.post(`/api/parcel/reject-request/${id}/`);
      set((state) => ({
        assignedParcels: state.assignedParcels.filter((p) => p.id !== id),
        assignedMeta: {
          ...state.assignedMeta,
          count: Math.max(0, state.assignedMeta.count - 1),
        },
        actionLoading: false,
      }));
      return true;
    } catch (err: any) {
      set({ actionLoading: false });
      return false;
    }
  },

  // ── Start trip ────────────────────────────────────────────────────────────────
  startTrip: async (id: number) => {
    set({ actionLoading: true });
    try {
      await api.post(`/api/parcel/started-delivery/${id}/`);
      set((state) => {
        const parcel = state.assignedParcels.find((p) => p.id === id);
        const updated = parcel ? { ...parcel, status: 'ONGOING' as const } : null;
        return {
          assignedParcels: state.assignedParcels.filter((p) => p.id !== id),
          assignedMeta: {
            ...state.assignedMeta,
            count: Math.max(0, state.assignedMeta.count - 1),
          },
          ongoingParcels: updated
            ? [updated, ...state.ongoingParcels]
            : state.ongoingParcels,
          ongoingMeta: updated
            ? { ...state.ongoingMeta, count: state.ongoingMeta.count + 1 }
            : state.ongoingMeta,
          detailParcel:
            state.detailParcel?.id === id
              ? { ...state.detailParcel, status: 'ONGOING' as const }
              : state.detailParcel,
          actionLoading: false,
        };
      });
      return true;
    } catch (err: any) {
      set({ actionLoading: false });
      return false;
    }
  },

  // ── Mark as delivered ─────────────────────────────────────────────────────────
  markAsDelivered: async (id: number) => {
    set({ actionLoading: true });
    try {
      await api.post(`/api/parcel/completed-delivery/${id}/`);
      set((state) => {
        const parcel = state.ongoingParcels.find((p) => p.id === id);
        const updated = parcel ? { ...parcel, status: 'DELIVERED' as const } : null;
        return {
          ongoingParcels: state.ongoingParcels.filter((p) => p.id !== id),
          ongoingMeta: {
            ...state.ongoingMeta,
            count: Math.max(0, state.ongoingMeta.count - 1),
          },
          completedParcels: updated
            ? [updated, ...state.completedParcels]
            : state.completedParcels,
          completedMeta: updated
            ? { ...state.completedMeta, count: state.completedMeta.count + 1 }
            : state.completedMeta,
          detailParcel:
            state.detailParcel?.id === id
              ? { ...state.detailParcel, status: 'DELIVERED' as const }
              : state.detailParcel,
          actionLoading: false,
        };
      });
      return true;
    } catch (err: any) {
      set({ actionLoading: false });
      return false;
    }
  },

  setTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  // ── Client-side search filter on current tab list ─────────────────────────────
  getFilteredParcels: () => {
    const { assignedParcels, ongoingParcels, completedParcels, activeTab, searchQuery } = get();
    const list =
      activeTab === 'Assigned'  ? assignedParcels :
      activeTab === 'Ongoing'   ? ongoingParcels  :
                                  completedParcels;

    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.tracking_id?.toLowerCase().includes(q) ||
        p.pickup_location?.toLowerCase().includes(q) ||
        p.delivery_location?.toLowerCase().includes(q) ||
        p.customer_name?.toLowerCase().includes(q)
    );
  },
}));
