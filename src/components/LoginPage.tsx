import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Phone, Mail, ArrowRight, ShieldCheck, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import logoImg from '../assets/images/company_logo_1786133447834.jpg';

interface LoginPageProps {
  language: Language;
  onLoginSuccess: (name: string, emailOrPhone: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ language, onLoginSuccess }) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isHi = language === 'hi';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      setError(isHi ? 'कृपया मोबाइल नंबर या ईमेल दर्ज करें' : 'Please enter mobile number or email');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      const displayName = inputValue.includes('@') 
        ? inputValue.split('@')[0] 
        : 'Seva User';
      onLoginSuccess(displayName, inputValue);
    }, 800);
  };

  const handleQuickDemoLogin = (type: 'senior' | 'family') => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (type === 'senior') {
        onLoginSuccess('Sharma Ji (Senior Citizen)', '+91 98765 43210');
      } else {
        onLoginSuccess('Ananya Roy (Family Member)', 'ananya.roy@example.com');
      }
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-900 relative overflow-hidden">
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-800/90 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl relative z-10">
        
        {/* Left Side: Brand Narrative & Visual */}
        <div className="lg:col-span-5 bg-gradient-to-br from-red-950 via-rose-950 to-slate-900 p-6 sm:p-8 text-white flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-red-800/50">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 p-0.5 shadow-lg overflow-hidden shrink-0">
                <img 
                  src={logoImg} 
                  alt="SevaCare Logo" 
                  className="w-full h-full object-cover rounded-[10px]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/20 text-rose-300 text-xs font-medium border border-red-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isHi ? 'भरोसेमंद सेवा नेटवर्क' : 'Trusted Seva Network'}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight mb-3">
              Seva<span className="text-red-500">Care</span>
            </h1>
            <p className="text-sm text-rose-100/80 leading-relaxed mb-6">
              {isHi
                ? 'आपके शहर में धर्म, आहार और सांस्कृतिक प्राथमिकताओं के अनुरूप समर्पित बुजुर्ग एवं मरीज देखभाल सेवा।'
                : 'Personalized elderly & patient care service tailored to your location, religion, and dietary preferences.'}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  {isHi ? 'धर्म एवं सात्विक/हलाल आहार प्राथमिकताओं का सम्मान' : 'Faith & Faith-specific diet respect (Sattvik, Halal, Jain)'}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  {isHi ? 'स्थानीय और सत्यापित सेवादार एवं स्वयंसेवक' : 'Location-matched verified caregivers & volunteers'}
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200">
                  {isHi ? '24x7 आपातकालीन सहायता और अस्पताल साथी' : '24x7 Emergency assistance & Temple/Hospital escort'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-red-800/40 text-xs text-rose-300/70">
            {isHi ? '100% सुरक्षित एवं गोपनीय लॉगिन' : '🔒 100% Encrypted & Safe Seva Login'}
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center bg-slate-800/50">
          
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white font-serif">
              {isHi ? 'सेवा केयर में लॉगिन करें' : 'Login to Seva Care'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {isHi
                ? 'पहले कदम: लॉगिन करें. फिर अगले चरण में धर्म और स्थान चुनें।'
                : 'Step 1: Sign in. Next step will set your Religion & Location preferences.'}
            </p>
          </div>

          {/* Login Method Toggle */}
          <div className="flex bg-slate-900/80 p-1 rounded-lg border border-slate-700/80 mb-5">
            <button
              type="button"
              onClick={() => { setLoginMethod('phone'); setError(''); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                loginMethod === 'phone'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5 inline-block mr-1.5" />
              {isHi ? 'मोबाइल नंबर' : 'Mobile Number'}
            </button>
            <button
              type="button"
              onClick={() => { setLoginMethod('email'); setError(''); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-md transition-all ${
                loginMethod === 'email'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5 inline-block mr-1.5" />
              {isHi ? 'ईमेल आईडी' : 'Email Address'}
            </button>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {error && (
              <div className="p-3 text-xs rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                {loginMethod === 'phone'
                  ? (isHi ? 'मोबाइल नंबर (Mobile Number)' : 'Mobile Number')
                  : (isHi ? 'ईमेल आईडी (Email ID)' : 'Email ID')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  {loginMethod === 'phone' ? <Phone className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                </div>
                <input
                  type={loginMethod === 'phone' ? 'tel' : 'email'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    loginMethod === 'phone'
                      ? (isHi ? '+91 9876543210' : '+91 9876543210')
                      : 'user@example.com'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password or OTP */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  {otpMode 
                    ? (isHi ? 'ओटीपी (OTP)' : 'Verification OTP')
                    : (isHi ? 'पासवर्ड (Password)' : 'Password')}
                </label>
                <button
                  type="button"
                  onClick={() => setOtpMode(!otpMode)}
                  className="text-xs text-red-400 hover:underline"
                >
                  {otpMode 
                    ? (isHi ? 'पासवर्ड से लॉगिन करें' : 'Use Password')
                    : (isHi ? 'ओटीपी (OTP) भेजें' : 'Send OTP')}
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={otpMode ? 'text' : 'password'}
                  value={otpMode ? otpValue : password}
                  onChange={(e) => otpMode ? setOtpValue(e.target.value) : setPassword(e.target.value)}
                  placeholder={otpMode ? (isHi ? '4-अंकों का OTP दर्ज करें' : 'Enter 4-digit OTP') : '••••••••'}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-lg shadow-lg hover:shadow-red-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isHi ? 'लॉगिन करें एवं आगे बढ़ें' : 'Login & Continue'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fillers for Instant Access */}
          <div className="mt-6 pt-5 border-t border-slate-700/80">
            <p className="text-xs font-medium text-slate-400 text-center mb-3">
              ⚡ {isHi ? 'त्वरित परीक्षण हेतु 1-क्लिक डेमो लॉगिन:' : 'Quick 1-Click Demo Login:'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('senior')}
                className="py-2 px-3 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-rose-300 font-medium transition-colors text-center cursor-pointer"
              >
                👴 {isHi ? 'वरिष्ठ नागरिक' : 'Senior Citizen'}
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('family')}
                className="py-2 px-3 bg-slate-900 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-rose-300 font-medium transition-colors text-center cursor-pointer"
              >
                👨‍👩‍👧 {isHi ? 'परिवार सदस्य' : 'Family Member'}
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
