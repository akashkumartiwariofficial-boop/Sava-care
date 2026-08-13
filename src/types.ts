export type Language = 'en' | 'hi';

export type ReligionOption = 
  | 'Hindu'
  | 'Muslim'
  | 'Sikh'
  | 'Christian'
  | 'Jain'
  | 'Buddhist'
  | 'Secular';

export type DietaryPreference = 'Sattvik' | 'Pure Veg' | 'Halal' | 'Jain' | 'No Preference';

export interface LocationData {
  state: string;
  city: string;
  pincode: string;
  address?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  emailOrPhone: string;
  isLoggedIn: boolean;
  hasCompletedPreferences: boolean;
  religion: ReligionOption;
  dietaryPreference: DietaryPreference;
  location: LocationData;
  language: Language;
}

export interface ServiceCategory {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  iconName: string;
  badge?: string;
}

export interface CarePackage {
  id: string;
  nameEn: string;
  nameHi: string;
  priceINR: number;
  priceDisplay: string; // e.g. "₹30,000 / mo" or "₹2,000,000 / mo"
  periodEn: string;
  periodHi: string;
  featuresEn: string[];
  featuresHi: string[];
  popular?: boolean;
}

export interface Caregiver {
  id: string;
  name: string;
  roleEn: string;
  roleHi: string;
  rating: number;
  reviewsCount: number;
  city: string;
  state: string;
  experienceYears: number;
  religionsServed: (ReligionOption | 'All')[];
  dietSpecialty: DietaryPreference;
  phone: string;
  verified: boolean;
  availableNow: boolean;
  avatarUrl: string;
  languages: string[];
  primaryReligion?: ReligionOption;
  packages?: CarePackage[];
}

export interface SevaRequest {
  id: string;
  serviceType: string;
  selectedPackage?: CarePackage;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'In Progress' | 'Completed';
  caregiverName?: string;
  notes: string;
  location: string;
  religionPref: string;
  totalAmountINR?: number;
  paymentStatus?: 'Pending' | 'Paid' | 'Failed';
  paymentMethod?: string;
  transactionId?: string;
  paidAt?: string;
}
