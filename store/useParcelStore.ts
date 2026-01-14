import { create } from 'zustand';
import { allParcelsData } from '@/data/parcels';

// Define Parcel Interface (based on your data structure)
// You might want to move this to a types file later
export interface Parcel {
    id: string;
    parcel_name: string;
    parcel_type: string;
    parcel_status: 'pending' | 'ongoing' | 'delivered' | 'return';
    pickup_location: string;
    delivery_location: string;
    customer_name: string;
    customer_phone: string;
    customer_address: string;
    driver_id: string;
    estimated_delivery: string | null;
    createdAt: string;
    tracking_no: string;
    price: string;
    image: any;
    description: string;
}

interface ParcelState {
  parcels: any[]; // Using any for now matching your data, should be Parcel[]
  loading: boolean;
  error: string | null;
  activeTab: 'Assigned' | 'Ongoing' | 'Completed';
  searchQuery: string;
  
  // Actions
  fetchParcels: () => Promise<void>;
  setTab: (tab: 'Assigned' | 'Ongoing' | 'Completed') => void;
  setSearchQuery: (query: string) => void;
  getFilteredParcels: () => any[];
}

export const useParcelStore = create<ParcelState>((set, get) => ({
  parcels: [],
  loading: false,
  error: null,
  activeTab: 'Assigned',
  searchQuery: '',

  fetchParcels: async () => {
    set({ loading: true });
    try {
      // Simulate API Network Request
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ parcels: allParcelsData, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch parcels', loading: false });
    }
  },

  setTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  getFilteredParcels: () => {
    const { parcels, activeTab, searchQuery } = get();
    
    return parcels.filter(parcel => {
        // Tab filtering
        let matchesTab = false;
        if (activeTab === 'Assigned') matchesTab = parcel.parcel_status === 'pending';
        if (activeTab === 'Ongoing') matchesTab = parcel.parcel_status === 'ongoing';
        if (activeTab === 'Completed') matchesTab = parcel.parcel_status === 'delivered' || parcel.parcel_status === 'return';

        // Search filtering
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
            parcel.parcel_name.toLowerCase().includes(query) || 
            parcel.tracking_no.toLowerCase().includes(query) ||
            parcel.pickup_location?.toLowerCase().includes(query) ||
            parcel.delivery_location.toLowerCase().includes(query);

        return matchesTab && matchesSearch;
    });
  }
}));
