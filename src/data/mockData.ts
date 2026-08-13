import { Caregiver, CarePackage, ReligionOption, ServiceCategory } from '../types';

export const RELIGION_OPTIONS: { id: ReligionOption; labelEn: string; labelHi: string; icon: string; descEn: string; descHi: string }[] = [
  {
    id: 'Hindu',
    labelEn: 'Hinduism',
    labelHi: 'सनातन (Hinduism)',
    icon: '🕉️',
    descEn: 'Sattvik diet care, temple escort, daily prayer companion',
    descHi: 'सात्विक आहार, मंदिर दर्शन साथी, दैनिक पूजा एवं पाठ सेवा'
  },
  {
    id: 'Muslim',
    labelEn: 'Islam',
    labelHi: 'इस्लाम (Islam)',
    icon: '☪️',
    descEn: 'Halal dietary care, Mosque escort, prayer time support',
    descHi: 'शुद्ध हलाल आहार, मस्जिद दर्शन व नमाज़ समय सूचना सेवा'
  },
  {
    id: 'Sikh',
    labelEn: 'Sikhism',
    labelHi: 'सिख धर्म (Sikhism)',
    icon: 'ੴ',
    descEn: 'Gurudwara seva support, Gurbani reading, pure veg care',
    descHi: 'गुरुद्वारा सेवा सहायता, गुरबाणी पाठ व शुद्ध शाकाहारी देखभाल'
  },
  {
    id: 'Christian',
    labelEn: 'Christianity',
    labelHi: 'ईसाई धर्म (Christianity)',
    icon: '✝️',
    descEn: 'Church mass escort, prayer group support, general care',
    descHi: 'चर्च रविवार मास साथी, प्रार्थना समूह सहायता व सामान्य देखभाल'
  },
  {
    id: 'Jain',
    labelEn: 'Jainism',
    labelHi: 'जैन धर्म (Jainism)',
    icon: '☸️',
    descEn: 'Strict Jain meal prep (no root vegetables), Derasar escort',
    descHi: 'कड़ाई से शुद्ध जैन आहार (कंदमूल रहित), देरासर दर्शन साथी'
  },
  {
    id: 'Buddhist',
    labelEn: 'Buddhism',
    labelHi: 'बौद्ध धर्म (Buddhism)',
    icon: '☸️',
    descEn: 'Mindfulness & meditation companion, vegetarian meal support',
    descHi: 'ध्यान व माइंडफुलनेस साथी, मठ भ्रमण व शाकाहारी भोजन'
  },
  {
    id: 'Secular',
    labelEn: 'Universal / All Faiths',
    labelHi: 'सर्वधर्म सम्भाव (Universal)',
    icon: '🕊️',
    descEn: 'Inclusive care for all traditions, non-religious preferences',
    descHi: 'सभी धर्मों एवं गैर-धार्मिक प्राथमिकताओं हेतु समावेशी देखभाल'
  }
];

export const STATES_AND_CITIES: Record<string, string[]> = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Chhatrapati Sambhajinagar'],
  'Delhi NCR': ['New Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'],
  'Uttar Pradesh': ['Lucknow', 'Varanasi', 'Kanpur', 'Agra', 'Prayagraj', 'Noida'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
  'Punjab': ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Mohali'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
  'West Bengal': ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur'],
  'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Ajmer'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli']
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'elderly_companion',
    titleEn: 'Elderly Companion & Walk Assistant',
    titleHi: 'बुजुर्ग साथी एवं टहलने में सहायता',
    descEn: 'Friendly companions for walking, conversations, reading, and daily routine support.',
    descHi: 'बातचीत, टहलने, पढ़ने एवं दैनिक दिनचर्या सहायता हेतु मित्रवत सेवादार।',
    iconName: 'HeartHandshake',
    badge: 'Popular'
  },
  {
    id: 'spiritual_escort',
    titleEn: 'Temple & Place of Worship Escort',
    titleHi: 'धार्मिक स्थल (मंदिर/मस्जिद/गुरुद्वारा/चर्च) दर्शन साथी',
    descEn: 'Safe transport and walking/wheelchair support for visits to Temples, Mosques, Gurudwaras, or Churches.',
    descHi: 'सुरक्षित वाहन व व्हीलचेयर सहायता से पूजा स्थलों के दर्शन एवं भ्रमण।',
    iconName: 'Building2',
    badge: 'Faith Care'
  },
  {
    id: 'medical_nursing',
    titleEn: 'Home Nursing & Medication Seva',
    titleHi: 'गृह नर्सिंग एवं दवा समय सेवा',
    descEn: 'Trained nurses and home helpers for vitals checking, medication alerts, and recovery care.',
    descHi: 'रक्तचाप/शुगर जांच, दवा समय अलर्ट एवं बीमारी बाद रिकवरी सेवा।',
    iconName: 'Stethoscope'
  },
  {
    id: 'dietary_meal',
    titleEn: 'Sattvik & Custom Meal Preparation',
    titleHi: 'सात्विक, हलाल एवं जैन अनुकूलित आहार सेवा',
    descEn: 'Fresh home-cooked meals strictly adhering to your dietary requirements (Sattvik, Pure Veg, Jain, Halal).',
    descHi: 'आपकी धार्मिक प्राथमिकताओं के अनुसार ताज़ा घर का सात्विक/हलाल/जैन भोजन।',
    iconName: 'UtensilsCrossed'
  },
  {
    id: 'emergency_sos',
    titleEn: '24/7 Emergency Volunteer Support',
    titleHi: '24/7 आपातकालीन स्वयंसेवक सहायता',
    descEn: 'Instant local volunteer dispatch for urgent hospital assistance, urgent check-ins, or errands.',
    descHi: 'अचानक अस्पताल या एम्बुलेंस सहायता हेतु तुरंत स्थानीय स्वयंसेवक सेवा।',
    iconName: 'ShieldAlert',
    badge: '24x7 Active'
  }
];

export const SEVA_PACKAGES_TEMPLATES: CarePackage[] = [
  {
    id: 'pkg-30k',
    nameEn: 'Basic Monthly Companion Package',
    nameHi: 'बेसिक मासिक सेवा पैकेज (₹30,000)',
    priceINR: 30000,
    priceDisplay: '₹30,000 / माह',
    periodEn: 'Monthly (1 Month Care)',
    periodHi: 'मासिक (1 महीना)',
    featuresEn: [
      'Daily 4 hours companion & walking support',
      'Basic medication alerts & doctor appointment escort',
      'Faith prayer assistance & place of worship visits',
      'Daily health vitals logging (BP, Sugar, Pulse)'
    ],
    featuresHi: [
      'दैनिक 4 घंटे साथी एवं टहलने में सहायता',
      'दवा समय अलर्ट और डॉक्टर अपॉइंटमेंट साथी',
      'धर्म प्रार्थना सहायता एवं पूजा स्थल भ्रमण',
      'दैनिक स्वास्थ्य निगरानी (बीपी, शुगर)'
    ]
  },
  {
    id: 'pkg-50k',
    nameEn: 'Standard Dedicated Seva Package',
    nameHi: 'स्टैंडर्ड समर्पित सेवा पैकेज (₹50,000)',
    priceINR: 50000,
    priceDisplay: '₹50,000 / माह',
    periodEn: 'Monthly (Dedicated 8 hrs/day)',
    periodHi: 'मासिक (समर्पित 8 घंटे/दिन)',
    popular: true,
    featuresEn: [
      'Dedicated 8 hours daily care & companionship',
      'Fresh Sattvik / Halal / Jain dietary meal prep',
      'Regular Temple / Mosque / Gurudwara / Church escort',
      'Physiotherapy & light exercise assistance'
    ],
    featuresHi: [
      'दैनिक 8 घंटे समर्पित देखभाल एवं संगति',
      'ताज़ा सात्विक / हलाल / जैन आहार तैयार करना',
      'धार्मिक स्थल (मंदिर/मस्जिद/गुरुद्वारा/चर्च) ले जाना',
      'फिजियोथेरेपी एवं व्यायाम में सहायता'
    ]
  },
  {
    id: 'pkg-1lakh',
    nameEn: 'Premium Full-Day Nursing & Spiritual Package',
    nameHi: 'प्रीमियम फुल-डे नर्सिंग व आध्यात्मिक पैकेज (₹1.00 लाख)',
    priceINR: 100000,
    priceDisplay: '₹1,00,000 / माह (₹1 Lakh)',
    periodEn: 'Monthly (12 Hours Full Care)',
    periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
    featuresEn: [
      '12 Hours dedicated certified nurse & companion',
      'Full custom meal preparation & dietary oversight',
      'Out-of-city Pilgrimage & Tirth Yatra assistance',
      '24/7 Priority Emergency Volunteer Dispatch'
    ],
    featuresHi: [
      '12 घंटे समर्पित प्रमाणित नर्स एवं सेवादार',
      'कस्टम भोजन तैयारी व पोषण निगरानी',
      'तीर्थ यात्रा व बाहरी धार्मिक भ्रमण सहायता',
      '24/7 प्राथमिकता आपातकालीन स्वयंसेवक सहायता'
    ]
  },
  {
    id: 'pkg-2lakh',
    nameEn: 'VIP 24x7 Holistic Medical & Faith Seva Package',
    nameHi: 'वीआईपी 24x7 संपूर्ण मेडिकल व धर्म सेवा पैकेज (₹2.00 लाख)',
    priceINR: 200000,
    priceDisplay: '₹2,00,000 / माह (₹2 Lakhs)',
    periodEn: 'Monthly (24x7 Live-in Care)',
    periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन देखभाल)',
    featuresEn: [
      '24x7 Full Live-in Dedicated Seva Caregiver & Nurse',
      'Complete personalized medical care, ICU-stepdown support',
      'Luxury VIP Pilgrimage / Tirth / Umrah travel arrangements',
      'Dedicated chef for strict faith-based dietary guidelines'
    ],
    featuresHi: [
      '24x7 चौबीसों घंटे समर्पित लाइव-इन सेवादार एवं नर्स',
      'संपूर्ण व्यक्तिगत चिकित्सा देखभाल एवं आईसीयू सपोर्ट',
      'वीआईपी तीर्थ यात्रा / उमराह / आध्यात्मिक भ्रमण व्यवस्था',
      'विशेष शेफ द्वारा धर्म-संगत शुद्ध भोजन व्यवस्था'
    ]
  }
];

