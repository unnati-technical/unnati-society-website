import { create } from 'zustand';

export interface School {
  id: string;
  logo: string | null;
  name: string;
  city: string;
  district: string;
  address: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  programs: string[];
  status: string;
  studentsCount: number;
  schoolType: string;
  schoolCategory: string;
  affiliation: string;
  establishedYear: string;
  grades: string;
  teachersCount: number;
  about: string;
  focusAreas: string[];
  createdAt: string;
}

interface SchoolStore {
  selectedSchoolId: string | null;
  setSelectedSchoolId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  cityFilter: string;
  setCityFilter: (city: string) => void;
  districtFilter: string;
  setDistrictFilter: (district: string) => void;
  programFilter: string;
  setProgramFilter: (program: string) => void;
  resetFilters: () => void;
}

export const useSchoolStore = create<SchoolStore>((set) => ({
  selectedSchoolId: null,
  setSelectedSchoolId: (id) => set({ selectedSchoolId: id }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: 'All',
  setStatusFilter: (status) => set({ statusFilter: status }),
  cityFilter: 'All',
  setCityFilter: (city) => set({ cityFilter: city }),
  districtFilter: 'All',
  setDistrictFilter: (district) => set({ districtFilter: district }),
  programFilter: 'All',
  setProgramFilter: (program) => set({ programFilter: program }),
  resetFilters: () => set({
    searchQuery: '',
    statusFilter: 'All',
    cityFilter: 'All',
    districtFilter: 'All',
    programFilter: 'All',
  }),
}));
