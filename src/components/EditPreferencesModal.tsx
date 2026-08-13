import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Sparkles, Utensils, Check } from 'lucide-react';
import { DietaryPreference, LocationData, ReligionOption, UserProfile } from '../types';
import { RELIGION_OPTIONS, STATES_AND_CITIES } from '../data/mockData';

import logoImg from '../assets/images/company_logo_1786133447834.jpg';

interface EditPreferencesModalProps {
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (religion: ReligionOption, diet: DietaryPreference, location: LocationData) => void;
}

export const EditPreferencesModal: React.FC<EditPreferencesModalProps> = ({
  user,
  isOpen,
  onClose,
  onSave,
}) => {
  const isHi = user.language === 'hi';

  const [religion, setReligion] = useState<ReligionOption>(user.religion);
  const [diet, setDiet] = useState<DietaryPreference>(user.dietaryPreference);
  const [stateName, setStateName] = useState<string>(user.location.state || 'Maharashtra');
  const [cityName, setCityName] = useState<string>(user.location.city || 'Mumbai');
  const [pincode, setPincode] = useState<string>(user.location.pincode || '400001');

  if (!isOpen) return null;

  const handleStateChange = (st: string) => {
    setStateName(st);
    const cities = STATES_AND_CITIES[st] || [];
    if (cities.length > 0) setCityName(cities[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(religion, diet, {
      state: stateName,
      city: cityName,
      pincode: pincode.trim() || '400001',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto text-white"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-700/60 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={logoImg} 
                alt="SevaCare Logo" 
                className="w-full h-full object-cover rounded-[10px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">
              {isHi ? 'धर्म एवं स्थान प्राथमिकता बदलें' : 'Edit Religion & Location'}
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Religion Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                {isHi ? 'धर्म चुनें (Select Religion)' : 'Select Religion'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {RELIGION_OPTIONS.map((item) => {
                  const isSelected = religion === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setReligion(item.id)}
                      className={`p-2.5 rounded-lg border text-left flex items-center space-x-2 transition-all ${
                        isSelected
                          ? 'bg-red-950 border-red-500 text-white font-semibold'
                          : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-xs">{isHi ? item.labelHi.split(' ')[0] : item.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Diet Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-red-400 mb-2 flex items-center space-x-1">
                <Utensils className="w-3.5 h-3.5" />
                <span>{isHi ? 'आहार प्राथमिकता' : 'Dietary Preference'}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {(['Sattvik', 'Pure Veg', 'Jain', 'Halal', 'No Preference'] as DietaryPreference[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDiet(d)}
                    className={`px-3 py-1 rounded-md text-xs border ${
                      diet === d
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Location Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-red-400 mb-2 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isHi ? 'स्थान चुनें (Location)' : 'Location'}</span>
              </label>
              <div className="grid grid-cols-2 gap-3 mb-2">
                <div>
                  <label className="text-[11px] text-slate-400">{isHi ? 'राज्य' : 'State'}</label>
                  <select
                    value={stateName}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full mt-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    {Object.keys(STATES_AND_CITIES).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400">{isHi ? 'शहर' : 'City'}</label>
                  <select
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    className="w-full mt-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  >
                    {(STATES_AND_CITIES[stateName] || []).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[11px] text-slate-400">{isHi ? 'पिनकोड' : 'Pincode'}</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-medium text-slate-200"
              >
                {isHi ? 'रद्द करें' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-bold text-white flex items-center space-x-1"
              >
                <Check className="w-4 h-4" />
                <span>{isHi ? 'अद्यतन करें' : 'Update Preferences'}</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
