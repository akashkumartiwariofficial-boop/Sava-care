import React, { useState } from 'react';
import { Caregiver, DietaryPreference, Language, LocationData, ReligionOption, SevaRequest, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/LoginPage';
import { PreferenceStep } from './components/PreferenceStep';
import { Dashboard } from './components/Dashboard';
import { EditPreferencesModal } from './components/EditPreferencesModal';
import { BookSevaModal } from './components/BookSevaModal';
import { PaymentPortal } from './components/PaymentPortal';

export default function App() {
  const [user, setUser] = useState<UserProfile>({
    id: 'user-1',
    name: 'Sharma Ji',
    emailOrPhone: '+91 98765 43210',
    isLoggedIn: false, // Default: Starts at Step 1 Login Page
    hasCompletedPreferences: false, // Default: Step 2 Religion/Location triggers after login
    religion: 'Hindu',
    dietaryPreference: 'Sattvik',
    location: {
      state: 'Maharashtra',
      city: 'Mumbai',
      pincode: '400001',
      address: 'Bandra West'
    },
    language: 'en' // Default English
  });

  const [isEditPrefOpen, setIsEditPrefOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isPaymentPortalOpen, setIsPaymentPortalOpen] = useState(false);
  const [selectedCaregiverForBooking, setSelectedCaregiverForBooking] = useState<Caregiver | null>(null);

  // Default sample request in user's initial state
  const [myRequests, setMyRequests] = useState<SevaRequest[]>([
    {
      id: 'SR-1024',
      serviceType: 'Standard Dedicated Seva Package (₹50,000 / mo)',
      date: '2026-08-09',
      time: '08:00 AM',
      status: 'Confirmed',
      caregiverName: 'Ramesh Sharma',
      notes: 'Sattvik morning temple walk escort',
      location: 'Mumbai, Maharashtra',
      religionPref: 'Hindu (Sattvik)',
      totalAmountINR: 50000,
      paymentStatus: 'Paid',
      paymentMethod: 'UPI QR Code Scanner',
      transactionId: 'TXN-882194012',
      paidAt: '07 Aug 2026, 11:30 AM'
    }
  ]);

  // Handle Step 1: Login Success
  const handleLoginSuccess = (name: string, emailOrPhone: string) => {
    setUser((prev) => ({
      ...prev,
      name,
      emailOrPhone,
      isLoggedIn: true,
      hasCompletedPreferences: false // Triggers Step 2 (Religion & Location)
    }));
  };

  // Handle Step 2: Religion & Location Save
  const handleSavePreferences = (
    religion: ReligionOption,
    diet: DietaryPreference,
    location: LocationData
  ) => {
    setUser((prev) => ({
      ...prev,
      religion,
      dietaryPreference: diet,
      location,
      hasCompletedPreferences: true // Unlocks Step 3 Dashboard
    }));
  };

  // Handle Language Toggle
  const handleLanguageToggle = (lang: Language) => {
    setUser((prev) => ({ ...prev, language: lang }));
  };

  // Handle Logout
  const handleLogout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
      hasCompletedPreferences: false
    }));
  };

  // Handle Seva Booking Request
  const handleOpenBookingModal = (caregiver: Caregiver | null) => {
    setSelectedCaregiverForBooking(caregiver);
    setIsBookModalOpen(true);
  };

  const handleConfirmBooking = (req: SevaRequest) => {
    setMyRequests((prev) => [req, ...prev]);
  };

  const handlePaymentSuccessFromPortal = (req: SevaRequest) => {
    setMyRequests((prev) => [req, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      
      {/* Top Sticky Navigation */}
      <Navbar
        user={user}
        onOpenPreferences={() => setIsEditPrefOpen(true)}
        onOpenPaymentPortal={() => setIsPaymentPortalOpen(true)}
        onLogout={handleLogout}
        onLanguageToggle={handleLanguageToggle}
      />

      {/* Main Flow Logic */}
      <main className="flex-1">
        
        {/* STEP 1: LOGIN PAGE */}
        {!user.isLoggedIn && (
          <LoginPage
            language={user.language}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {/* STEP 2: RELIGION & LOCATION SELECTION (Triggers immediately after login) */}
        {user.isLoggedIn && !user.hasCompletedPreferences && (
          <PreferenceStep
            user={user}
            onSavePreferences={handleSavePreferences}
          />
        )}

        {/* STEP 3: SEVA CARE MAIN DASHBOARD */}
        {user.isLoggedIn && user.hasCompletedPreferences && (
          <Dashboard
            user={user}
            onOpenEditPreferences={() => setIsEditPrefOpen(true)}
            onRequestSeva={handleOpenBookingModal}
            onOpenPaymentPortal={() => setIsPaymentPortalOpen(true)}
            myRequests={myRequests}
          />
        )}

      </main>

      {/* EDIT RELIGION & LOCATION MODAL */}
      <EditPreferencesModal
        user={user}
        isOpen={isEditPrefOpen}
        onClose={() => setIsEditPrefOpen(false)}
        onSave={handleSavePreferences}
      />

      {/* BOOK SEVA CARE MODAL */}
      <BookSevaModal
        key={selectedCaregiverForBooking ? selectedCaregiverForBooking.id : 'default-booking-modal'}
        user={user}
        caregiver={selectedCaregiverForBooking}
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* DEDICATED SEPARATE PAYMENT PORTAL */}
      <PaymentPortal
        user={user}
        myRequests={myRequests}
        isOpen={isPaymentPortalOpen}
        onClose={() => setIsPaymentPortalOpen(false)}
        onPaymentSuccess={handlePaymentSuccessFromPortal}
        initialSelectedCaregiver={selectedCaregiverForBooking}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Seva Care Platform. All Rights Reserved.</span>
          <span className="text-emerald-400 font-medium">
            {user.language === 'hi' ? 'धर्म, संस्कृति एवं सेवा का पवित्र संगम' : 'Faith-Respecting Compassionate Care'}
          </span>
        </div>
      </footer>

    </div>
  );
}
