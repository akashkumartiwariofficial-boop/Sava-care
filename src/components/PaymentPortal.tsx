import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, QrCode, Camera, ShieldCheck, CheckCircle2, Copy, Download, Share2, 
  CreditCard, ArrowLeft, Lock, Smartphone, Building2, Zap, FileText, 
  Tag, Sparkles, AlertCircle, RefreshCw, ChevronRight, Check
} from 'lucide-react';
import { Caregiver, SevaRequest, UserProfile, CarePackage } from '../types';
import { SEVA_PACKAGES_TEMPLATES } from '../data/mockData';
import logoImg from '../assets/images/company_logo_1786133447834.jpg';

interface PaymentPortalProps {
  user: UserProfile;
  myRequests: SevaRequest[];
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (request: SevaRequest) => void;
  initialSelectedPackage?: CarePackage | null;
  initialSelectedCaregiver?: Caregiver | null;
}

type PortalTab = 'checkout' | 'invoices' | 'scanner_only';
type PaymentMethod = 'upi_qr' | 'upi_id' | 'card' | 'netbanking' | 'postpaid';

export const PaymentPortal: React.FC<PaymentPortalProps> = ({
  user,
  myRequests,
  isOpen,
  onClose,
  onPaymentSuccess,
  initialSelectedPackage,
  initialSelectedCaregiver
}) => {
  const isHi = user.language === 'hi';

  const availablePackages = initialSelectedCaregiver?.packages && initialSelectedCaregiver.packages.length > 0
    ? initialSelectedCaregiver.packages
    : SEVA_PACKAGES_TEMPLATES;

  // Tabs inside Payment Portal
  const [activeTab, setActiveTab] = useState<PortalTab>('checkout');

  // Selected package or custom booking
  const [selectedPackage, setSelectedPackage] = useState<CarePackage>(
    initialSelectedPackage || availablePackages[1] || availablePackages[0]
  );
  const [date, setDate] = useState('2026-08-08');
  const [time, setTime] = useState('10:00 AM');
  const [instructions, setInstructions] = useState('');

  // Payment method & QR states
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi_qr');
  const [qrViewMode, setQrViewMode] = useState<'code' | 'scanner'>('code');
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [payProgressText, setPayProgressText] = useState('');
  const [customUpiId, setCustomUpiId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Completed Payment / Receipt state
  const [completedTxn, setCompletedTxn] = useState<SevaRequest | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalAmountINR = selectedPackage.priceINR;
  const totalAmountDisplay = selectedPackage.priceDisplay;

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

  const handleExecutePayment = (methodName: string) => {
    setIsProcessingPay(true);
    setPayProgressText(isHi ? 'यूपीआई गेटवे से जुड़ रहा है...' : 'Connecting to UPI Gateway...');

    setTimeout(() => {
      setPayProgressText(isHi ? 'बैंक से भुगतान सत्यापित हो रहा है...' : 'Verifying Bank Transaction...');
    }, 1200);

    setTimeout(() => {
      setPayProgressText(isHi ? 'भुगतान सफल! डिजिटल रसीद तैयार हो रही है...' : 'Payment Successful! Generating Tax Receipt...');
    }, 2400);

    setTimeout(() => {
      const generatedTxnId = `TXN-${Math.floor(100000000 + Math.random() * 900000000)}`;
      const nowStr = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      const paidReq: SevaRequest = {
        id: `SR-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceType: `${isHi ? selectedPackage.nameHi : selectedPackage.nameEn} (${selectedPackage.priceDisplay})`,
        selectedPackage: selectedPackage,
        totalAmountINR: totalAmountINR,
        date,
        time,
        status: 'Confirmed',
        caregiverName: initialSelectedCaregiver ? initialSelectedCaregiver.name : 'Matched Local Seva Caregiver',
        notes: instructions || (isHi ? 'कोई विशेष निर्देश नहीं' : 'No extra notes'),
        location: `${user.location.city}, ${user.location.state}`,
        religionPref: `${user.religion} (${user.dietaryPreference})`,
        paymentStatus: 'Paid',
        paymentMethod: methodName,
        transactionId: generatedTxnId,
        paidAt: nowStr
      };

      setCompletedTxn(paidReq);
      setIsProcessingPay(false);
      onPaymentSuccess(paidReq);
      showToast(isHi ? '🎉 भुगतान सफल! धन्यवाद।' : '🎉 Payment Successful! Thank You.');
    }, 3200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
        
        {/* Floating Toast Notification */}
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="bg-slate-900 border border-red-900/60 rounded-2xl w-full max-w-3xl shadow-2xl p-5 sm:p-7 relative text-white my-6 max-h-[92vh] overflow-y-auto"
        >
          {/* Close Portal Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer z-10"
            title="Close Payment Portal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* PORTAL HEADER & BRANDING */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-5 gap-3 pr-8">
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
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                    {isHi ? 'सेवाकेयर डिजिटल पेमेंट पोर्टल' : 'SevaCare Dedicated Payment Portal'}
                  </h2>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    256-Bit SSL
                  </span>
                </div>
                <p className="text-xs text-rose-300">
                  {isHi ? 'सुरक्षित ऑनलाइन भुगतान, यूपीआई क्यूआर कोड एवं टैक्स रसीद केंद्र' : '100% Secure Online Payment, Instant UPI Scanner & Tax Invoices'}
                </p>
              </div>
            </div>

            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 block">{isHi ? 'सेवाकेयर जीएसटी नंबर:' : 'GSTIN Registered:'}</span>
              <span className="font-mono text-xs font-bold text-amber-300">27AABCS8921K1ZB</span>
            </div>
          </div>

          {/* TOP PORTAL NAV TABS */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6">
            <button
              type="button"
              onClick={() => { setActiveTab('checkout'); setCompletedTxn(null); }}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'checkout'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{isHi ? '1. पैकेज चुनें व पे करें' : '1. Select Package & Pay'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('scanner_only')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'scanner_only'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{isHi ? '2. डायरेक्ट यूपीआई स्कैनर' : '2. Instant UPI QR Scanner'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{isHi ? '3. भुगतान इतिहास व रसीदें' : '3. Payment History & Invoices'}</span>
            </button>
          </div>

          {/* TAB 1: CHECKOUT & PACKAGE PAYMENT */}
          {activeTab === 'checkout' && !completedTxn && (
            <div className="space-y-5">
              
              {/* Package Selection Row */}
              <div>
                <label className="block text-xs font-bold text-amber-300 mb-2 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {isHi 
                    ? 'सेवा पैकेज का चयन करें (₹30,000 से ₹2,00,000 प्रति माह):' 
                    : 'Choose Seva Care Package (₹30,000 to ₹2,00,000 / month):'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availablePackages.map((pkg) => {
                    const isSelected = selectedPackage.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative ${
                          isSelected
                            ? 'bg-slate-800 border-red-500 ring-2 ring-red-500 shadow-xl'
                            : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Most Popular
                          </span>
                        )}
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-xs font-bold text-white pr-2">
                            {isHi ? pkg.nameHi : pkg.nameEn}
                          </h4>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />}
                        </div>
                        <div className="text-base font-black text-rose-400 mb-1">
                          {pkg.priceDisplay}
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {isHi ? pkg.periodHi : pkg.periodEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Package Breakdown & Payment Gateways */}
              <div className="bg-slate-950 p-4 rounded-xl border border-red-900/40 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                      {isHi ? 'भुगतान हेतु चयनित पैकेज' : 'Selected Order Summary'}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {isHi ? selectedPackage.nameHi : selectedPackage.nameEn}
                    </h3>
                    <p className="text-xs text-slate-400">
                      📍 {user.location.city}, {user.location.state} • ☸️ {user.religion} ({user.dietaryPreference})
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-amber-300 font-semibold block">{isHi ? 'कुल देय राशि:' : 'Total Amount:'}</span>
                    <span className="text-xl font-black text-rose-400">{totalAmountDisplay}</span>
                  </div>
                </div>

                {/* Payment Methods Selector inside Portal */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    {isHi ? 'भुगतान का तरीका चुनें (Select Payment Mode):' : 'Select Payment Gateway Mode:'}
                  </label>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi_qr')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'upi_qr'
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <QrCode className="w-5 h-5" />
                      <span>{isHi ? 'UPI स्कैनर' : 'UPI QR Code'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>{isHi ? 'कार्ड / नेटबैंकिंग' : 'Card / Bank'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('postpaid')}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        paymentMethod === 'postpaid'
                          ? 'bg-red-600 text-white border-red-500 shadow-md'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <Zap className="w-5 h-5 text-amber-300" />
                      <span>{isHi ? 'सेवा के बाद पे' : 'Pay After Seva'}</span>
                    </button>
                  </div>

                  {/* MODE 1: UPI QR CODE & SCANNER */}
                  {paymentMethod === 'upi_qr' && (
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-4 text-center">
                      <div className="flex justify-center space-x-2 bg-slate-950 p-1 rounded-lg w-fit mx-auto border border-slate-800">
                        <button
                          type="button"
                          onClick={() => setQrViewMode('code')}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                            qrViewMode === 'code' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>{isHi ? 'QR कोड देखें' : 'Show Payment QR'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setQrViewMode('scanner')}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                            qrViewMode === 'scanner' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>{isHi ? 'लाइव कैमरा स्कैनर' : 'Live Camera Scanner'}</span>
                        </button>
                      </div>

                      {qrViewMode === 'code' ? (
                        <div className="space-y-3">
                          <p className="text-xs text-slate-300">
                            {isHi
                              ? 'Google Pay, PhonePe, Paytm या अन्य UPI ऐप से यह QR कोड स्कैन करके पेमेंट करें:'
                              : 'Scan this QR code using Google Pay, PhonePe, Paytm, or BHIM UPI:'}
                          </p>

                          {/* High-definition SVG UPI QR Code */}
                          <div className="bg-white p-4 rounded-2xl w-52 h-52 mx-auto shadow-2xl relative flex flex-col items-center justify-center border-4 border-slate-800">
                            <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                              <rect x="5" y="5" width="25" height="25" rx="3" fill="black" />
                              <rect x="9" y="9" width="17" height="17" rx="2" fill="white" />
                              <rect x="13" y="13" width="9" height="9" rx="1" fill="black" />

                              <rect x="70" y="5" width="25" height="25" rx="3" fill="black" />
                              <rect x="74" y="9" width="17" height="17" rx="2" fill="white" />
                              <rect x="78" y="13" width="9" height="9" rx="1" fill="black" />

                              <rect x="5" y="70" width="25" height="25" rx="3" fill="black" />
                              <rect x="9" y="74" width="17" height="17" rx="2" fill="white" />
                              <rect x="13" y="78" width="9" height="9" rx="1" fill="black" />

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

                              <rect x="38" y="38" width="24" height="24" rx="4" fill="white" />
                              <rect x="40" y="40" width="20" height="20" rx="3" fill="#dc2626" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                              <span className="text-[9px] font-black text-white uppercase tracking-widest">SEVA</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-2">
                            <code className="text-xs font-mono bg-slate-950 px-2.5 py-1 rounded text-amber-300 border border-slate-800">
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
                      ) : (
                        <div className="space-y-3">
                          <p className="text-xs text-slate-300">
                            {isHi
                              ? 'स्कैनर फ्रेम के अंदर QR कोड रखें (Camera Live Viewfinder):'
                              : 'Align QR code inside the camera viewfinder box below:'}
                          </p>

                          <div className="relative w-full max-w-xs h-52 mx-auto bg-slate-950 rounded-2xl border-2 border-dashed border-red-500 overflow-hidden flex items-center justify-center">
                            <motion.div
                              animate={{ y: [-80, 80, -80] }}
                              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ef4444]"
                            />
                            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-red-400" />
                            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-red-400" />
                            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-red-400" />
                            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-red-400" />

                            <div className="text-center p-3 space-y-1.5 z-10">
                              <Camera className="w-8 h-8 text-red-400 mx-auto animate-pulse" />
                              <p className="text-xs font-bold text-white">
                                {isHi ? 'कैमरा स्कैनर लाइव' : 'Camera Scanner Live'}
                              </p>
                              <p className="text-[10px] text-amber-300">
                                {isHi ? 'यूपीआई भुगतान ऑटो-सत्यापन जारी...' : 'Auto-verifying UPI payment...'}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        disabled={isProcessingPay}
                        onClick={() => handleExecutePayment('UPI QR Code Scanner')}
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
                                ? `क्यूआर स्कैन से ${totalAmountDisplay} पे करें`
                                : `Scan QR & Pay ${totalAmountDisplay} Now`}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* MODE 2: CARDS & BANKING */}
                  {paymentMethod === 'card' && (
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">{isHi ? 'कार्ड नंबर (16 Digits)' : 'Card Number'}</label>
                        <input
                          type="text"
                          placeholder="4532 •••• •••• 8892"
                          className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">{isHi ? 'समाप्ति तिथि' : 'Expiry'}</label>
                          <input
                            type="text"
                            placeholder="08/29"
                            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">CVV</label>
                          <input
                            type="password"
                            placeholder="•••"
                            className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={isProcessingPay}
                        onClick={() => handleExecutePayment('Debit/Credit Card')}
                        className="w-full py-3 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow transition-all text-xs cursor-pointer flex items-center justify-center gap-2 mt-2"
                      >
                        {isProcessingPay ? (
                          <span>{payProgressText}</span>
                        ) : (
                          <span>
                            {isHi
                              ? `कार्ड द्वारा ${totalAmountDisplay} पे करें`
                              : `Pay ${totalAmountDisplay} via Card`}
                          </span>
                        )}
                      </button>
                    </div>
                  )}

                  {/* MODE 3: POSTPAID */}
                  {paymentMethod === 'postpaid' && (
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-lg text-xs text-amber-200 leading-relaxed">
                        ℹ️ {isHi 
                          ? 'सेवा शुरू होने पर आप सीधे सेवादार को कैश या यूपीआई द्वारा भी भुगतान कर सकते हैं।' 
                          : 'You can pay the caregiver directly via Cash or UPI after the service begins.'}
                      </div>

                      <button
                        type="button"
                        disabled={isProcessingPay}
                        onClick={() => handleExecutePayment('Pay After Seva (Cash/UPI)')}
                        className="w-full py-3 bg-amber-600 hover:bg-amber-500 font-bold text-slate-950 rounded-xl shadow transition-all text-xs cursor-pointer flex items-center justify-center gap-2"
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
              </div>

            </div>
          )}

          {/* TAB 2: INSTANT STANDALONE SCANNER VIEW */}
          {activeTab === 'scanner_only' && !completedTxn && (
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-950/80 border border-red-800 text-rose-300 text-xs px-3 py-1 rounded-full">
                <QrCode className="w-4 h-4 text-red-400" />
                <span>{isHi ? 'त्वरित यूपीआई स्कैनर पोर्टल' : 'Instant UPI Payment Scanner'}</span>
              </div>

              <div className="bg-white p-5 rounded-2xl w-60 h-60 mx-auto shadow-2xl relative flex flex-col items-center justify-center border-4 border-slate-800">
                <svg className="w-full h-full text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="5" y="5" width="25" height="25" rx="3" fill="black" />
                  <rect x="9" y="9" width="17" height="17" rx="2" fill="white" />
                  <rect x="13" y="13" width="9" height="9" rx="1" fill="black" />

                  <rect x="70" y="5" width="25" height="25" rx="3" fill="black" />
                  <rect x="74" y="9" width="17" height="17" rx="2" fill="white" />
                  <rect x="78" y="13" width="9" height="9" rx="1" fill="black" />

                  <rect x="5" y="70" width="25" height="25" rx="3" fill="black" />
                  <rect x="9" y="74" width="17" height="17" rx="2" fill="white" />
                  <rect x="13" y="78" width="9" height="9" rx="1" fill="black" />

                  <rect x="35" y="6" width="6" height="6" fill="black" />
                  <rect x="45" y="6" width="6" height="6" fill="black" />
                  <rect x="55" y="10" width="6" height="6" fill="black" />

                  <rect x="38" y="38" width="24" height="24" rx="4" fill="white" />
                  <rect x="40" y="40" width="20" height="20" rx="3" fill="#dc2626" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">SEVA</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-white">SevaCare Elder Foundation (SBI)</p>
                <code className="text-xs font-mono text-amber-300 bg-slate-900 px-3 py-1 rounded border border-slate-800 inline-block">
                  sevacare.foundation@sbi
                </code>
              </div>

              <button
                type="button"
                disabled={isProcessingPay}
                onClick={() => handleExecutePayment('Instant Standalone Scanner')}
                className="w-full max-w-sm mx-auto py-3.5 bg-emerald-600 hover:bg-emerald-500 font-bold text-white rounded-xl shadow-lg transition-all text-sm cursor-pointer flex items-center justify-center gap-2"
              >
                {isProcessingPay ? (
                  <span>{payProgressText}</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{isHi ? `स्कैन करें एवं ₹${selectedPackage.priceINR.toLocaleString('en-IN')} पे करें` : `Scan & Pay ₹${selectedPackage.priceINR.toLocaleString('en-IN')}`}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* TAB 3: PAYMENT HISTORY & INVOICES */}
          {activeTab === 'invoices' && !completedTxn && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{isHi ? 'आपके हालिया भुगतान एवं टैक्स रसीदें' : 'Recent Payments & Official Invoices'}</span>
              </h3>

              {myRequests.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs bg-slate-950 rounded-xl border border-slate-800">
                  {isHi ? 'कोई पूर्व लेन-देन नहीं मिला।' : 'No payment records found yet.'}
                </div>
              ) : (
                <div className="space-y-3">
                  {myRequests.map((req) => (
                    <div key={req.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-bold text-amber-300">{req.id}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {req.paymentStatus || 'Paid'}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white">{req.serviceType}</h4>
                        <p className="text-[11px] text-slate-400">
                          📅 {req.date} • {req.paymentMethod || 'UPI QR Code'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
                        <span className="text-sm font-black text-rose-400">
                          ₹{(req.totalAmountINR || 50000).toLocaleString('en-IN')}
                        </span>
                        <button
                          type="button"
                          onClick={() => showToast(isHi ? 'रसीद (PDF) डाउनलोड हो रही है...' : 'Downloading PDF Invoice...')}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5 text-amber-400" />
                          <span>{isHi ? 'रसीद PDF' : 'Invoice'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* COMPLETED TRANSACTION THANK YOU & RECEIPT */}
          {completedTxn && (
            <div className="py-2 space-y-5 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)]"
              >
                <CheckCircle2 className="w-12 h-12" />
              </motion.div>

              <div>
                <h2 className="text-2xl font-serif font-bold text-white mb-1">
                  🎉 {isHi ? 'भुगतान सफल! (Thank You!)' : 'Payment Successful! Thank You!'}
                </h2>
                <p className="text-sm font-bold text-emerald-400 max-w-md mx-auto">
                  {isHi
                    ? 'आपका भुगतान एवं सेवा पैकेज सफलतापूर्वक बुक हो गया है।'
                    : 'Your payment and seva package have been successfully processed.'}
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                      S
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">SevaCare Payment Receipt</h4>
                      <p className="text-[10px] text-slate-400">GSTIN: 27AABCS8921K1ZB</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    PAID SUCCESSFUL
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs border-b border-slate-800 pb-3 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isHi ? 'ट्रांजैक्शन आईडी:' : 'Txn ID:'}</span>
                    <span className="font-mono font-bold text-amber-300">{completedTxn.transactionId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isHi ? 'भुगतान राशि:' : 'Amount:'}</span>
                    <span className="font-black text-rose-400 text-sm">
                      ₹{completedTxn.totalAmountINR?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isHi ? 'सेवा पैकेज:' : 'Package:'}</span>
                    <span className="font-bold text-white">{completedTxn.serviceType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{isHi ? 'स्थान:' : 'Location:'}</span>
                    <span className="font-medium text-slate-200">{completedTxn.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => showToast(isHi ? 'रसीद (PDF) डाउनलोड हो गई है!' : 'Receipt PDF Downloaded!')}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{isHi ? 'रसीद (PDF) डाउनलोड करें' : 'Download Receipt (PDF)'}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 font-bold text-white rounded-xl shadow transition-all text-xs cursor-pointer"
                >
                  <span>{isHi ? 'डैशबोर्ड पर जाएँ' : 'Back to Dashboard'}</span>
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
