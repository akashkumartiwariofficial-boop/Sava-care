import React from 'react';
import { MapPin, Globe, LogOut, SlidersHorizontal, Shield, Sparkles, CreditCard } from 'lucide-react';
import { Language, UserProfile } from '../types';
import logoImg from '../assets/images/company_logo_1786133447834.jpg';

interface NavbarProps {
  user: UserProfile;
  onOpenPreferences: () => void;
  onOpenPaymentPortal?: () => void;
  onLogout: () => void;
  onLanguageToggle: (lang: Language) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenPreferences,
  onOpenPaymentPortal,
  onLogout,
  onLanguageToggle,
}) => {
  const isHi = user.language === 'hi';

  return (
    <header className="sticky top-0 z-40 bg-red-950/90 backdrop-blur-md border-b border-red-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden">
              <img 
                src={logoImg} 
                alt="SevaCare Logo" 
                className="w-full h-full object-cover rounded-[10px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-serif flex items-center">
                  Seva<span className="text-red-500">Care</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-900/80 text-rose-200 border border-red-700/60">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Care
                </span>
              </div>
              <p className="text-xs text-rose-200/80 hidden xs:block">
                {isHi ? 'विश्वास और सम्मान के साथ सेवा' : 'Compassionate & Faith-Respecting Care'}
              </p>
            </div>
          </div>

          {/* User Preferences & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Dedicated Payment Portal Button */}
            {user.isLoggedIn && user.hasCompletedPreferences && onOpenPaymentPortal && (
              <button
                onClick={onOpenPaymentPortal}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-500/80 text-white shadow-md transition-all cursor-pointer"
                title={isHi ? 'पेमेंट पोर्टल पर जाएँ (UPI, QR, Invoices)' : 'Dedicated Payment Portal'}
              >
                <CreditCard className="w-4 h-4 text-emerald-200" />
                <span className="hidden sm:inline">{isHi ? 'पेमेंट पोर्टल' : 'Payment Portal'}</span>
              </button>
            )}

            {/* Language Toggle */}
            <button
              onClick={() => onLanguageToggle(user.language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-red-900/60 hover:bg-red-800 border border-red-700/60 text-rose-100 transition-colors cursor-pointer"
              title="Change Language / भाषा बदलें"
            >
              <Globe className="w-4 h-4 text-red-400" />
              <span className="font-semibold">{user.language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Selected Location & Religion Indicator (if logged in & prefs done) */}
            {user.isLoggedIn && user.hasCompletedPreferences && (
              <button
                onClick={onOpenPreferences}
                className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-red-900/80 hover:bg-red-800 border border-red-700 text-xs sm:text-sm text-rose-100 transition-all cursor-pointer group shadow-inner"
                title={isHi ? 'धर्म और स्थान की प्राथमिकता बदलें' : 'Change Religion & Location Settings'}
              >
                <div className="flex items-center space-x-1 text-rose-200 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>{user.location.city || 'Select City'}</span>
                </div>
                <span className="text-red-600">|</span>
                <div className="flex items-center space-x-1 text-amber-300 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{user.religion}</span>
                </div>
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-400 ml-1 group-hover:rotate-45 transition-transform" />
              </button>
            )}

            {/* Mobile preference icon button */}
            {user.isLoggedIn && user.hasCompletedPreferences && (
              <button
                onClick={onOpenPreferences}
                className="md:hidden p-2 rounded-lg bg-red-900 border border-red-700 text-rose-200 hover:text-white"
                title={isHi ? 'प्राथमिकताएं बदलें' : 'Edit Preferences'}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            )}

            {/* Logout button */}
            {user.isLoggedIn && (
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                title={isHi ? 'लॉगआउट करें' : 'Log Out'}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">{isHi ? 'लॉगआउट' : 'Logout'}</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
