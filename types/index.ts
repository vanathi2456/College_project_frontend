export type UserRole = 'student' | 'faculty' | 'admin';

export interface User {
    id: string;
    name: string;
    email: string; // or register number
    role: UserRole;
    details?: any; // For implementation simplicity in mock
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, role: UserRole) => Promise<void>;
    logout: () => void;
}

export interface ParentDetails {
    fatherName: string;
    fatherPhone: string;
    fatherEmail?: string;
    fatherOccupation?: string;
    motherName: string;
    motherPhone: string;
    motherEmail?: string;
    motherOccupation?: string;
}

export interface Student {
    id: string;
    registerNumber: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'Male' | 'Female' | 'Other';
    department: string;
    year: number;
    semester: number;
    address: string;
    city: string;
    state: string;
    pincode: string;
    bloodGroup?: string;
    parentDetails: ParentDetails;
    admissionDate: string;
    profilePhoto?: string;
}
