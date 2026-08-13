import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Sparkles, Utensils, Check, ArrowRight, Compass, ShieldCheck, Heart } from 'lucide-react';
import { DietaryPreference, Language, LocationData, ReligionOption, UserProfile } from '../types';
import { RELIGION_OPTIONS, STATES_AND_CITIES } from '../data/mockData';
import logoImg from '../assets/images/company_logo_1786133447834.jpg';

interface PreferenceStepProps {
  user: UserProfile;
  onSavePreferences: (religion: ReligionOption, diet: DietaryPreference, location: LocationData) => void;
}

export const PreferenceStep: React.FC<PreferenceStepProps> = ({ user, onSavePreferences }) => {
  const isHi = user.language === 'hi';

  const [selectedReligion, setSelectedReligion] = useState<ReligionOption>('Hindu');
  const [selectedDiet, setSelectedDiet] = useState<DietaryPreference>('Sattvik');
  const [selectedState, setSelectedState] = useState<string>('Maharashtra');
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [pincode, setPincode] = useState<string>('400001');
  const [address, setAddress] = useState<string>('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  const availableCities = STATES_AND_CITIES[selectedState] || [];

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    const cities = STATES_AND_CITIES[state] || [];
    if (cities.length > 0) {
      setSelectedCity(cities[0]);
    }
  };

  const handleAutoDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      setSelectedState('Maharashtra');
      setSelectedCity('Mumbai');
      setPincode('400050');
      setAddress('Bandra West, Mumbai');
      setLocationDetected(true);
    }, 900);
  };

  const handleReligionSelect = (rel: ReligionOption) => {
    setSelectedReligion(rel);
    // Auto adjust recommended diet based on religion
    if (rel === 'Hindu') setSelectedDiet('Sattvik');
    else if (rel === 'Muslim') setSelectedDiet('Halal');
    else if (rel === 'Sikh') setSelectedDiet('Pure Veg');
    else if (rel === 'Jain') setSelectedDiet('Jain');
    else if (rel === 'Buddhist') setSelectedDiet('Pure Veg');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePreferences(
      selectedReligion,
      selectedDiet,
      {
        state: selectedState,
        city: selectedCity,
        pincode: pincode.trim() || '400001',
        address: address.trim()
      }
    );
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl w-full bg-slate-800 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        
        {/* Header Step Badge */}
        <div className="flex items-center justify-between border-b border-slate-700/80 pb-5 mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={logoImg} 
                alt="SevaCare Logo" 
                className="w-full h-full object-cover rounded-[10px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-400">
                {isHi ? 'चरण 2 ऑफ 2 • प्राथमिकताएं' : 'Step 2 of 2 • Setup Profile'}
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {isHi ? 'धर्म एवं स्थान का चयन करें' : 'Select Religion & Location'}
              </h2>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs text-slate-400">
              {isHi ? 'लॉगिन उपयोगकर्ता:' : 'Logged in as:'}
            </span>
            <p className="text-xs font-semibold text-red-400">{user.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: RELIGION & CULTURAL PREFERENCES */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                1. {isHi ? 'धर्म एवं आस्था प्राथमिकता (Religion Preference)' : 'Religion & Faith Preference'}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              {isHi 
                ? 'हम आपके चुनिंदा धर्म और मान्यताओं का पालन करने वाले सेवादारों एवं अनुकूल सुविधाओं का सुझाव देंगे।'
                : 'We will curate caregivers, food options, and local worship companions aligned with your faith.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RELIGION_OPTIONS.map((item) => {
                const isSelected = selectedReligion === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleReligionSelect(item.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isSelected
                        ? 'bg-red-950/80 border-red-500 ring-2 ring-red-500/40 text-white shadow-lg'
                        : 'bg-slate-900/60 border-slate-700/80 hover:bg-slate-700/50 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-slate-950">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {isHi ? item.labelHi : item.labelEn}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                        {isHi ? item.descHi : item.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DIETARY PREFERENCE */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/60">
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-red-400" />
              <span>
                {isHi ? 'आहार एवं भोजन आवश्यकता (Dietary Requirement)' : 'Dietary Requirement'}
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {(['Sattvik', 'Pure Veg', 'Jain', 'Halal', 'No Preference'] as DietaryPreference[]).map((diet) => (
                <button
                  key={diet}
                  type="button"
                  onClick={() => setSelectedDiet(diet)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    selectedDiet === diet
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {diet === 'Sattvik' && '🥬 '}
                  {diet === 'Pure Veg' && '🥗 '}
                  {diet === 'Jain' && '🥕 '}
                  {diet === 'Halal' && '🌙 '}
                  {diet === 'No Preference' && '🍽️ '}
                  {diet}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 2: LOCATION PREFERENCES */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-400" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  2. {isHi ? 'स्थान का चयन (Location Selection)' : 'Location Selection'}
                </h3>
              </div>

              {/* Auto-detect button */}
              <button
                type="button"
                onClick={handleAutoDetectLocation}
                disabled={isLocating}
                className="text-xs flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/80 text-rose-300 transition-colors cursor-pointer"
              >
                <Compass className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                <span>
                  {isLocating
                    ? (isHi ? 'स्थान खोजा जा रहा है...' : 'Detecting...')
                    : (isHi ? 'वर्तमान स्थान पहचानें (GPS)' : 'Auto-detect Location')}
                </span>
              </button>
            </div>

            {locationDetected && (
              <div className="mb-3 p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-rose-300 flex items-center space-x-2">
                <Check className="w-4 h-4 text-red-400 shrink-0" />
                <span>{isHi ? 'स्थान सफलतापूर्व पहचाना गया: मुंबई, महाराष्ट्र' : 'GPS Location detected: Mumbai, Maharashtra'}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* State Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isHi ? 'राज्य (State)' : 'State'}
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {Object.keys(STATES_AND_CITIES).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Dropdown */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isHi ? 'शहर (City)' : 'City'}
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {availableCities.map((ct) => (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area / Address */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isHi ? 'क्षेत्र / इलाका (Area / Locality)' : 'Area / Locality'}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={isHi ? 'उदा. अंधेरी वेस्ट, एमजी रोड' : 'e.g. Andheri West, MG Road'}
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {isHi ? 'पिनकोड (Pincode)' : 'Pincode'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="400001"
                  className="w-full py-2.5 px-3 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-700/80">
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl shadow-xl shadow-red-950/50 transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm sm:text-base"
            >
              <Heart className="w-5 h-5 text-rose-200 fill-rose-200" />
              <span>
                {isHi
                  ? `सेवा डैशबोर्ड में प्रवेश करें (${selectedCity}, ${selectedReligion})`
                  : `Save & Enter Seva Dashboard (${selectedCity}, ${selectedReligion})`}
              </span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>
          </div>

        </form>

      </motion.div>
    </div>
  );
};
