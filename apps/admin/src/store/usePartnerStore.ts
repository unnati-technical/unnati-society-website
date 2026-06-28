import { create } from 'zustand';

export interface Partner {
  id: string;
  logo: string | null;
  organization: string;
  type: string;
  contactPerson: string;
  email: string;
  phone: string;
  focusArea: string;
  status: string;
  since: string;
  website: string | null;
  city: string;
  address: string;
  about: string;
  highlights: string[];
  createdAt: string;
}

interface PartnerStore {
  selectedPartnerId: string | null;
  setSelectedPartnerId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  cityFilter: string;
  setCityFilter: (city: string) => void;
  resetFilters: () => void;
}

export const usePartnerStore = create<PartnerStore>((set) => ({
  selectedPartnerId: null,
  setSelectedPartnerId: (id) => set({ selectedPartnerId: id }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: 'All',
  setStatusFilter: (status) => set({ statusFilter: status }),
  typeFilter: 'All',
  setTypeFilter: (type) => set({ typeFilter: type }),
  categoryFilter: 'All',
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  cityFilter: 'All',
  setCityFilter: (city) => set({ cityFilter: city }),
  resetFilters: () => set({
    searchQuery: '',
    statusFilter: 'All',
    typeFilter: 'All',
    categoryFilter: 'All',
    cityFilter: 'All',
  }),
}));
