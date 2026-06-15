// ─── Unnati Society — Shared TypeScript Types ────────────────────────────────

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  role: 'admin' | 'volunteer' | 'student' | 'guest'
  createdAt: string
  updatedAt: string
}

// ── Volunteer ─────────────────────────────────────────────────────────────────

export interface Volunteer {
  id: string
  userId: string
  fullName: string
  phone: string
  city: string
  joinedAt: string
  assignedSchools: string[]
  status: 'active' | 'inactive' | 'pending'
  totalHours: number
  certificates: Certificate[]
}

// ── Student ───────────────────────────────────────────────────────────────────

export interface Student {
  id: string
  fullName: string
  age: number
  schoolId: string
  grade: string
  enrolledCourses: string[]
  progress: Record<string, number> // courseId -> percentage
}

// ── School ────────────────────────────────────────────────────────────────────

export interface School {
  id: string
  name: string
  address: string
  city: string
  state: string
  principalName: string
  phone: string
  studentCount: number
  volunteerIds: string[]
  programs: string[]
}

// ── Event ─────────────────────────────────────────────────────────────────────

export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  type: 'workshop' | 'drive' | 'seminar' | 'celebration' | 'other'
  registeredVolunteers: string[]
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
  coverImage?: string
}

// ── Donation ──────────────────────────────────────────────────────────────────

export interface Donation {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  currency: 'INR' | 'USD'
  method: 'upi' | 'card' | 'netbanking' | 'cash' | 'other'
  date: string
  purpose?: string
  receiptUrl?: string
  status: 'pending' | 'confirmed' | 'failed'
}

// ── Certificate ───────────────────────────────────────────────────────────────

export interface Certificate {
  id: string
  type: 'volunteer' | 'completion' | 'appreciation'
  issuedTo: string
  issuedAt: string
  pdfUrl: string
}

// ── API Response ──────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
