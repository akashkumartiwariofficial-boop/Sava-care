import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, MapPin, Sparkles, Phone, ShieldCheck, Search, Filter, 
  Calendar, Clock, CheckCircle2, UserCheck, HeartHandshake, 
  Building2, Stethoscope, UtensilsCrossed, ShieldAlert, Edit3, 
  ChevronRight, Star, AlertCircle, Plus, SlidersHorizontal, CreditCard, QrCode
} from 'lucide-react';
import { Caregiver, SevaRequest, UserProfile } from '../types';
import { INITIAL_CAREGIVERS, SERVICE_CATEGORIES } from '../data/mockData';

interface DashboardProps {
  user: UserProfile;
  onOpenEditPreferences: () => void;
  onRequestSeva: (caregiver: Caregiver | null) => void;
  onOpenPaymentPortal?: () => void;
  myRequests: SevaRequest[];
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onOpenEditPreferences,
  onRequestSeva,
  onOpenPaymentPortal,
  myRequests,
}) => {
  const isHi = user.language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCityOnly, setFilterCityOnly] = useState(true);
  const [filterReligionMatch, setFilterReligionMatch] = useState(true);
  const [activeTab, setActiveTab] = useState<'caregivers' | 'services' | 'my_requests'>('caregivers');
  const [sosActive, setSosActive] = useState(false);

  // Filter caregivers based on user location and religion preference
  const filteredCaregivers = INITIAL_CAREGIVERS.filter((cg) => {
    // Search query filter
    const matchesSearch = 
      cg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cg.roleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cg.roleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cg.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // City filter
    if (filterCityOnly) {
      if (cg.city.toLowerCase() !== user.location.city.toLowerCase()) {
        return false;
      }
    }

    // Religion filter (Strict matching for religion-specific contractors)
    if (filterReligionMatch) {
      const servesReligion = cg.primaryReligion
        ? cg.primaryReligion === user.religion
        : cg.religionsServed.includes(user.religion);
      if (!servesReligion) return false;
    }

    return true;
  });

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-red-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-amber-400" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-rose-400" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-orange-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-6 h-6 text-rose-400" />;
      default: return <Heart className="w-6 h-6 text-red-400" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 text-slate-100 pb-16">
      
      {/* TOP USER PREFERENCE HIGHLIGHT BANNER */}
      <section className="bg-gradient-to-r from-red-950 via-slate-900 to-rose-950 border-b border-red-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span>{isHi ? 'सेवा केयर डैशबोर्ड' : 'Seva Care Portal'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
              {isHi ? `नमस्ते, ${user.name} 👋` : `Welcome, ${user.name} 👋`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {isHi 
                ? 'आपकी चुनी हुई धर्म-मान्यता एवं स्थान के अनुसार सेवादार तैयार हैं।'
                : 'Verified caregivers matched with your faith & location preferences.'}
            </p>
          </div>

          {/* ACTIVE PREFERENCES CHIP & EDIT BUTTON */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-900/90 p-3 rounded-xl border border-red-800/80 shadow-lg">
            
            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-red-950 border border-red-700 text-xs font-semibold text-rose-300">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{user.location.city}, {user.location.state}</span>
            </div>

            <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-700/80 text-xs font-semibold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{user.religion} ({user.dietaryPreference})</span>
            </div>

            <button
              onClick={onOpenEditPreferences}
              className="flex items-center space-x-1 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isHi ? 'बदलें' : 'Change'}</span>
            </button>

          </div>

        </div>
      </section>

      {/* SOS EMERGENCY ALERT & DEDICATED PAYMENT PORTAL ROW */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 border border-rose-800/80 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-rose-600/20 text-rose-400 animate-bounce">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                {isHi ? '24x7 तत्काल आपातकालीन सेवा (Emergency SOS)' : '24x7 Immediate Emergency Seva Helpline'}
              </h4>
              <p className="text-xs text-rose-200/80">
                {isHi
                  ? `${user.location.city} में अचानक स्वास्थ्य या एम्बुलेंस सहायता के लिए तुरंत कॉल करें`
                  : `Urgent caregiver rush or ambulance support in ${user.location.city}`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSosActive(!sosActive)}
            className="w-full sm:w-auto px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>{sosActive ? '+91 1800-SEVA-CARE (Active)' : (isHi ? 'आपातकालीन कॉल' : 'Emergency Call')}</span>
          </button>
        </div>

        {/* DEDICATED PAYMENT PORTAL QUICK LAUNCH CARD */}
        {onOpenPaymentPortal && (
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/80 rounded-xl p-3.5 sm:p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  <span>{isHi ? 'पेमेंट पोर्टल' : 'Dedicated Payment Portal'}</span>
                  <span className="bg-emerald-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded">UPI QR</span>
                </h4>
                <p className="text-[11px] text-emerald-200/80">
                  {isHi ? 'पैकेज भुगतान, यूपीआई स्कैनर व रसीदें' : 'Pay packages, UPI QR scanner & invoices'}
                </p>
              </div>
            </div>
            <button
              onClick={onOpenPaymentPortal}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow transition-all flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>{isHi ? 'पोर्टल खोलें' : 'Open Portal'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB CONTROLS */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div className="flex space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('caregivers')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'caregivers'
                  ? 'bg-red-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👩‍⚕️ {isHi ? 'सत्यापित सेवादार' : 'Verified Caregivers'} ({filteredCaregivers.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'services'
                  ? 'bg-red-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📜 {isHi ? 'सेवा श्रेणियाँ' : 'Seva Categories'}
            </button>
            <button
              onClick={() => setActiveTab('my_requests')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                activeTab === 'my_requests'
                  ? 'bg-red-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📋 {isHi ? 'मेरे अनुरोध' : 'My Seva Bookings'} ({myRequests.length})
            </button>
          </div>

          <button
            onClick={() => onRequestSeva(null)}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold rounded-xl shadow transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isHi ? 'नया सेवा अनुरोध' : 'Request New Seva'}</span>
          </button>
        </div>

        {/* TAB 1: CAREGIVERS DIRECTORY */}
        {activeTab === 'caregivers' && (
          <div className="space-y-6">
            
            {/* Search & Preference Filters Bar */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isHi ? 'सेवादार का नाम या शहर खोजें...' : 'Search by name or city...'}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto text-xs">
                
                <label className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={filterCityOnly}
                    onChange={(e) => setFilterCityOnly(e.target.checked)}
                    className="rounded text-red-500 focus:ring-0"
                  />
                  <span>📍 {isHi ? `केवल ${user.location.city} सेवादार` : `Only ${user.location.city}`}</span>
                </label>

                <label className="flex items-center space-x-2 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={filterReligionMatch}
                    onChange={(e) => setFilterReligionMatch(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-0"
                  />
                  <span>✨ {isHi ? `${user.religion} अनुकूल` : `${user.religion} Compatible`}</span>
                </label>

              </div>

            </div>

            {/* Caregivers Grid */}
            {filteredCaregivers.length === 0 ? (
              <div className="bg-slate-900/50 rounded-2xl p-8 text-center border border-slate-800 my-8">
                <AlertCircle className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">
                  {isHi ? 'इस फ़िल्टर में कोई सेवादार नहीं मिला' : 'No exact caregiver matched'}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                  {isHi
                    ? 'कृपया शहर फ़िल्टर हटाएं या अपने स्थान की प्राथमिकता को अपडेट करें।'
                    : 'Try unchecking the city filter or request a custom volunteer match.'}
                </p>
                <button
                  onClick={() => { setFilterCityOnly(false); setFilterReligionMatch(false); }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-rose-300 rounded-lg"
                >
                  {isHi ? 'सभी शहरों के सेवादार देखें' : 'Show All Available Caregivers'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCaregivers.map((cg) => (
                  <motion.div
                    key={cg.id}
                    whileHover={{ y: -4 }}
                    className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-red-800/80 transition-all relative overflow-hidden"
                  >
                    
                    {/* Top status */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={cg.avatarUrl}
                          alt={cg.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-red-500/80 shadow-md"
                        />
                        <div>
                          <h3 className="text-base font-bold text-white flex items-center gap-1">
                            {cg.name}
                            {cg.verified && (
                              <ShieldCheck className="w-4 h-4 text-red-400" title="Verified Seva Caregiver" />
                            )}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {isHi ? cg.roleHi : cg.roleEn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-lg text-xs font-bold text-amber-300">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{cg.rating}</span>
                        <span className="text-slate-500 text-[10px]">({cg.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Package Pricing Badge */}
                    <div className="mb-3 px-3 py-1.5 bg-gradient-to-r from-red-950/80 to-slate-950 border border-red-800/60 rounded-xl flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {isHi ? 'मासिक सेवा पैकेज:' : 'Seva Packages:'}
                      </span>
                      <span className="text-xs font-black text-rose-300">
                        ₹30,000 - ₹2 Lakhs / mo
                      </span>
                    </div>

                    {/* Meta info tags */}
                    <div className="space-y-2 mb-4 text-xs text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-400" /> {isHi ? 'स्थान:' : 'Location:'}
                        </span>
                        <span className="font-medium text-white">{cg.city}, {cg.state}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> {isHi ? 'धर्म सेवा:' : 'Faith Served:'}
                        </span>
                        <span className="font-medium text-amber-300">{cg.religionsServed.join(', ')}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{isHi ? 'आहार व्यवस्था:' : 'Diet Care:'}</span>
                        <span className="font-semibold text-rose-300">{cg.dietSpecialty}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">{isHi ? 'भाषाएं:' : 'Languages:'}</span>
                        <span className="text-slate-300">{cg.languages.join(', ')}</span>
                      </div>
                    </div>

                    {/* Quick Package Tiers Pill preview */}
                    <div className="flex items-center justify-between gap-1 text-[10px] text-slate-400 bg-slate-950 p-2 rounded-lg border border-slate-800 mb-4">
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-semibold">30k Basic</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-rose-300 font-semibold">50k Standard</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 font-semibold">1 Lakh Prem</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-rose-300 font-semibold">2 Lakh VIP</span>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => onRequestSeva(cg)}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white/20" />
                      <span>{isHi ? `${cg.name} - सेवा पैकेज (30k - 2L) बुक करें` : `Book Seva Packages with ${cg.name.split(' ')[0]}`}</span>
                    </button>

                  </motion.div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: SERVICE CATEGORIES */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_CATEGORIES.map((serv) => (
              <div
                key={serv.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg flex items-start space-x-4 hover:border-red-700/60 transition-all"
              >
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {getServiceIcon(serv.iconName)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-bold text-white">
                      {isHi ? serv.titleHi : serv.titleEn}
                    </h3>
                    {serv.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-rose-300 border border-red-800">
                        {serv.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {isHi ? serv.descHi : serv.descEn}
                  </p>
                  <button
                    onClick={() => onRequestSeva(null)}
                    className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center space-x-1"
                  >
                    <span>{isHi ? 'इस सेवा का अनुरोध करें' : 'Request This Service'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: MY REQUESTS */}
        {activeTab === 'my_requests' && (
          <div className="space-y-4">
            {myRequests.length === 0 ? (
              <div className="bg-slate-900/50 rounded-2xl p-8 text-center border border-slate-800 my-4">
                <Clock className="w-10 h-10 text-slate-500 mx-auto mb-2" />
                <h3 className="text-base font-bold text-white mb-1">
                  {isHi ? 'कोई सेवा अनुरोध नहीं मिला' : 'No active requests yet'}
                </h3>
                <p className="text-xs text-slate-400 mb-4">
                  {isHi ? 'अपने बुजुर्गों या परिवार के लिए सेवा केयर अनुरोध दर्ज करें।' : 'Book a companion or health assistant for your loved ones.'}
                </p>
                <button
                  onClick={() => onRequestSeva(null)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg"
                >
                  {isHi ? 'पहला अनुरोध दर्ज करें' : 'Request First Seva'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myRequests.map((req) => (
                  <div
                    key={req.id}
                    className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-slate-400">{req.id}</span>
                        <div className="flex items-center gap-1.5">
                          {req.paymentStatus === 'Paid' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {isHi ? 'भुगतान सफल (PAID)' : 'PAID'}
                            </span>
                          )}
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-950 text-rose-300 border border-red-800 flex items-center gap-1">
                            {req.status}
                          </span>
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{req.serviceType}</h4>
                      <p className="text-xs text-slate-400 mb-2">
                        👤 {req.caregiverName} • 📍 {req.location}
                      </p>
                      
                      {req.totalAmountINR && (
                        <div className="flex items-center justify-between text-xs bg-slate-950 p-2 rounded border border-slate-800 mb-2">
                          <span className="text-slate-400">{isHi ? 'भुगतान राशि:' : 'Paid Amount:'}</span>
                          <span className="font-bold text-rose-400">₹{req.totalAmountINR.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      {req.transactionId && (
                        <p className="text-[10px] font-mono text-amber-300/90 bg-slate-950 px-2 py-1 rounded border border-slate-800 mb-2">
                          💳 Txn ID: {req.transactionId} ({req.paymentMethod})
                        </p>
                      )}

                      <p className="text-xs text-amber-300/90 bg-slate-950 p-2 rounded border border-slate-800 mb-2">
                        ☸️ {req.religionPref}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 mt-2">
                      <span>📅 {req.date} at {req.time}</span>
                      <span className="text-slate-300 italic">{req.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