export const INITIAL_CAREGIVERS: Caregiver[] = [
  // HINDU CONTRACTORS
  {
    id: 'cg-1',
    name: 'Ramesh Sharma',
    roleEn: 'Senior Companion & Temple Escort (Sanatan Seva)',
    roleHi: 'वरिष्ठ साथी एवं मंदिर सेवादार (सनातन सेवा)',
    rating: 4.9,
    reviewsCount: 52,
    city: 'Mumbai',
    state: 'Maharashtra',
    experienceYears: 7,
    primaryReligion: 'Hindu',
    religionsServed: ['Hindu'],
    dietSpecialty: 'Sattvik',
    phone: '+91 98201 45890',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi', 'Marathi'],
    packages: [
      {
        id: 'rs-30k',
        nameEn: 'Sanatan Basic Seva Package',
        nameHi: 'सनातन बेसिक सेवा पैकेज (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Daily Temple walk escort & morning/evening Aarti companion',
          'Pure Sattvik (No Onion-Garlic) meal prep assistance',
          'Daily Ramayana / Bhagavad Gita reading & discourse companion',
          'Vitals & daily medication tracking'
        ],
        featuresHi: [
          'दैनिक मंदिर दर्शन व सुबह-शाम आरती में साथ',
          'शुद्ध सात्विक (बिना प्याज-लहसुन) भोजन सहायता',
          'दैनिक रामायण / भगवद गीता पाठ एवं चर्चा साथी',
          'दवा समय अलर्ट एवं स्वास्थ्य निगरानी'
        ]
      },
      {
        id: 'rs-50k',
        nameEn: 'Sanatan Standard Mandir & Health Package',
        nameHi: 'सनातन स्टैंडर्ड मंदिर व स्वास्थ्य पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours daily dedicated senior companionship & wheelchair support',
          'Fresh Sattvik meals cooked according to Panchang / Vrat rules',
          'Weekly Char Dham / Local Temple pilgrimage trips',
          'Doctor appointment escort & home nursing routine'
        ],
        featuresHi: [
          '8 घंटे समर्पित बुजुर्ग साथी एवं व्हीलचेयर सहायता',
          'पंचांग व व्रत नियमों के अनुसार ताज़ा सात्विक भोजन',
          'साप्ताहिक स्थानीय मंदिर एवं दर्शन भ्रमण',
          'डॉक्टर क्लिनिक साथी एवं प्राथमिक नर्सिंग देखभाल'
        ]
      },
      {
        id: 'rs-1lakh',
        nameEn: 'Sanatan Premium Tirth Yatra & Care Package',
        nameHi: 'सनातन प्रीमियम तीर्थ यात्रा व पूर्ण देखभाल (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Day)',
        periodHi: 'मासिक (12 घंटे पूर्ण दिवस)',
        featuresEn: [
          '12 Hours continuous care including festival Puja preparations',
          'Escort to Kashi, Haridwar, Mathura pilgrimage sites',
          'Dedicated health monitoring & post-surgery rehabilitation support',
          'Custom diet planning according to Ayurvedic principles'
        ],
        featuresHi: [
          '12 घंटे निरंतर देखभाल व त्यौहार पूजा व्यवस्था',
          'काशी, हरिद्वार, मथुरा तीर्थ यात्रा मार्गदर्शक सेवा',
          'समर्पित स्वास्थ्य निगरानी व सर्जरी बाद पुनर्वसन',
          'आयुर्वेदिक सिद्धांतों अनुसार सात्विक भोजन'
        ]
      },
      {
        id: 'rs-2lakh',
        nameEn: 'Sanatan VIP 24x7 Live-in Mahayatra Package',
        nameHi: 'सनातन वीआईपी 24x7 लाइव-इन महायात्रा पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in dedicated certified male caregiver & attendant',
          'All-inclusive VIP pilgrimages to 12 Jyotirlingas or Char Dham',
          'Dedicated Ayurvedic chef & 24/7 medical nurse coordination',
          'Complete family peace of mind with real-time updates'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन समर्पित प्रमाणित सेवादार',
          '12 ज्योतिर्लिंग या चार धाम वीआईपी तीर्थ यात्रा व्यवस्था',
          'विशेष सात्विक शेफ व 24 घंटे मेडिकल नर्स समन्वय',
          'परिवार के लिए रियल-टाइम अपडेट्स एवं संपूर्ण सुरक्षा'
        ]
      }
    ]
  },
  {
    id: 'cg-1b',
    name: 'Pandit Suresh Shastri',
    roleEn: 'Vedic Caregiver & Kashi Ghat Escort',
    roleHi: 'वैदिक सेवादार एवं काशी घाट दर्शन साथी',
    rating: 5.0,
    reviewsCount: 64,
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    experienceYears: 12,
    primaryReligion: 'Hindu',
    religionsServed: ['Hindu'],
    dietSpecialty: 'Sattvik',
    phone: '+91 94152 88901',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
    languages: ['Hindi', 'Sanskrit', 'English'],
    packages: [
      {
        id: 'pss-30k',
        nameEn: 'Vedic Basic Kashi Darshan Package',
        nameHi: 'वैदिक बेसिक काशी दर्शन पैकेज (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: ['Daily Ganga Aarti & Kashi Vishwanath escort', 'Pure Sattvik meal guidance', 'Daily Shloka recitation'],
        featuresHi: ['दैनिक गंगा आरती एवं काशी विश्वनाथ दर्शन साथी', 'शुद्ध सात्विक भोजन मार्गदर्शन', 'दैनिक श्लोक एवं स्तोत्र पाठ']
      },
      {
        id: 'pss-50k',
        nameEn: 'Vedic Standard Tirth & Vitals Package',
        nameHi: 'वैदिक स्टैंडर्ड तीर्थ व स्वास्थ्य पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: ['8 Hours daily boat ride & Mandir escort', 'Ayurvedic health monitoring', 'Panchang fast meal preparation'],
        featuresHi: ['8 घंटे नौका विहार व मंदिर भ्रमण सहायता', 'आयुर्वेदिक स्वास्थ्य निगरानी', 'पंचांग व्रत भोजन निर्माण']
      },
      {
        id: 'pss-1lakh',
        nameEn: 'Vedic Premium Mahatirth Escort',
        nameHi: 'वैदिक प्रीमियम महातीर्थ पैकेज (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: ['12 Hours dedicated attendant', 'Prayagraj Sangam & Ayodhya VIP visits', 'Complete elderly nursing'],
        featuresHi: ['12 घंटे समर्पित सेवादार', 'प्रयागराज संगम एवं अयोध्या राम मंदिर वीआईपी दर्शन', 'संपूर्ण बुजुर्ग नर्सिंग']
      },
      {
        id: 'pss-2lakh',
        nameEn: 'Vedic VIP 24x7 Char Dham Live-in Package',
        nameHi: 'वैदिक वीआईपी 24x7 चार धाम पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: ['24x7 Live-in Shastri & Nurse', 'Char Dham VIP Helicopter travel support', 'Personal Sattvik Chef'],
        featuresHi: ['24x7 चौबीसों घंटे लाइव-इन शास्त्री व नर्स', 'चार धाम वीआईपी हेलीकॉप्टर दर्शन प्रबंध', 'व्यक्तिगत सात्विक रसोइया']
      }
    ]
  },
  {
    id: 'cg-1c',
    name: 'Rajesh Gupta',
    roleEn: 'Senior Citizen Companion & Mandir Helper',
    roleHi: 'वरिष्ठ नागरिक साथी एवं मंदिर सेवादार',
    rating: 4.8,
    reviewsCount: 39,
    city: 'New Delhi',
    state: 'Delhi NCR',
    experienceYears: 6,
    primaryReligion: 'Hindu',
    religionsServed: ['Hindu'],
    dietSpecialty: 'Sattvik',
    phone: '+91 98110 33445',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    languages: ['Hindi', 'English'],
    packages: [
      {
        id: 'rg-30k',
        nameEn: 'Delhi NCR Basic Mandir Seva',
        nameHi: 'दिल्ली एनसीआर बेसिक मंदिर सेवा (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: ['Akshardham & Chattarpur temple visits', 'Daily park walks & BP checks', 'Medication reminders'],
        featuresHi: ['अक्षरधाम व छत्तरपुर मंदिर दर्शन', 'दैनिक पार्क की सैर व बीपी जांच', 'दवा समय याद दिलाना']
      },
      {
        id: 'rg-50k',
        nameEn: 'Delhi NCR Standard Sanatan Care',
        nameHi: 'दिल्ली एनसीआर स्टैंडर्ड सनातन केयर (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours)',
        periodHi: 'मासिक (8 घंटे)',
        popular: true,
        featuresEn: ['8 Hours wheelchair care', 'Fresh Sattvik meals', 'Doctor appointment & lab test escort'],
        featuresHi: ['8 घंटे व्हीलचेयर सपोर्ट', 'ताज़ा सात्विक भोजन', 'डॉक्टर क्लीनिक व लैब टेस्ट साथी']
      },
      {
        id: 'rg-1lakh',
        nameEn: 'Delhi NCR Premium Mathura Vrindavan Package',
        nameHi: 'दिल्ली एनसीआर प्रीमियम मथुरा-वृंदावन पैकेज (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours)',
        periodHi: 'मासिक (12 घंटे)',
        featuresEn: ['12 Hours caregiver', 'Weekly Vrindavan Bankey Bihari trip', 'Full health management'],
        featuresHi: ['12 घंटे सेवादार', 'साप्ताहिक बांके बिहारी वृंदावन यात्रा', 'संपूर्ण स्वास्थ्य प्रबंधन']
      },
      {
        id: 'rg-2lakh',
        nameEn: 'Delhi NCR VIP 24x7 Live-in Sanatan Care',
        nameHi: 'दिल्ली एनसीआर वीआईपी 24x7 लाइव-इन पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे)',
        featuresEn: ['24x7 Live-in paramedic & companion', 'Haridwar Rishikesh pilgrimage', 'Dedicated Ayurvedic chef'],
        featuresHi: ['24x7 चौबीसों घंटे पैरामेडिक व साथी', 'हरिद्वार-ऋषिकेश तीर्थ यात्रा', 'विशेष आयुर्वेदिक रसोइया']
      }
    ]
  },
  {
    id: 'cg-1d',
    name: 'Anil Kulkarni',
    roleEn: 'Retired Army Paramedic & Sanatan Companion',
    roleHi: 'सेवानिवृत्त सैन्य पैरामेडिक व सनातन सेवादार',
    rating: 4.9,
    reviewsCount: 45,
    city: 'Pune',
    state: 'Maharashtra',
    experienceYears: 10,
    primaryReligion: 'Hindu',
    religionsServed: ['Hindu'],
    dietSpecialty: 'Sattvik',
    phone: '+91 98221 55667',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    languages: ['Marathi', 'Hindi', 'English'],
    packages: [
      {
        id: 'ak-30k',
        nameEn: 'Pune Basic Dagdusheth Mandir Care',
        nameHi: 'पुणे बेसिक दगडूशेठ मंदिर सेवा (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours)',
        periodHi: 'मासिक (4 घंटे)',
        featuresEn: ['Dagdusheth Ganpati Mandir visit', 'BP/Sugar vitals log', 'Walking support'],
        featuresHi: ['दगडूशेठ गणपति मंदिर दर्शन', 'बीपी/शुगर रिकॉर्ड', 'सैर सहायता']
      },
      {
        id: 'ak-50k',
        nameEn: 'Pune Standard Ashtavinayak Yatra Care',
        nameHi: 'पुणे स्टैंडर्ड अष्टविनायक यात्रा केयर (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours)',
        periodHi: 'मासिक (8 घंटे)',
        popular: true,
        featuresEn: ['8 Hours senior paramedic helper', 'Sattvik diet prep', 'Ashtavinayak darshan trip'],
        featuresHi: ['8 घंटे पैरामेडिक सेवादार', 'सात्विक भोजन', 'अष्टविनायक दर्शन यात्रा']
      },
      {
        id: 'ak-1lakh',
        nameEn: 'Pune Premium Jyotirlinga Yatra & Care',
        nameHi: 'पुणे प्रीमियम ज्योतिर्लिंग यात्रा (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours)',
        periodHi: 'मासिक (12 घंटे)',
        featuresEn: ['12 Hours nurse', 'Bhimashankar & Trimbakeshwar Yatra', 'Complete vitals care'],
        featuresHi: ['12 घंटे नर्स', 'भीमाशंकर व त्र्यंबकेश्वर ज्योतिर्लिंग दर्शन', 'संपूर्ण स्वास्थ्य देखरेख']
      },
      {
        id: 'ak-2lakh',
        nameEn: 'Pune VIP 24x7 Live-in Sanatan Care',
        nameHi: 'पुणे वीआईपी 24x7 लाइव-इन सनातन केयर (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे)',
        featuresEn: ['24x7 Live-in companion nurse', '12 Jyotirlinga VIP Yatra', 'Private chef & ambulance backup'],
        featuresHi: ['24x7 चौबीसों घंटे लाइव-इन नर्स व साथी', '12 ज्योतिर्लिंग वीआईपी यात्रा', 'व्यक्तिगत शेफ व एम्बुलेंस बैकअप']
      }
    ]
  },

  // MUSLIM CONTRACTORS
  {
    id: 'cg-2',
    name: 'Amina Khatun',
    roleEn: 'Certified Home Nurse & Elderly Helper (Islamic Care)',
    roleHi: 'प्रमाणित होम नर्स व बुजुर्ग सेवादार (इस्लामिक केयर)',
    rating: 4.8,
    reviewsCount: 42,
    city: 'Mumbai',
    state: 'Maharashtra',
    experienceYears: 6,
    primaryReligion: 'Muslim',
    religionsServed: ['Muslim'],
    dietSpecialty: 'Halal',
    phone: '+91 98334 11200',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi', 'Urdu'],
    packages: [
      {
        id: 'ak-30k',
        nameEn: 'Islamic Basic Home Care Package',
        nameHi: 'इस्लामिक बेसिक होम केयर पैकेज (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Daily 4 hours care, Wudu assistance & Prayer time reminder',
          'Strict Halal home-cooked meal preparation support',
          'Basic medication tracking & daily vitals logging',
          'Quran recitation companion & gentle walks'
        ],
        featuresHi: [
          'दैनिक 4 घंटे देखभाल, वज़ू में मदद व नमाज़ समय सूचना',
          'शुद्ध हलाल घर का भोजन बनाने में सहायता',
          'दवा समय अलर्ट एवं दैनिक स्वास्थ्य रिकॉर्ड',
          'कुरान तिलावत साथी एवं शाम की सैर'
        ]
      },
      {
        id: 'ak-50k',
        nameEn: 'Islamic Standard Khidmat Package',
        nameHi: 'इस्लामिक स्टैंडर्ड खिदमत पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours dedicated female nurse for elderly mother / grandmother',
          'Fresh Halal meal prep & strict hygiene standards',
          'Mosque & local Islamic event transportation escort',
          'Physiotherapy exercises & prescription management'
        ],
        featuresHi: [
          '8 घंटे समर्पित महिला नर्स बुजुर्गों की सेवा के लिए',
          'ताज़ा हलाल भोजन एवं स्वच्छता मानकों का ध्यान',
          'मस्जिद व धार्मिक मजलिस भ्रमण साथी',
          'फिजियोथेरेपी व्यायाम एवं डॉक्टर पर्चा प्रबंधन'
        ]
      },
      {
        id: 'ak-1lakh',
        nameEn: 'Islamic Premium Medical & Ziyarat Package',
        nameHi: 'इस्लामिक प्रीमियम मेडिकल व ज़ियारत पैकेज (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: [
          '12 Hours certified medical nurse care & mobility support',
          'Complete Ramadan / Fasting care & Suhoor/Iftar prep',
          'Escort for Ziyarat visits across Ajmer, Delhi, Mumbai Dargahs',
          '24/7 Ambulance & emergency volunteer priority'
        ],
        featuresHi: [
          '12 घंटे प्रमाणित मेडिकल नर्स देखभाल व मूवमेंट सपोर्ट',
          'रमजान रोजा विशेष देखभाल, सहरी व इफ्तार व्यवस्था',
          'अजमेर शरीफ, दिल्ली व मुंबई दरगाह ज़ियारत साथी',
          '24/7 एम्बुलेंस व आपातकालीन स्वयंसेवक प्राथमिकता'
        ]
      },
      {
        id: 'ak-2lakh',
        nameEn: 'Islamic VIP 24x7 Umrah & Full Medical Care',
        nameHi: 'इस्लामिक वीआईपी 24x7 उमराह व मेडिकल पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in certified nurse & companion care',
          'Complete medical accompaniment for Umrah / Haj pilgrimage',
          'Personalized diet & dedicated medical equipment monitoring',
          'Round-the-clock peace of mind for family living abroad'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन प्रमाणित नर्स एवं सहायिका',
          'उमराह / हज यात्रा हेतु संपूर्ण मेडिकल साथी सेवा',
          'व्यक्तिगत आहार व मेडिकल उपकरण निगरानी',
          'विदेश में रहने वाले परिजनों के लिए 24 घंटे रियल-टाइम सुरक्षा'
        ]
      }
    ]
  },
  {
    id: 'cg-2b',
    name: 'Farooq Sheikh',
    roleEn: 'Senior Khidmat Companion & Mosque Escort',
    roleHi: 'वरिष्ठ खिदमत साथी एवं मस्जिद सेवादार',
    rating: 4.9,
    reviewsCount: 51,
    city: 'New Delhi',
    state: 'Delhi NCR',
    experienceYears: 8,
    primaryReligion: 'Muslim',
    religionsServed: ['Muslim'],
    dietSpecialty: 'Halal',
    phone: '+91 98102 77889',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    languages: ['Urdu', 'Hindi', 'English'],
    packages: [
      {
        id: 'fs-30k',
        nameEn: 'Delhi Islamic Basic Khidmat Care',
        nameHi: 'दिल्ली इस्लामिक बेसिक खिदमत (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours)',
        periodHi: 'मासिक (4 घंटे)',
        featuresEn: ['Jama Masjid & local mosque Namaz escort', 'Halal meal prep assistance', 'Medication reminders'],
        featuresHi: ['जामा मस्जिद व स्थानीय नमाज़ साथी', 'हलाल भोजन में सहयोग', 'दवा समय याद दिलाना']
      },
      {
        id: 'fs-50k',
        nameEn: 'Delhi Islamic Standard Care Package',
        nameHi: 'दिल्ली इस्लामिक स्टैंडर्ड केयर (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours)',
        periodHi: 'मासिक (8 घंटे)',
        popular: true,
        featuresEn: ['8 Hours dedicated attendant', 'Strict Halal diet', 'Ajmer Nizamuddin Ziyarat assistance'],
        featuresHi: ['8 घंटे समर्पित खिदमतगार', 'शुद्ध हलाल आहार', 'अजमेर-निज़ामुद्दीन ज़ियारत यात्रा']
      },
      {
        id: 'fs-1lakh',
        nameEn: 'Delhi Islamic Premium Ziyarat Care',
        nameHi: 'दिल्ली इस्लामिक प्रीमियम ज़ियारत पैकेज (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours)',
        periodHi: 'मासिक (12 घंटे)',
        featuresEn: ['12 Hours paramedic attendant', 'Ajmer Sharif full pilgrimage escort', '24/7 vitals check'],
        featuresHi: ['12 घंटे पैरामेडिक खिदमतगार', 'अजमेर शरीफ संपूर्ण ज़ियारत साथी', '24/7 स्वास्थ्य देखरेख']
      },
      {
        id: 'fs-2lakh',
        nameEn: 'Delhi Islamic VIP 24x7 Umrah Live-in',
        nameHi: 'दिल्ली इस्लामिक वीआईपी 24x7 उमराह पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे)',
        featuresEn: ['24x7 Live-in nurse & khidmatgar', 'Umrah VIP medical companion', 'Specialized Halal chef'],
        featuresHi: ['24x7 चौबीसों घंटे लाइव-इन नर्स व खिदमतगार', 'उमराह वीआईपी मेडिकल साथी', 'विशेष हलाल शेफ']
      }
    ]
  },
  {
    id: 'cg-2c',
    name: 'Tariq Hussain',
    roleEn: 'Elderly Home Care & Dargah Escort',
    roleHi: 'बुजुर्ग होम केयर एवं दरगाह ज़ियारत साथी',
    rating: 4.8,
    reviewsCount: 38,
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    experienceYears: 7,
    primaryReligion: 'Muslim',
    religionsServed: ['Muslim'],
    dietSpecialty: 'Halal',
    phone: '+91 94150 22334',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    languages: ['Urdu', 'Hindi'],
    packages: [
      {
        id: 'th-30k',
        nameEn: 'Lucknow Basic Islamic Care',
        nameHi: 'लखनऊ बेसिक इस्लामिक केयर (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours)',
        periodHi: 'मासिक (4 घंटे)',
        featuresEn: ['Deva Sharif & Bara Imambara escort', 'Halal food prep', 'Daily vitals check'],
        featuresHi: ['देवा शरीफ व इमामबाड़ा दर्शन साथी', 'हलाल भोजन सहायता', 'दैनिक बीपी/शुगर जांच']
      },
      {
        id: 'th-50k',
        nameEn: 'Lucknow Standard Khidmat Package',
        nameHi: 'लखनऊ स्टैंडर्ड खिदमत पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours)',
        periodHi: 'मासिक (8 घंटे)',
        popular: true,
        featuresEn: ['8 Hours dedicated caregiver', 'Ramadan special Suhoor care', 'Doctor appointment escort'],
        featuresHi: ['8 घंटे समर्पित खिदमतगार', 'रमजान विशेष सहरी-इफ्तार ध्यान', 'डॉक्टर क्लीनिक साथी']
      },
      {
        id: 'th-1lakh',
        nameEn: 'Lucknow Premium Ziyarat & Nursing',
        nameHi: 'लखनऊ प्रीमियम ज़ियारत व नर्सिंग (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours)',
        periodHi: 'मासिक (12 घंटे)',
        featuresEn: ['12 Hours male nurse', 'Ajmer Sharif pilgrimage escort', 'Complete post-op care'],
        featuresHi: ['12 घंटे पुरुष नर्स', 'अजमेर शरीफ ज़ियारत यात्रा', 'ऑपरेशन बाद संपूर्ण देखभाल']
      },
      {
        id: 'th-2lakh',
        nameEn: 'Lucknow VIP 24x7 Live-in Islamic Care',
        nameHi: 'लखनऊ वीआईपी 24x7 लाइव-इन केयर (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे)',
        featuresEn: ['24x7 Live-in paramedic & companion', 'Hajj / Umrah medical escort', 'Dedicated Halal chef'],
        featuresHi: ['24x7 चौबीसों घंटे लाइव-इन पैरामेडिक', 'हज / उमराह मेडिकल साथी', 'विशेष हलाल शेफ व्यवस्था']
      }
    ]
  },

  // SIKH CONTRACTORS
  {
    id: 'cg-3',
    name: 'Gurpreet Singh',
    roleEn: 'Seva Volunteer & Hospital Escort (Sikh Seva)',
    roleHi: 'सेवा वालंटियर व अस्पताल गाइड (सिख सेवा)',
    rating: 5.0,
    reviewsCount: 68,
    city: 'New Delhi',
    state: 'Delhi NCR',
    experienceYears: 8,
    primaryReligion: 'Sikh',
    religionsServed: ['Sikh'],
    dietSpecialty: 'Pure Veg',
    phone: '+91 98112 34567',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Punjabi', 'Hindi'],
    packages: [
      {
        id: 'gs-30k',
        nameEn: 'Sikh Basic Gurudwara Seva Package',
        nameHi: 'सिख बेसिक गुरुद्वारा सेवा पैकेज (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Daily Gurudwara Sahib escort for Nitnem & Ardas',
          'Pure Vegetarian Punjabi home cooking support',
          'Daily walk, conversation & medication tracking',
          'Gurbani audio setup & reading companion'
        ],
        featuresHi: [
          'दैनिक गुरुद्वारा साहिब दर्शन व नितनेम/अरदास साथी',
          'शुद्ध शाकाहारी पंजाबी भोजन निर्माण सहायता',
          'दैनिक सैर, बातचीत एवं दवा समय अलर्ट',
          'गुरबाणी पाठ व ऑडियो सुनने में मदद'
        ]
      },
      {
        id: 'gs-50k',
        nameEn: 'Sikh Standard Khalsa Care Package',
        nameHi: 'सिख स्टैंडर्ड खालसा केयर पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours dedicated companion with wheelchair care',
          'Fresh Langar-style healthy pure veg meal prep',
          'Hospital OPD escort & blood test logistics',
          'Weekly Darbar Sahib / Golden Temple travel assistance'
        ],
        featuresHi: [
          '8 घंटे समर्पित सेवादार व्हीलचेयर सपोर्ट के साथ',
          'लंगर शैली शुद्ध शाकाहारी पौष्टिक भोजन तैयारी',
          'अस्पताल ओपीडी साथी व लैब टेस्ट प्रक्रिया सहायता',
          'साप्ताहिक दरबार साहिब / गुरुद्वारा दर्शन यात्रा'
        ]
      },
      {
        id: 'gs-1lakh',
        nameEn: 'Sikh Premium Yatra & Hospital Care',
        nameHi: 'सिख प्रीमियम यात्रा व अस्पताल देखभाल (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: [
          '12 Hours medical nurse & senior companion',
          'Pilgrimage escort to Amritsar, Anandpur Sahib, Hemkund Sahib',
          'Complete post-hospital discharge nursing',
          '24/7 Khalsa emergency volunteer backup'
        ],
        featuresHi: [
          '12 घंटे मेडिकल नर्स एवं वरिष्ठ सेवादार',
          'अमृतसर, आनंदपुर साहिब, हेमकुंड साहिब यात्रा साथी',
          'अस्पताल छुट्टी के बाद संपूर्ण होम रिकवरी सहायता',
          '24/7 आपातकालीन खालसा वालंटियर सपोर्ट'
        ]
      },
      {
        id: 'gs-2lakh',
        nameEn: 'Sikh VIP 24x7 Panj Takht Yatra & Full Care',
        nameHi: 'सिख वीआईपी 24x7 पंज तख्त यात्रा पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in male caregiver & paramedic',
          'All-inclusive VIP tour to Panj Takht (Amritsar, Patna, Nanded, Anandpur, Damdama Sahib)',
          'Personal chef for organic vegetarian meals',
          'Continuous vitals monitoring & ICU-trained support'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन सेवादार व पैरामेडिक',
          'पंज तख्त साहिब दर्शन वीआईपी यात्रा प्रबंध',
          'जैविक शाकाहारी भोजन हेतु व्यक्तिगत रसोइया',
          'निरंतर स्वास्थ्य निगरानी एवं आईसीयू प्रशिक्षित सेवा'
        ]
      }
    ]
  },
  {
    id: 'cg-3b',
    name: 'Harleen Kaur',
    roleEn: 'Certified Nurse & Gurudwara Yatra Escort',
    roleHi: 'प्रमाणित नर्स एवं गुरुद्वारा दर्शन सेवादार',
    rating: 4.9,
    reviewsCount: 46,
    city: 'Amritsar',
    state: 'Punjab',
    experienceYears: 7,
    primaryReligion: 'Sikh',
    religionsServed: ['Sikh'],
    dietSpecialty: 'Pure Veg',
    phone: '+91 98140 66778',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    languages: ['Punjabi', 'Hindi', 'English'],
    packages: [
      {
        id: 'hk-30k',
        nameEn: 'Amritsar Basic Darbar Sahib Care',
        nameHi: 'अमृतसर बेसिक दरबार साहिब सेवा (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours)',
        periodHi: 'मासिक (4 घंटे)',
        featuresEn: ['Daily Golden Temple Gurbani escort', 'Pure Veg Langar meal prep', 'Vitals tracking'],
        featuresHi: ['दरबार साहिब गुरबाणी श्रवण साथी', 'शुद्ध लंगर शैली भोजन सहायता', 'स्वास्थ्य बीपी/शुगर जांच']
      },
      {
        id: 'hk-50k',
        nameEn: 'Amritsar Standard Sikh Seva',
        nameHi: 'अमृतसर स्टैंडर्ड सिख सेवा (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours)',
        periodHi: 'मासिक (8 घंटे)',
        popular: true,
        featuresEn: ['8 Hours dedicated female nurse', 'Tarn Taran & Goindwal Sahib trip', 'Physiotherapy guidance'],
        featuresHi: ['8 घंटे समर्पित महिला नर्स', 'तरनतारन व गोइंदवाल साहिब दर्शन', 'फिजियोथेरेपी देखरेख']
      },
      {
        id: 'hk-1lakh',
        nameEn: 'Amritsar Premium Panj Takht Yatra',
        nameHi: 'अमृतसर प्रीमियम पंज तख्त यात्रा (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours)',
        periodHi: 'मासिक (12 घंटे)',
        featuresEn: ['12 Hours nurse', 'Panj Takht VIP travel arrangements', 'Complete bedridden nursing'],
        featuresHi: ['12 घंटे नर्स', 'पंज तख्त दर्शन वीआईपी यात्रा', 'संपूर्ण मरीज सेवा']
      },
      {
        id: 'hk-2lakh',
        nameEn: 'Amritsar VIP 24x7 Live-in Khalsa Care',
        nameHi: 'अमृतसर वीआईपी 24x7 लाइव-इन केयर (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे)',
        featuresEn: ['24x7 Live-in nurse & attendant', 'International & NRI family reporting', 'Organic vegetarian chef'],
        featuresHi: ['24x7 चौबीसों घंटे नर्स व सेवादार', 'एनआरआई परिजनों के लिए अपडेट्स', 'विशेष शाकाहारी रसोइया']
      }
    ]
  },

  // JAIN CONTRACTORS
  {
    id: 'cg-4',
    name: 'Siddharth Jain',
    roleEn: 'Jain Ahimsa Diet & Derasar Companion',
    roleHi: 'जैन अहिंसा आहार व देरासर सेवादार',
    rating: 4.9,
    reviewsCount: 35,
    city: 'Ahmedabad',
    state: 'Gujarat',
    experienceYears: 5,
    primaryReligion: 'Jain',
    religionsServed: ['Jain'],
    dietSpecialty: 'Jain',
    phone: '+91 97240 88910',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Gujarati', 'Hindi'],
    packages: [
      {
        id: 'sj-30k',
        nameEn: 'Jain Basic Derasar & Chauvihar Package',
        nameHi: 'जैन बेसिक देरासर व चौविहार पैकेज (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Daily Derasar Pooja & Puja samagri escort before sunset',
          'Strict Jain meal preparation (No root veggies / Kandmool)',
          'Chauvihar (before sunset) meal timing management',
          'Pachkhan & Bhaktamar Stotra companion'
        ],
        featuresHi: [
          'सूर्यास्त पूर्व रोजाना देरासर पूजा एवं दर्शन साथी',
          'कंदमूल (प्याज, लहसुन, आलू) रहित शुद्ध जैन भोजन',
          'चौविहार (सूर्यास्त पूर्व भोजन) समय का कड़ाई से पालन',
          'पच्चक्खाण एवं भक्तामर स्तोत्र पाठ साथी'
        ]
      },
      {
        id: 'sj-50k',
        nameEn: 'Jain Standard Ahimsa Seva Package',
        nameHi: 'जैन स्टैंडर्ड अहिंसा सेवा पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours dedicated Jain caregiver for seniors',
          'Fresh Boil-water (Ubalaa Jal) & Jain diet routine',
          'Paryushan & Oli Vrat specialized assistance',
          'Local Tirth Sangh & Upashray escort'
        ],
        featuresHi: [
          '8 घंटे समर्पित जैन बुजुर्ग सेवादार',
          'उबला हुआ जल एवं जैन आहार नियमों का पालन',
          'पर्युषण व ओली व्रत विशेष देखभाल',
          'स्थानीय तीर्थ संघ व उपाश्रय भ्रमण साथी'
        ]
      },
      {
        id: 'sj-1lakh',
        nameEn: 'Jain Premium Tirth Sangh & Nursing Package',
        nameHi: 'जैन प्रीमियम तीर्थ संघ व नर्सिंग पैकेज (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: [
          '12 Hours certified nurse with strict Jain dietary expertise',
          'Palitana, Girnar, Shikharji Tirth Yatra escort',
          'Medical vitals monitoring & mobility care',
          'Sadhu/Sadhvi Vihar assistance'
        ],
        featuresHi: [
          '12 घंटे प्रमाणित नर्स जैन आहार विशेषज्ञता के साथ',
          'पालीताना, गिरनार, सम्मेद शिखरजी तीर्थ यात्रा साथी',
          'स्वास्थ्य निगरानी एवं मूवमेंट सहायता',
          'साधु-साध्वी विहार में सहयोग'
        ]
      },
      {
        id: 'sj-2lakh',
        nameEn: 'Jain VIP 24x7 Shikharji Yatra & Full Seva',
        nameHi: 'जैन वीआईपी 24x7 शिखरजी यात्रा व पूर्ण सेवा (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in Jain attendant & certified nurse',
          'Complete VIP Tirth Yatra to Shikharji / Girnar with dolli arrangement',
          'Dedicated Jain Maharaj approved cook',
          '24/7 Vitals check, physiotherapy & emergency backup'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन जैन सेवादार एवं नर्स',
          'सम्मेद शिखरजी / गिरनारजी वीआईपी तीर्थ यात्रा (डोली प्रबंध)',
          'विशेष जैन महाराज द्वारा अनुमोदित रसोइया',
          '24 घंटे स्वास्थ्य ट्रैकिंग एवं आपातकालीन सेवा'
        ]
      }
    ]
  },
  {
    id: 'cg-4b',
    name: 'Meena Shah',
    roleEn: 'Jain Sattvik Companion & Derasar Helper',
    roleHi: 'जैन सात्विक साथी एवं देरासर सेवादार',
    rating: 4.8,
    reviewsCount: 31,
    city: 'Mumbai',
    state: 'Maharashtra',
    experienceYears: 6,
    primaryReligion: 'Jain',
    religionsServed: ['Jain'],
    dietSpecialty: 'Jain',
    phone: '+91 98202 99887',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    languages: ['Gujarati', 'Hindi', 'English'],
    packages: [
      {
        id: 'ms-30k',
        nameEn: 'Mumbai Jain Basic Care',
        nameHi: 'मुंबई जैन बेसिक केयर (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours)',
        periodHi: 'मासिक (4 घंटे)',
        featuresEn: ['Daily Derasar puja companion', 'Strict Jain meal prep', 'Medication alerts'],
        featuresHi: ['दैनिक देरासर पूजा साथी', 'शुद्ध जैन भोजन निर्माण', 'दवा समय याद दिलाना']
      },
      {
        id: 'ms-50k',
        nameEn: 'Mumbai Jain Standard Seva',
        nameHi: 'मुंबई जैन स्टैंडर्ड सेवा (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours)',
        periodHi: 'मासिक (8 घंटे)',
        popular: true,
        featuresEn: ['8 Hours Jain helper', 'Boiled water & Chauvihar care', 'Upashray & Pathshala escort'],
        featuresHi: ['8 घंटे जैन सेवादार', 'उबला पानी व चौविहार समय ध्यान', 'उपाश्रय व पाठशाला साथी']
      },
      {
        id: 'ms-1lakh',
        nameEn: 'Mumbai Jain Premium Palitana Tirth Yatra',
        nameHi: 'मुंबई जैन प्रीमियम पालीताना यात्रा (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours)',
        periodHi: 'मासिक (12 घंटे)',
        featuresEn: ['12 Hours nurse', 'Palitana & Shankheshwar Tirth escort', 'Full elderly healthcare'],
        featuresHi: ['12 घंटे नर्स', 'पालीताना व शंखेश्वर तीर्थ यात्रा', 'संपूर्ण बुजुर्ग स्वास्थ्य सेवा']
      },
      {
        id: 'ms-2lakh',
        nameEn: 'Mumbai Jain VIP 24x7 Live-in Care',
        nameHi: 'मुंबई जैन वीआईपी 24x7 लाइव-इन सेवा (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे)',
        featuresEn: ['24x7 Live-in Jain nurse', 'Shikharji VIP Yatra with dolli', 'Dedicated Jain Maharaj approved chef'],
        featuresHi: ['24x7 चौबीसों घंटे लाइव-इन नर्स', 'शिखरजी डोली वीआईपी यात्रा', 'विशेष जैन महाराज अनुमोदित रसोइया']
      }
    ]
  },

  // CHRISTIAN CONTRACTORS
  {
    id: 'cg-5',
    name: 'Joseph D\'Souza',
    roleEn: 'Rehabilitation Companion (Christian Care)',
    roleHi: 'पुनर्वास साथी व फिजियो (ईसाई सेवा)',
    rating: 4.8,
    reviewsCount: 31,
    city: 'Pune',
    state: 'Maharashtra',
    experienceYears: 9,
    primaryReligion: 'Christian',
    religionsServed: ['Christian'],
    dietSpecialty: 'No Preference',
    phone: '+91 98220 90112',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Marathi', 'Hindi'],
    packages: [
      {
        id: 'jd-30k',
        nameEn: 'Christian Basic Parish Care Package',
        nameHi: 'क्रिश्चियन बेसिक पैरिश केयर (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Sunday Mass escort & Church prayer group companion',
          'Daily walk, mobility support & gentle exercises',
          'Nutritious meal cooking & medication alerts',
          'Bible reading & fellowship companion'
        ],
        featuresHi: [
          'रविवार मास चर्च भ्रमण एवं प्रार्थना समूह साथी',
          'दैनिक सैर, मूवमेंट सहायता एवं हल्के व्यायाम',
          'पौष्टिक भोजन तैयारी एवं दवा समय याद दिलाना',
          'बाइबल पाठ एवं फेलोशिप संगति'
        ]
      },
      {
        id: 'jd-50k',
        nameEn: 'Christian Standard Health & Prayer Package',
        nameHi: 'क्रिश्चियन स्टैंडर्ड हेल्थ व प्रेयर पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours dedicated caregiver & male nurse',
          'Post-stroke rehabilitation & physiotherapy guidance',
          'Weekly Marian Shrine / Velankanni local visit',
          'Doctor appointment escort & prescription refills'
        ],
        featuresHi: [
          '8 घंटे समर्पित सेवादार व पुरुष नर्स',
          'स्ट्रोक बाद पुनर्वास व फिजियोथेरेपी मार्गदर्शन',
          'साप्ताहिक चर्च व मारियान श्राइन दर्शन',
          'डॉक्टर क्लिनिक विजिट व दवा प्रबंधन'
        ]
      },
      {
        id: 'jd-1lakh',
        nameEn: 'Christian Premium Shrine Yatra & Nursing',
        nameHi: 'क्रिश्चियन प्रीमियम श्राइन यात्रा व नर्सिंग (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: [
          '12 Hours certified senior nurse care',
          'Pilgrimage escort to Velankanni, Old Goa, Mount Mary Bandra',
          'Complete medical bedridden / palliative care',
          '24/7 Emergency volunteer dispatch'
        ],
        featuresHi: [
          '12 घंटे प्रमाणित वरिष्ठ नर्स देखभाल',
          'वेलंकन्नी, ओल्ड गोवा, माउंट मैरी तीर्थ यात्रा साथी',
          'संपूर्ण बिस्तर पर मरीज देखभाल एवं पैलिएटिव केयर',
          '24/7 आपातकालीन वालंटियर सहायता'
        ]
      },
      {
        id: 'jd-2lakh',
        nameEn: 'Christian VIP 24x7 Global Sanctuary Package',
        nameHi: 'क्रिश्चियन वीआईपी 24x7 सैंक्चुअरी पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in male nurse & dedicated companion',
          'Full luxury travel arrangements for Velankanni or Holy Land tours',
          'Dedicated nutritionist chef & intensive vitals logging',
          'Peace of mind for NRI children abroad'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन पुरुष नर्स व सेवादार',
          'वेलंकन्नी या अंतर्राष्ट्रीय तीर्थ यात्रा हेतु वीआईपी व्यवस्था',
          'विशेष पोषण शेफ एवं गहन स्वास्थ्य रिकॉर्ड',
          'एनआरआई बच्चों के लिए 24 घंटे सुरक्षा'
        ]
      }
    ]
  },
  {
    id: 'cg-5b',
    name: 'Maria Fernandes',
    roleEn: 'Senior Caregiver & Church Escort',
    roleHi: 'वरिष्ठ बुजुर्ग सेवादार एवं चर्च मास साथी',
    rating: 4.9,
    reviewsCount: 41,
    city: 'Mumbai',
    state: 'Maharashtra',
    experienceYears: 8,
    primaryReligion: 'Christian',
    religionsServed: ['Christian'],
    dietSpecialty: 'No Preference',
    phone: '+91 98205 11223',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Konkani', 'Hindi'],
    packages: [
      {
        id: 'mf-30k',
        nameEn: 'Mumbai Christian Basic Parish Care',
        nameHi: 'मुंबई क्रिश्चियन बेसिक केयर (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours)',
        periodHi: 'मासिक (4 घंटे)',
        featuresEn: ['Mount Mary Bandra Sunday Mass escort', 'Healthy diet cooking', 'Medication management'],
        featuresHi: ['माउंट मैरी बांद्रा चर्च मास साथी', 'पौष्टिक भोजन पकाना', 'दवा समय याद दिलाना']
      },
      {
        id: 'mf-50k',
        nameEn: 'Mumbai Christian Standard Seva',
        nameHi: 'मुंबई क्रिश्चियन स्टैंडर्ड सेवा (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours)',
        periodHi: 'मासिक (8 घंटे)',
        popular: true,
        featuresEn: ['8 Hours female nurse', 'Post-surgery recovery', 'Infirmary & doctor clinic escort'],
        featuresHi: ['8 घंटे महिला नर्स', 'ऑपरेशन बाद रिकवरी', 'डॉक्टर क्लिनिक साथी']
      },
      {
        id: 'mf-1lakh',
        nameEn: 'Mumbai Christian Premium Velankanni Tour',
        nameHi: 'मुंबई क्रिश्चियन प्रीमियम वेलंकन्नी यात्रा (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours)',
        periodHi: 'मासिक (12 घंटे)',
        featuresEn: ['12 Hours nurse', 'Velankanni pilgrimage escort', 'Complete palliative care'],
        featuresHi: ['12 घंटे नर्स', 'वेलंकन्नी माता मंदिर यात्रा साथी', 'संपूर्ण पैलिएटिव केयर']
      },
      {
        id: 'mf-2lakh',
        nameEn: 'Mumbai Christian VIP 24x7 Live-in',
        nameHi: 'मुंबई क्रिश्चियन वीआईपी 24x7 लाइव-इन (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे)',
        featuresEn: ['24x7 Live-in nurse', 'VIP Holy Land travel arrangements', 'Private chef'],
        featuresHi: ['24x7 चौबीसों घंटे लाइव-इन नर्स', 'अंतर्राष्ट्रीय पवित्र तीर्थ वीआईपी यात्रा', 'व्यक्तिगत रसोइया']
      }
    ]
  },

  // BUDDHIST CONTRACTORS
  {
    id: 'cg-6',
    name: 'Tenzin Norbu',
    roleEn: 'Mindfulness & Meditation Companion (Buddhist Seva)',
    roleHi: 'माइंडफुलनेस व ध्यान साथी (बौद्ध सेवा)',
    rating: 4.9,
    reviewsCount: 28,
    city: 'New Delhi',
    state: 'Delhi NCR',
    experienceYears: 6,
    primaryReligion: 'Buddhist',
    religionsServed: ['Buddhist'],
    dietSpecialty: 'Pure Veg',
    phone: '+91 98160 44210',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Tibetan', 'Hindi'],
    packages: [
      {
        id: 'tn-30k',
        nameEn: 'Buddhist Basic Mindfulness Package',
        nameHi: 'बौद्ध बेसिक माइंडफुलनेस पैकेज (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Daily meditation & breathing exercise companion',
          'Monastery & Stupa walking escort',
          'Healthy organic vegetarian meal prep',
          'Gentle stretching & vitals tracking'
        ],
        featuresHi: [
          'दैनिक ध्यान एवं प्राणायाम अभ्यास साथी',
          'मठ एवं स्तूप दर्शन सैर साथी',
          'स्वास्थ्यवर्धक जैविक शाकाहारी भोजन',
          'हल्का व्यायाम एवं रक्तचाप ट्रैकिंग'
        ]
      },
      {
        id: 'tn-50k',
        nameEn: 'Buddhist Standard Bodhi Care Package',
        nameHi: 'बौद्ध स्टैंडर्ड बोधि केयर पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours dedicated peaceful companion & caregiver',
          'Sattvik vegetarian diet according to Buddhist traditions',
          'Doctor appointment accompaniment',
          'Weekly Monastery prayer session escort'
        ],
        featuresHi: [
          '8 घंटे शांतिपूर्ण समर्पित साथी एवं सेवादार',
          'बौद्ध परंपरा अनुसार शुद्ध शाकाहारी सात्विक आहार',
          'डॉक्टर क्लिनिक साथी एवं दवा अलर्ट',
          'साप्ताहिक मठ प्रार्थना सभा साथी'
        ]
      },
      {
        id: 'tn-1lakh',
        nameEn: 'Buddhist Premium Bodh Gaya Circuit Care',
        nameHi: 'बौद्ध प्रीमियम बोधगया सर्किट पैकेज (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: [
          '12 Hours certified medical caregiver & monk assistant',
          'Escort to Bodh Gaya, Sarnath, Kushinagar, Rajgir circuit',
          'Comprehensive health management & mobility care',
          '24/7 Volunteer emergency assistance'
        ],
        featuresHi: [
          '12 घंटे प्रमाणित मेडिकल सेवादार',
          'बोधगया, सारनाथ, कुशीनगर बौद्ध सर्किट यात्रा साथी',
          'व्यापक स्वास्थ्य प्रबंधन एवं मूवमेंट सहायता',
          '24/7 आपातकालीन सहायता'
        ]
      },
      {
        id: 'tn-2lakh',
        nameEn: 'Buddhist VIP 24x7 Spiritual Retreat Package',
        nameHi: 'बौद्ध वीआईपी 24x7 आध्यात्मिक रिट्रीट (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in companion & certified nurse',
          'Full VIP retreat travel arrangements to Dharamshala, Ladakh or Lumbini',
          'Personal chef for customized sattvik organic diet',
          'Intensive medical check-ups & complete peaceful environment'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन साथी एवं प्रमाणित नर्स',
          'धर्मशाला, लद्दाख या लुंबिनी हेतु वीआईपी रिट्रीट यात्रा',
          'विशेष सात्विक जैविक रसोइया व्यवस्था',
          'गहन स्वास्थ्य निगरानी एवं पूर्ण आध्यात्मिक वातावरण'
        ]
      }
    ]
  },

  // SECULAR CONTRACTORS
  {
    id: 'cg-7',
    name: 'Priyanka Verma',
    roleEn: 'Universal Caregiver & Medical Reminders',
    roleHi: 'यूनिवर्सल सेवादार व दवा अलर्ट विशेषज्ञ',
    rating: 4.9,
    reviewsCount: 55,
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    experienceYears: 6,
    primaryReligion: 'Secular',
    religionsServed: ['Secular'],
    dietSpecialty: 'Pure Veg',
    phone: '+91 94150 77123',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi'],
    packages: SEVA_PACKAGES_TEMPLATES
  },
  {
    id: 'cg-5',
    name: 'Joseph D\'Souza',
    roleEn: 'Rehabilitation Companion (Christian Care)',
    roleHi: 'पुनर्वास साथी व फिजियो (ईसाई सेवा)',
    rating: 4.8,
    reviewsCount: 31,
    city: 'Pune',
    state: 'Maharashtra',
    experienceYears: 9,
    primaryReligion: 'Christian',
    religionsServed: ['Christian', 'Secular', 'All'],
    dietSpecialty: 'No Preference',
    phone: '+91 98220 90112',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Marathi', 'Hindi'],
    packages: [
      {
        id: 'jd-30k',
        nameEn: 'Christian Basic Parish Care Package',
        nameHi: 'क्रिश्चियन बेसिक पैरिश केयर (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Sunday Mass escort & Church prayer group companion',
          'Daily walk, mobility support & gentle exercises',
          'Nutritious meal cooking & medication alerts',
          'Bible reading & fellowship companion'
        ],
        featuresHi: [
          'रविवार मास चर्च भ्रमण एवं प्रार्थना समूह साथी',
          'दैनिक सैर, मूवमेंट सहायता एवं हल्के व्यायाम',
          'पौष्टिक भोजन तैयारी एवं दवा समय याद दिलाना',
          'बाइबल पाठ एवं फेलोशिप संगति'
        ]
      },
      {
        id: 'jd-50k',
        nameEn: 'Christian Standard Health & Prayer Package',
        nameHi: 'क्रिश्चियन स्टैंडर्ड हेल्थ व प्रेयर पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours dedicated caregiver & male nurse',
          'Post-stroke rehabilitation & physiotherapy guidance',
          'Weekly Marian Shrine / Velankanni local visit',
          'Doctor appointment escort & prescription refills'
        ],
        featuresHi: [
          '8 घंटे समर्पित सेवादार व पुरुष नर्स',
          'स्ट्रोक बाद पुनर्वास व फिजियोथेरेपी मार्गदर्शन',
          'साप्ताहिक चर्च व मारियान श्राइन दर्शन',
          'डॉक्टर क्लिनिक विजिट व दवा प्रबंधन'
        ]
      },
      {
        id: 'jd-1lakh',
        nameEn: 'Christian Premium Shrine Yatra & Nursing',
        nameHi: 'क्रिश्चियन प्रीमियम श्राइन यात्रा व नर्सिंग (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: [
          '12 Hours certified senior nurse care',
          'Pilgrimage escort to Velankanni, Old Goa, Mount Mary Bandra',
          'Complete medical bedridden / palliative care',
          '24/7 Emergency volunteer dispatch'
        ],
        featuresHi: [
          '12 घंटे प्रमाणित वरिष्ठ नर्स देखभाल',
          'वेलंकन्नी, ओल्ड गोवा, माउंट मैरी तीर्थ यात्रा साथी',
          'संपूर्ण बिस्तर पर मरीज देखभाल एवं पैलिएटिव केयर',
          '24/7 आपातकालीन वालंटियर सहायता'
        ]
      },
      {
        id: 'jd-2lakh',
        nameEn: 'Christian VIP 24x7 Global Sanctuary Package',
        nameHi: 'क्रिश्चियन वीआईपी 24x7 सैंक्चुअरी पैकेज (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in male nurse & dedicated companion',
          'Full luxury travel arrangements for Velankanni or Holy Land tours',
          'Dedicated nutritionist chef & intensive vitals logging',
          'Peace of mind for NRI children abroad'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन पुरुष नर्स व सेवादार',
          'वेलंकन्नी या अंतर्राष्ट्रीय तीर्थ यात्रा हेतु वीआईपी व्यवस्था',
          'विशेष पोषण शेफ एवं गहन स्वास्थ्य रिकॉर्ड',
          'एनआरआई बच्चों के लिए 24 घंटे सुरक्षा'
        ]
      }
    ]
  },
  {
    id: 'cg-6',
    name: 'Tenzin Norbu',
    roleEn: 'Mindfulness & Meditation Companion (Buddhist Seva)',
    roleHi: 'माइंडफुलनेस व ध्यान साथी (बौद्ध सेवा)',
    rating: 4.9,
    reviewsCount: 28,
    city: 'Delhi',
    state: 'Delhi NCR',
    experienceYears: 6,
    primaryReligion: 'Buddhist',
    religionsServed: ['Buddhist', 'Secular', 'All'],
    dietSpecialty: 'Pure Veg',
    phone: '+91 98160 44210',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Tibetan', 'Hindi'],
    packages: [
      {
        id: 'tn-30k',
        nameEn: 'Buddhist Basic Mindfulness Package',
        nameHi: 'बौद्ध बेसिक माइंडफुलनेस पैकेज (₹30,000)',
        priceINR: 30000,
        priceDisplay: '₹30,000 / माह',
        periodEn: 'Monthly (4 Hours Daily)',
        periodHi: 'मासिक (4 घंटे रोज)',
        featuresEn: [
          'Daily meditation & breathing exercise companion',
          'Monastery & Stupa walking escort',
          'Healthy organic vegetarian meal prep',
          'Gentle stretching & vitals tracking'
        ],
        featuresHi: [
          'दैनिक ध्यान एवं प्राणायाम अभ्यास साथी',
          'मठ एवं स्तूप दर्शन सैर साथी',
          'स्वास्थ्यवर्धक जैविक शाकाहारी भोजन',
          'हल्का व्यायाम एवं रक्तचाप ट्रैकिंग'
        ]
      },
      {
        id: 'tn-50k',
        nameEn: 'Buddhist Standard Bodhi Care Package',
        nameHi: 'बौद्ध स्टैंडर्ड बोधि केयर पैकेज (₹50,000)',
        priceINR: 50000,
        priceDisplay: '₹50,000 / माह',
        periodEn: 'Monthly (8 Hours Dedicated)',
        periodHi: 'मासिक (8 घंटे समर्पित)',
        popular: true,
        featuresEn: [
          '8 Hours dedicated peaceful companion & caregiver',
          'Sattvik vegetarian diet according to Buddhist traditions',
          'Doctor appointment accompaniment',
          'Weekly Monastery prayer session escort'
        ],
        featuresHi: [
          '8 घंटे शांतिपूर्ण समर्पित साथी एवं सेवादार',
          'बौद्ध परंपरा अनुसार शुद्ध शाकाहारी सात्विक आहार',
          'डॉक्टर क्लिनिक साथी एवं दवा अलर्ट',
          'साप्ताहिक मठ प्रार्थना सभा साथी'
        ]
      },
      {
        id: 'tn-1lakh',
        nameEn: 'Buddhist Premium Bodh Gaya Circuit Care',
        nameHi: 'बौद्ध प्रीमियम बोधगया सर्किट पैकेज (₹1.00 लाख)',
        priceINR: 100000,
        priceDisplay: '₹1,00,000 / माह (1 Lakh)',
        periodEn: 'Monthly (12 Hours Full Care)',
        periodHi: 'मासिक (12 घंटे पूर्ण देखभाल)',
        featuresEn: [
          '12 Hours certified medical caregiver & monk assistant',
          'Escort to Bodh Gaya, Sarnath, Kushinagar, Rajgir circuit',
          'Comprehensive health management & mobility care',
          '24/7 Volunteer emergency assistance'
        ],
        featuresHi: [
          '12 घंटे प्रमाणित मेडिकल सेवादार',
          'बोधगया, सारनाथ, कुशीनगर बौद्ध सर्किट यात्रा साथी',
          'व्यापक स्वास्थ्य प्रबंधन एवं मूवमेंट सहायता',
          '24/7 आपातकालीन सहायता'
        ]
      },
      {
        id: 'tn-2lakh',
        nameEn: 'Buddhist VIP 24x7 Spiritual Retreat Package',
        nameHi: 'बौद्ध वीआईपी 24x7 आध्यात्मिक रिट्रीट (₹2.00 लाख)',
        priceINR: 200000,
        priceDisplay: '₹2,00,000 / माह (2 Lakhs)',
        periodEn: 'Monthly (24x7 Full Live-in)',
        periodHi: 'मासिक (24x7 चौबीसों घंटे लाइव-इन)',
        featuresEn: [
          '24x7 Live-in companion & certified nurse',
          'Full VIP retreat travel arrangements to Dharamshala, Ladakh or Lumbini',
          'Personal chef for customized sattvik organic diet',
          'Intensive medical check-ups & complete peaceful environment'
        ],
        featuresHi: [
          '24x7 चौबीसों घंटे लाइव-इन साथी एवं प्रमाणित नर्स',
          'धर्मशाला, लद्दाख या लुंबिनी हेतु वीआईपी रिट्रीट यात्रा',
          'विशेष सात्विक जैविक रसोइया व्यवस्था',
          'गहन स्वास्थ्य निगरानी एवं पूर्ण आध्यात्मिक वातावरण'
        ]
      }
    ]
  },
  {
    id: 'cg-7',
    name: 'Priyanka Verma',
    roleEn: 'Universal Caregiver & Medical Reminders',
    roleHi: 'यूनिवर्सल सेवादार व दवा अलर्ट विशेषज्ञ',
    rating: 4.9,
    reviewsCount: 55,
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    experienceYears: 6,
    primaryReligion: 'Secular',
    religionsServed: ['Hindu', 'Muslim', 'Sikh', 'Christian', 'Jain', 'Secular', 'All'],
    dietSpecialty: 'Pure Veg',
    phone: '+91 94150 77123',
    verified: true,
    availableNow: true,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    languages: ['English', 'Hindi'],
    packages: SEVA_PACKAGES_TEMPLATES
  }
];
