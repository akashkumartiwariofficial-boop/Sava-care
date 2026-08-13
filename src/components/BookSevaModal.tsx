import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, 
  Sparkles, Check, Tag, QrCode, Camera, Download, Share2, 
  ArrowLeft, CreditCard, Building2, Smartphone, Copy, Zap, 
  FileText, Lock, ChevronRight 
} from 'lucide-react';
import { Caregiver, SevaRequest, UserProfile } from '../types';
import { SEVA_PACKAGES_TEMPLATES } from '../data/mockData';
import logoImg from '../assets/images/company_logo_1786133447834.jpg';

interface BookSevaModalProps {
  user: UserProfile;
  caregiver: Caregiver | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (req: SevaRequest) => void;
}

type ModalStep = 'details' | 'payment' | 'thankyou';
type PaymentMethod = 'upi_qr' | 'upi_id' | 'card' | 'netbanking' | 'postpaid';

export const BookSevaModal: React.FC<BookSevaModalProps> = ({
  user,
  caregiver,
  isOpen,
  onClose,
  onConfirmBooking,
}) => {
  const isHi = user.language === 'hi';

  const availablePackages = (caregiver && caregiver.packages && caregiver.packages.length > 0)
    ? caregiver.packages
    : SEVA_PACKAGES_TEMPLATES;

  // Step state
  const [step, setStep] = useState<ModalStep>('details');

  // Details state
  const [bookingMode, setBookingMode] = useState<'package' | 'hourly'>('package');
  const [selectedPkgId, setSelectedPkgId] = useState<string>(availablePackages[1]?.id || availablePackages[0]?.id || 'pkg-50k');
  const [serviceType, setServiceType] = useState('Elderly Companion & Walk Assistant');
  const [date, setDate] = useState('2026-08-08');
  const [time, setTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi_qr');
  const [qrViewMode, setQrViewMode] = useState<'code' | 'scanner'>('code');
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [payProgressText, setPayProgressText] = useState('');
  const [customUpiId, setCustomUpiId] = useState('');
  const [upiRefId, setUpiRefId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Completed Request state for Receipt
  const [confirmedRequest, setConfirmedRequest] = useState<SevaRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedPkg = availablePackages.find((p) => p.id === selectedPkgId) || availablePackages[0];

  if (!isOpen) return null;

  const totalAmount = bookingMode === 'package' && selectedPkg ? selectedPkg.priceINR : 500;
  const totalAmountDisplay = bookingMode === 'package' && selectedPkg 
    ? selectedPkg.priceDisplay 
    : `₹${totalAmount.toLocaleString('en-IN')}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText('sevacare.foundation@sbi');
    setCopiedUpi(true);
    showToast(isHi ? 'यूपीआई आईडी कॉपी हो गई: sevacare.foundation@sbi' : 'UPI ID Copied: sevacare.foundation@sbi');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleExecutePayment = (methodName: string) => {
    setIsProcessingPay(true);
    setPayProgressText(isHi ? 'यूपीआई क्यूआर कोड स्कैन हो रहा है...' : 'Scanning UPI QR Code...');

    setTimeout(() => {
      setPayProgressText(isHi ? 'बैंक भुगतान एवं सुरक्षा सत्यापन चालू है...' : 'Verifying Bank Payment & Gateway...');
    }, 1200);

    setTimeout(() => {
      setPayProgressText(isHi ? 'भुगतान सफल! रसीद जनरेट हो रही है...' : 'Payment Approved! Generating Receipt...');
    }, 2400);

    setTimeout(() => {
      const generatedTxnId = `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`;
      const nowStr = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const newReq: SevaRequest = {
        id: `SR-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceType: bookingMode === 'package' && selectedPkg 
          ? `${isHi ? selectedPkg.nameHi : selectedPkg.nameEn} (${selectedPkg.priceDisplay})` 
          : serviceType,
        selectedPackage: bookingMode === 'package' ? selectedPkg : undefined,
        totalAmountINR: totalAmount,
        date,
        time,
        status: 'Confirmed',
        caregiverName: caregiver ? caregiver.name : 'Matched Local Seva Caregiver',
        notes: notes || (isHi ? 'कोई विशेष टिप्पणी नहीं' : 'No extra notes'),
        location: `${user.location.city}, ${user.location.state}`,
        religionPref: `${user.religion} (${user.dietaryPreference})`,
        paymentStatus: 'Paid',
        paymentMethod: methodName,
        transactionId: generatedTxnId,
        paidAt: nowStr
      };

      setConfirmedRequest(newReq);
      setIsProcessingPay(false);
      setStep('thankyou');
    }, 3200);
  };

  const handleFinishAndClose = () => {
    if (confirmedRequest) {
      onConfirmBooking(confirmedRequest);
    }
    // Reset state
    setStep('details');
    setConfirmedRequest(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
        
        {/* Toast alert */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 z-50 bg-emerald-600 text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-emerald-400"
          >
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl shadow-2xl p-5 sm:p-6 relative text-white my-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={step === 'thankyou' ? handleFinishAndClose : onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 z-10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* STEP 1: PACKAGE & SEVA DETAILS */}
          {step === 'details' && (
            <>
              {/* Header */}
              <div className="flex items-center space-x-3 mb-4 pr-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 p-0.5 shadow-md flex items-center justify-center overflow-hidden shrink-0">
                  <img 
                    src={logoImg} 
                    alt="SevaCare Logo" 
                    className="w-full h-full object-cover rounded-[10px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-white">
                    {isHi ? 'स्टेप 1: पैकेज व सेवा चुनें (Select Package)' : 'Step 1: Select Seva Package'}
                  </h3>
                  <p className="text-xs text-rose-400">
                    📍 {user.location.city}, {user.location.state} • ☸️ {user.religion} ({user.dietaryPreference})
                  </p>
                </div>
              </div>

              {/* Caregiver info badge */}
              {caregiver && (
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={caregiver.avatarUrl}
                      alt={caregiver.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-red-500"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1">
                        {caregiver.name}
                        <ShieldCheck className="w-4 h-4 text-red-400" />
                      </h4>
                      <p className="text-xs text-slate-400">
                        {isHi ? caregiver.roleHi : caregiver.roleEn} • ⭐ {caregiver.rating}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded border border-amber-500/30 font-semibold">
                      {isHi ? 'पैकेज: ₹30k - ₹2 लाख' : 'Packages: ₹30k - ₹2 Lakhs'}
                    </span>
                  </div>
                </div>
              )}

              {/* Mode Switcher */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-5">
                <button
                  type="button"
                  onClick={() => setBookingMode('package')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    bookingMode === 'package'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  {isHi ? 'मासिक सेवा पैकेज (₹30k - ₹2 लाख)' : 'Monthly Packages (₹30k - ₹2 Lakhs)'}
                </button>
                <button
                  type="button"
                  onClick={() => setBookingMode('hourly')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    bookingMode === 'hourly'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  {isHi ? 'दैनिक / प्रति घंटा सेवा' : 'Daily / Custom Seva'}
                </button>
              </div>

              <form onSubmit={handleProceedToPayment} className="space-y-4">
                {bookingMode === 'package' ? (
                  <div>
                    <label className="block text-xs font-bold text-amber-300 mb-2 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {isHi
                        ? `${caregiver ? caregiver.name : 'सेवादार'} के धर्म-संगत सेवा पैकेज (₹30,000 से ₹2,00,000):`
                        : `Faith-customized Seva Packages for ${caregiver ? caregiver.name : 'Caregiver'} (₹30k to ₹2 Lakhs):`}
                    </label>

                    {/* Packages grid selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                      {availablePackages.map((pkg) => {
                        const isSelected = selectedPkgId === pkg.id;
                        return (
                          <div
                            key={pkg.id}
                            onClick={() => setSelectedPkgId(pkg.id)}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition-all relative ${
                              isSelected
                                ? 'bg-slate-800 border-red-500 shadow-md ring-1 ring-red-500'
                                : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            {pkg.popular && (
                              <span className="absolute -top-2 right-2 bg-gradient-to-r from-amber-500 to-rose-500 text-[9px] font-bold px-2 py-0.5 rounded-full text-slate-950 uppercase">
                                Popular Choice
                              </span>
                            )}
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="text-xs font-bold text-white pr-2">
                                {isHi ? pkg.nameHi : pkg.nameEn}
                              </h5>
                              {isSelected && <Check className="w-4 h-4 text-red-400 shrink-0" />}
                            </div>
                            <div className="text-sm font-black text-rose-400 mb-1">
                              {pkg.priceDisplay}
                            </div>
                            <p className="text-[10px] text-slate-400">
                              {isHi ? pkg.periodHi : pkg.periodEn}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Features list of selected package */}
                    {selectedPkg && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-red-900/40 text-xs space-y-1.5">
                        <div className="font-bold text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                          {isHi ? 'पैकेज विशेषताएँ (Features Included):' : 'Included in Package:'}
                        </div>
                        <ul className="space-y-1 text-slate-300 text-[11px] pt-1">
                          {(isHi ? selectedPkg.featuresHi : selectedPkg.featuresEn).map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-red-400">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isHi ? 'सेवा का प्रकार (Service Type)' : 'Service Category'}
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                    >
                      <option value="Elderly Companion & Walk Assistant">
                        {isHi ? 'बुजुर्ग देखभाल एवं साथी (Elderly Companion)' : 'Elderly Companion & Walk Assistant'}
                      </option>
                      <option value="Temple & Worship Place Escort">
                        {isHi ? 'धार्मिक स्थल दर्शन साथी (Worship Escort)' : 'Temple & Worship Place Escort'}
                      </option>
                      <option value="Home Nursing & Medication Seva">
                        {isHi ? 'गृह नर्सिंग एवं दवा सहायता (Home Nursing)' : 'Home Nursing & Medication Seva'}
                      </option>
                      <option value="Sattvik & Custom Meal Preparation">
                        {isHi ? 'सात्विक/अनुकूलित आहार सेवा (Dietary Care)' : 'Sattvik & Custom Meal Preparation'}
                      </option>
                      <option value="Emergency Volunteer Support">
                        {isHi ? 'आपातकालीन स्वयंसेवक (Emergency Support)' : 'Emergency Volunteer Support'}
                      </option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isHi ? 'प्रारंभ तिथि (Start Date)' : 'Preferred Date'}
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      {isHi ? 'समय (Preferred Time)' : 'Preferred Time'}
                    </label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="10:00 AM"
                      className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    {isHi ? 'विशेष आवश्यकताएँ या विवरण (Special Instructions)' : 'Special Instructions / Faith Notes'}
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    placeholder={
                      isHi
                        ? 'उदा. मंदिर/मस्जिद/गुरुद्वारा दर्शन हेतु सहायता, विशेष सात्विक/हलाल भोजन नियम...'
                        : 'e.g., Specific dietary preferences, prayer timing support, wheelchair needs...'
                    }
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 font-bold text-white rounded-xl shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {isHi
                      ? `भुगतान एवं स्कैनर पर जाएँ (${totalAmountDisplay})`
                      : `Proceed to Payment & QR Scanner (${totalAmountDisplay})`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* STEP 2: PAYMENT & QR CODE SCANNER */}
          {step === 'payment' && (
            <div className="space-y-4">
              {/* Top navigation / Back button */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isHi ? 'वापस (पैकेज बदलें)' : 'Back to Packages'}</span>
                </button>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded">
                    {isHi ? 'स्टेप 2: भुगतान एवं यूपीआई स्कैनर' : 'Step 2: Payment & QR Scanner'}
                  </span>
                </div>
              </div>

              {/* Order Summary banner */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-red-900/50 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-400">{isHi ? 'चयनित पैकेज:' : 'Selected Package:'}</p>
                  <h4 className="text-sm font-bold text-white">
                    {bookingMode === 'package' && selectedPkg
                      ? (isHi ? selectedPkg.nameHi : selectedPkg.nameEn)
                      : serviceType}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    👤 {caregiver ? caregiver.name : 'SevaCare Verified Caregiver'} • 📅 {date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-amber-400 font-semibold">{isHi ? 'कुल देय राशि:' : 'Total Payable:'}</p>
                  <p className="text-lg font-black text-rose-400">{totalAmountDisplay}</p>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div className="flex space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    paymentMethod === 'upi_qr'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{isHi ? 'यूपीआई QR स्कैनर' : 'UPI QR Scanner'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>{isHi ? 'कार्ड / नेटबैंकिंग' : 'Card / Bank'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('postpaid')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    paymentMethod === 'postpaid'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>{isHi ? 'सेवा के बाद पे' : 'Pay After Seva'}</span>
                </button>
              </div>

              {/* TAB CONTENT 1: UPI QR CODE & SCANNER */}
              {paymentMethod === 'upi_qr' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 text-center">
                  
                  {/* Mode switcher inside UPI (Display QR vs Camera Scanner) */}
                  <div className="flex justify-center space-x-2 bg-slate-900 p-1 rounded-lg w-fit mx-auto border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setQrViewMode('code')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                        qrViewMode === 'code' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{isHi ? 'भुगतान क्यूआर कोड (QR Display)' : 'Show Payment QR'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrViewMode('scanner')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                        qrViewMode === 'scanner' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{isHi ? 'लाइव कैमरा स्कैनर (Live Scanner)' : 'Open Camera Scanner'}</span>
                    </button>
                  </div>

                  {qrViewMode === 'code' ? (
                    /* Display UPI QR Code */
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        {isHi 
                          ? 'Google Pay, PhonePe, Paytm या किसी भी UPI ऐप से इस QR कोड को स्कैन करके भुगतान करें:' 
                          : 'Scan this QR code using Google Pay, PhonePe, Paytm, or any UPI app:'}
                      </p>

                      {/* Realistic SVG UPI QR Code */}
                      <div className="bg-white p-4 rounded-2xl w-56 h-56 mx-auto shadow-2xl relative flex flex-col items-center justify-center border-4 border-slate-800 group">
                        <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                          {/* Corner Finder Pattern Top-Left */}
                          <rect x="5" y="5" width="25" height="25" rx="3" fill="black" />
                          <rect x="9" y="9" width="17" height="17" rx="2" fill="white" />
                          <rect x="13" y="13" width="9" height="9" rx="1" fill="black" />

                          {/* Corner Finder Pattern Top-Right */}
                          <rect x="70" y="5" width="25" height="25" rx="3" fill="black" />
                          <rect x="74" y="9" width="17" height="17" rx="2" fill="white" />
                          <rect x="78" y="13" width="9" height="9" rx="1" fill="black" />

                          {/* Corner Finder Pattern Bottom-Left */}
                          <rect x="5" y="70" width="25" height="25" rx="3" fill="black" />
                          <rect x="9" y="74" width="17" height="17" rx="2" fill="white" />
                          <rect x="13" y="78" width="9" height="9" rx="1" fill="black" />

                          {/* Data Pixels Matrix */}
                          <rect x="35" y="6" width="6" height="6" fill="black" />
                          <rect x="45" y="6" width="6" height="6" fill="black" />
                          <rect x="55" y="10" width="6" height="6" fill="black" />
                          <rect x="35" y="18" width="6" height="6" fill="black" />
                          <rect x="50" y="22" width="6" height="6" fill="black" />

                          <rect x="6" y="35" width="6" height="6" fill="black" />
                          <rect x="18" y="35" width="6" height="6" fill="black" />
                          <rect x="26" y="42" width="6" height="6" fill="black" />
                          <rect x="6" y="50" width="6" height="6" fill="black" />

                          <rect x="70" y="35" width="6" height="6" fill="black" />
                          <rect x="82" y="35" width="6" height="6" fill="black" />
                          <rect x="76" y="48" width="6" height="6" fill="black" />
                          <rect x="88" y="52" width="6" height="6" fill="black" />

                          <rect x="35" y="70" width="6" height="6" fill="black" />
                          <rect x="48" y="70" width="6" height="6" fill="black" />
                          <rect x="58" y="78" width="6" height="6" fill="black" />
                          <rect x="35" y="84" width="6" height="6" fill="black" />
                          <rect x="48" y="88" width="6" height="6" fill="black" />
                          <rect x="70" y="84" width="6" height="6" fill="black" />
                          <rect x="82" y="88" width="6" height="6" fill="black" />

                          {/* Center SevaCare Logo Overlay */}
                          <rect x="38" y="38" width="24" height="24" rx="4" fill="white" />
                          <rect x="40" y="40" width="20" height="20" rx="3" fill="#dc2626" />
                        </svg>

                        {/* Center SevaCare Icon overlay text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="text-[10px] font-black text-white tracking-widest uppercase">SEVA</span>
                        </div>
                      </div>

                      {/* UPI Merchant info */}
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                          <span>SevaCare Elder Foundation</span>
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <code className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-amber-300 border border-slate-800">
                            sevacare.foundation@sbi
                          </code>
                          <button
                            type="button"
                            onClick={handleCopyUpi}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{copiedUpi ? (isHi ? 'कॉपी हुआ' : 'Copied!') : (isHi ? 'कॉपी' : 'Copy')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Supported UPI Apps icons */}
                      <div className="pt-1 flex items-center justify-center gap-3 text-[11px] text-slate-400">
                        <span className="bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 font-bold text-slate-200">
                          🔵 Google Pay
                        </span>
                        <span className="bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 font-bold text-indigo-300">
                          🟣 PhonePe
                        </span>
                        <span className="bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 font-bold text-sky-300">
                          🔷 Paytm
                        </span>
                        <span className="bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 font-bold text-amber-300">
                          🇮🇳 BHIM UPI
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Live Camera Scanner Simulation View */
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        {isHi
                          ? 'अपने फोन कैमरा या स्कैनर को QR कोड के सामने लाएँ (Position QR Code inside camera frame):'
                          : 'Position QR code inside the camera viewfinder frame below:'}
                      </p>

                      <div className="relative w-full max-w-sm h-56 mx-auto bg-slate-900 rounded-2xl border-2 border-dashed border-red-500 overflow-hidden flex items-center justify-center">
                        {/* Animated Scanning Laser Line */}
                        <motion.div
                          animate={{ y: [-90, 90, -90] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]"
                        />

                        {/* Viewfinder Target Corners */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-400" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-red-400" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-red-400" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-red-400" />

                        <div className="text-center p-4 space-y-2 z-10">
                          <Camera className="w-10 h-10 text-red-400 mx-auto animate-pulse" />
                          <p className="text-xs font-bold text-white">
                            {isHi ? 'कैमरा स्कैनर सक्रिय है' : 'Camera QR Viewfinder Active'}
                          </p>
                          <p className="text-[10px] text-amber-300">
                            {isHi ? 'ऑटो-फ़ोकस एवं यूपीआई गेटवे रेडी...' : 'Auto-focusing & Ready for UPI auto-detect...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Execute Simulated Scan & Pay Action */}
                  <div className="pt-2 border-t border-slate-800 space-y-2">
                    <button
                      type="button"
                      disabled={isProcessingPay}
                      onClick={() => handleExecutePayment('UPI QR Scanner')}
                      className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-white rounded-xl shadow-xl transition-all text-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessingPay ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{payProgressText}</span>
                        </div>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span>
                            {isHi
                              ? `क्यूआर स्कैन करें एवं ${totalAmountDisplay} पे करें`
                              : `Scan QR & Pay ${totalAmountDisplay} Now`}
                          </span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      {isHi ? '100% सुरक्षित 256-Bit UPI एन्क्रिप्टेड भुगतान' : '100% Secure 256-Bit Encrypted UPI Payment'}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB CONTENT 2: CREDIT / DEBIT CARD */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    {isHi ? 'डेबिट / क्रेडिट कार्ड या नेटबैंकिंग' : 'Debit / Credit Card & Netbanking'}
                  </h4>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">{isHi ? 'कार्ड नंबर' : 'Card Number'}</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8892"
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{isHi ? 'समाप्ति तिथि' : 'Expiry'}</label>
                        <input
                          type="text"
                          placeholder="08/29"
                          className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isProcessingPay}
                    onClick={() => handleExecutePayment('Debit/Credit Card')}
                    className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow transition-all text-xs cursor-pointer flex items-center justify-center gap-2 mt-3"
                  >
                    {isProcessingPay ? (
                      <span>{payProgressText}</span>
                    ) : (
                      <span>
                        {isHi
                          ? `कार्ड से भुगतान करें (${totalAmountDisplay})`
                          : `Pay ${totalAmountDisplay} via Card`}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* TAB CONTENT 3: POSTPAID / CASH AFTER SEVA */}
              {paymentMethod === 'postpaid' && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-200 leading-relaxed">
                    ℹ️ {isHi 
                      ? 'सेवा शुरू होने के बाद आप सेवादार को सीधे नकद (Cash) या यूपीआई द्वारा भी भुगतान कर सकते हैं।' 
                      : 'You can pay the caregiver directly via Cash or UPI after the service begins.'}
                  </div>

                  <button
                    type="button"
                    disabled={isProcessingPay}
                    onClick={() => handleExecutePayment('Pay After Seva (Cash/UPI)')}
                    className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 font-bold text-slate-950 rounded-xl shadow transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isProcessingPay ? (
                      <span>{payProgressText}</span>
                    ) : (
                      <span>
                        {isHi
                          ? 'सेवा के बाद भुगतान चुनें (Confirm Pay Later)'
                          : 'Confirm Booking with Pay After Seva'}
                      </span>
                    )}
                  </button>
                </div>
              )}

            </div>
          )}

          {/* STEP 3: THANK YOU & OFFICIAL RECEIPT CONFIRMATION */}
          {step === 'thankyou' && confirmedRequest && (
            <div className="py-2 space-y-5 text-center">
              
              {/* Success badge celebration */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)]"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1">
                  🎉 {isHi ? 'धन्यवाद! (Thank You!)' : 'Thank You!'}
                </h2>
                <p className="text-sm font-bold text-emerald-400 max-w-md mx-auto">
                  {isHi
                    ? 'आपका भुगतान एवं सेवा पैकेज सफलतापूर्वक बुक हो गया है!'
                    : 'Your Payment & Seva Care Package have been successfully confirmed!'}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  {isHi
                    ? `सेवादार ${confirmedRequest.caregiverName} को आपके स्थान (${confirmedRequest.location}) हेतु सूचित कर दिया गया है।`
                    : `Caregiver ${confirmedRequest.caregiverName} has been assigned for your request.`}
                </p>
              </div>

              {/* Official Digital Payment Receipt Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 text-left relative overflow-hidden shadow-2xl">
                
                {/* Decorative receipt header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                      S
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">SevaCare Official Receipt</h4>
                      <p className="text-[10px] text-slate-400">GSTIN: 27AABCS8921K1ZB • Elder Care Foundation</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    {isHi ? 'भुगतान सफल' : 'PAID SUCCESSFUL'}
                  </span>
                </div>

                {/* Receipt Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs border-b border-slate-800 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isHi ? 'ट्रांजैक्शन आईडी:' : 'Transaction ID:'}</span>
                    <span className="font-mono font-bold text-amber-300">{confirmedRequest.transactionId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isHi ? 'भुगतान राशि:' : 'Amount Paid:'}</span>
                    <span className="font-black text-rose-400 text-sm">
                      ₹{confirmedRequest.totalAmountINR?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isHi ? 'भुगतान माध्यम:' : 'Payment Mode:'}</span>
                    <span className="font-medium text-slate-200">{confirmedRequest.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isHi ? 'तिथि व समय:' : 'Paid On:'}</span>
                    <span className="font-medium text-slate-200">{confirmedRequest.paidAt}</span>
                  </div>
                </div>

                {/* Booking & Caregiver details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isHi ? 'सेवा पैकेज:' : 'Seva Package:'}</span>
                    <span className="font-bold text-white text-right">{confirmedRequest.serviceType}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">{isHi ? 'आवंटित सेवादार:' : 'Assigned Caregiver:'}</span>
                    <span className="font-bold text-amber-300 text-right">{confirmedRequest.caregiverName}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">{isHi ? 'प्रारंभ तिथि:' : 'Start Date:'}</span>
                    <span className="font-medium text-slate-200">{confirmedRequest.date} ({confirmedRequest.time})</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">{isHi ? 'स्थान व धर्म सेवा:' : 'Location & Faith:'}</span>
                    <span className="font-medium text-slate-200">{confirmedRequest.location} • {confirmedRequest.religionPref}</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => showToast(isHi ? 'रसीद (PDF) आपकी डिवाइस में डाउनलोड हो गई है!' : 'Receipt PDF downloaded to device!')}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? 'रसीद डाउनलोड करें (PDF)' : 'Download Receipt (PDF)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => showToast(isHi ? 'रसीद आपके व्हाट्सएप नंबर पर भेज दी गई है!' : 'Receipt sent to WhatsApp!')}
                  className="flex-1 py-2.5 bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-emerald-800 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>{isHi ? 'व्हाट्सएप पर शेयर करें' : 'Share on WhatsApp'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleFinishAndClose}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 font-bold text-white rounded-xl shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>{isHi ? 'माई डैशबोर्ड पर जाएँ (Complete)' : 'Go to My Dashboard'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
