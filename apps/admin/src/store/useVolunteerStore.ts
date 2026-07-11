import { create } from 'zustand';

export type VolunteerStatus = 'Pending' | 'Approved' | 'Rejected' | 'Under Review';

export interface Volunteer {
  id: string;
  volunteerId: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  role: string;
  status: VolunteerStatus;
  appliedDate: string;
  avatarUrl?: string;
  
  // Details
  dob: string;
  gender: string;
  education: string;
  college: string;
  currentYear: string;
  availability: string;
  preferredMode: 'Online' | 'Offline' | 'Hybrid';
  preferredLocation: string;
  address: string;
  whyVolunteer: string;
  skills: string[];
  interests?: string[];
  linkedinUrl?: string;
  howDidYouHear: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  hasNgoExperience?: string;
  ngoName?: string;
  experienceDesc?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  hoursPerWeek?: string;
  startDate?: string;
  careerGoals?: string;
  department?: string;
}

interface VolunteerStore {
  selectedVolunteerId: string | null;
  setSelectedVolunteerId: (id: string | null) => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  
  programFilter: string;
  setProgramFilter: (program: string) => void;
  
  roleFilter: string;
  setRoleFilter: (role: string) => void;
  
  cityFilter: string;
  setCityFilter: (city: string) => void;
  
  resetFilters: () => void;
}

export const useVolunteerStore = create<VolunteerStore>((set) => ({
  selectedVolunteerId: null,
  setSelectedVolunteerId: (id) => set({ selectedVolunteerId: id }),
  
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  statusFilter: 'All',
  setStatusFilter: (status) => set({ statusFilter: status }),
  
  programFilter: 'All',
  setProgramFilter: (program) => set({ programFilter: program }),
  
  roleFilter: 'All',
  setRoleFilter: (role) => set({ roleFilter: role }),
  
  cityFilter: 'All',
  setCityFilter: (city) => set({ cityFilter: city }),
  
  resetFilters: () => set({
    searchQuery: '',
    statusFilter: 'All',
    programFilter: 'All',
    roleFilter: 'All',
    cityFilter: 'All'
  }),
}));
