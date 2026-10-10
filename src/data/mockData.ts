import { FarmlandListing, LedgerEntry, MachineryItem } from '../types';

export const BRAND_ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdi8iM2cWPXJzzF3EwgntAgLWkoyJKHcyT2xWdkHz_uCEKem-1EuT93OaZdIwaWBKTMkfhgISu516gCm2BJSDRpOwCO4j0Z42x9Z4IsNGjJY-pPd-LN6aIbVTOH6dU8TasGS_SYXOD-fCnnE-HozPEJKpLafZqZgiVPYYKn_SYjSo4CIx1BvOY-Q3lVo6EghrLTxicPiXRFD46NEca0Mmpp5H3gOEuphXrw9UF-lcsboBvDCJBEje5oQ',
  adebayoProfile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3D7PHuB01aEhgsKrOn4KaZAEOGc6nP0LlPuGLvgCzpdUa9snrIu3E-6Ua3sVSgTRKJ488yqdiaerwlDlubZ9YeTuu8pIvTVfkaETq6OYIquUnNtxU7mKIoKzCzESWfdrQp6IechrS-knGwMrj4W2CRGhR9ClJQl4ZsHfstL5ch7PgUT3Solg7CE2SfJrn-ocKY-r8xcY0v6xScur1ZWZ8nakea1r4O9yuX23XWD3ZWpLfharFsGpTBQ',
  adebayoLarge: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCot0lcMoamSgXc8soRRg0ziwUYoQu9y_fEM28KDmG-eD6gIjHZ5Bq2aDzzIBADd-QtjG0143M1x_aArJXNiLbxFOf5TJA2qd8FFLXZYViaRg7FbZZvAgfy0OVKqEUKtHZWLBrwvO6cHe-UJcr0S4je9_B9xiCT9IWeSEX_arxtSPvoQAzWk24kcZk0MagOSBNopxGSMj2ns0kAFasrzpr1eXb3XmvoWO8LO9cPSZSubCTXVqemmBMPzA',
  tractorMF: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbShOCv5g56pUN7j1vt8reoip73jFi4Iceb3wB7cf9nHzqv7-rb9_OFsUZkZRYQMawswwX1l07UOg5bTcOhH94dKG0GbuK5ZUW9HOO7bNX-8V1kjbt9RkGRVYCyZfup3fsIzbY8il_OVxpiSTgQwF85cpJmRG3Hn-YonbJk9jJ9R0qLzwZlG87TFdUaPqz5vSUPzRQCrksxzGZymi0mhlrs5CDVg5VsLNogtLlcCvMXtxqWDKsfyaMKw',
  sundayAlabi: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2mYHdgBDfGyQhWESIISLaqobq6zjLgRudB2AVVgPJPzHJZGiFj9wQAWC9WQue4R360x9StezfelvX6LS946X309k0C-zb6TGzzxYeTSHz-hB7QwLBdyAWiaoHC2CIhtNIT0RvulOcbRTH-QURnWn2U1zPDe6-u1dgY7UgANZKFWYWcrRgPvgHB_DkWcQbZk-cDTl2kVjPsmjGbqdGshwC87iwsL5AN8iIukbDqvbPauiLpy0BfDUUWQ',
  mahindraTractor: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoKfYV8X5qEFx8jS9SKYbE4po5Ek36HlkBpzU64CFX1MJvr51kjdcYifqpIUUmN3ThPHmanGxHHttCMBWSnJgRl67HvDkz5ek0ngkHSVw1D3wUTMcjA7Mcs92l7pxQzHlOZB6-JHHkRnLO37sJdYCV1FOsAIw4GBAsh6tK-fFmOo2x6qqb--7G7EewFIb3JPPAUxHpGPqFCSGUAdYyAUg1PIXvCzQi5LCg-FIUrkC5SgyvqHdaATf6IQ',
  jideOperator: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA9sS0sSSPL37l7DkfESVWPesEDCeGB1I2D-2c8U54YKgfQdw11kmFfljYjVEAU7SjIodIB-tx9RAOJrkQS4Z91gyC2VosvEufYuwzfmeuNNaUTIZrNPqL96BvxLSNnytxTfaY5v19pcPxhyqdI6KDe6N0SYRN7y6pNLzMm6iyuI8pEy9O4TqU-ryYUKdYh8tLpLwgjLtwSG5YDdIeluY4vZdT1RVstY_nETV9aliBFwl9OL_lD4Or-Q',
  clusterFarmlandBanner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7Guqk9cIhhhxdrWhYpdRX1PQMdVG05Xy2Luin5rwr5p4PaK5pV7Z_wtmWBTJtAX9u_mdAs-ECPIknqerCAg8lR8RX_9ckM9Co8_sO3t3ussVrdxlnelBDqS2n85mBfMP8vkZUd_Jl3XuvFbGjYU-N6_L0MCzFSVN3uPdAe5GyiIdjxZ_IY18AIFBVw0R02ov15zMTT7kCKYSBteVSvk8XVLQh2kiehKxViKP1RCbzwlbWZXyp5FuXzw',
  farmlandHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA03NRc3GEZkG7B-e473eTZr7D3nb_P62L0b1ZkYa7pHPyj6N1hqk1fU0TY49cIcvLrWocy-9hlw0Jv46F7aeMtQ0jrf575FSAb5c_1qmbG5gfZTHdQHET2eELIWGGE4kYR3B5d0PTKfItrCdYGfsbQRk3Id1dHhNRdNzOIJ8VKY2qnGtkxVxjkNomJwTbgkE0xj4T5k98vvG6YoieQxT7nOnaY26KtXCQmrU8wOODqoJxWsOCMpvSbWA',
  cadastralMap: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-ZY5NE3bNOaN06fiUvYPsC_J1fX622IjKG0BlVBgnMSbKfCkr9NQ-PpLETur-2nypzaKwC4lMhjkNHVKSE45tu6ilnh2wpN-GOpwLnBjAXWiLlndN646r6Eyn2iGOr0_eTf38RM2RhuDmokVicIuG1l6qO0k8sE50oQRkmm8P_tD9gmt2U18BZtxVR6YP9oZOoIXLqRV7enBXNCLbBGzhuq9IzE_bVjXEfd9cy0lATlHXs9p4F5Ubvw',
};

export const INITIAL_PARCELS = [
  { id: 'plot-a', name: 'Adebayo Plot A (1.5 Ha, Erunmu Road)', hectares: 1.5, location: 'Erunmu Road, Egbeda', beaconNumber: 'OY-EGB-401' },
  { id: 'plot-b', name: 'Adebayo Plot B (2.0 Ha, Egbeda East)', hectares: 2.0, location: 'Egbeda East Corridor', beaconNumber: 'OY-EGB-402' },
  { id: 'plot-c', name: 'Oyo Valley Plot 3 (0.8 Ha, Alakia)', hectares: 0.8, location: 'Alakia Road Junction', beaconNumber: 'OY-EGB-403' },
];

export const SERVICE_OPTIONS = [
  { id: 'plough-ridge', label: 'Ploughing + Ridging (2 passes)', multiplier: 1.0 },
  { id: 'primary-plough', label: 'Primary Disk Ploughing (1 pass)', multiplier: 0.75 },
  { id: 'deep-tillage', label: 'Deep Tillage + Bed Formation', multiplier: 1.2 },
];

export const MACHINERY_LIST: MachineryItem[] = [
  {
    id: 'mf-375',
    title: 'Massey Ferguson 375 (75 HP)',
    hp: 75,
    ratePerHa: 35000,
    image: BRAND_ASSETS.tractorMF,
    operator: {
      name: 'Sunday Alabi',
      avatar: BRAND_ASSETS.sundayAlabi,
      rating: 4.9,
      completedJobs: 42,
      phone: '+234 803 491 8820',
    },
    features: ['4WD Heavy Duty', 'Disk Plough Mount', 'GPS Telemetry Active', 'Air-Conditioned Cab'],
    fuelAllotment: 'Basic quota covered',
    availability: 'Tomorrow, 7:00 AM',
    tags: ['Inspected Machinery', 'Escrow Protection', 'Ready in Cluster'],
    category: 'tractors',
  },
  {
    id: 'mahindra-575',
    title: 'Mahindra 575 DI (45 HP)',
    hp: 45,
    ratePerHa: 30000,
    image: BRAND_ASSETS.mahindraTractor,
    operator: {
      name: 'Razaq Bello',
      avatar: BRAND_ASSETS.jideOperator,
      rating: 4.8,
      completedJobs: 38,
      phone: '+234 805 219 4433',
    },
    features: ['Tiller Attached', 'Ridge Maker', 'Inspected Gearbox'],
    fuelAllotment: 'Full fuel tank included',
    availability: 'Today, 2:30 PM',
    tags: ['Inspected Machinery', 'Escrow Protection'],
    distance: '2.5km away',
    category: 'tractors',
  },
];

export const FARMLAND_LISTINGS: FarmlandListing[] = [
  {
    id: 'alakia-2ha',
    title: '2.0 Hectares Fertile Loamy Farmland',
    surveyNumber: 'Survey Plan No. OY/EGB/2023/88',
    locationAxis: 'Alakia / Egbeda Axis',
    hectares: 2.0,
    ratePerHaYear: 45000,
    totalPriceYear: 90000,
    status: 'Ready For Tillage',
    leaseType: 'Direct Lease',
    image: BRAND_ASSETS.farmlandHero,
    mapImage: BRAND_ASSETS.cadastralMap,
    beaconId: 'Alakia/Egbeda Corridor Beacon #B412',
    polygonSize: '20,000 m² Polygons',
    soilType: 'Sandy-Clay Loam',
    soilDesc: 'Ideal for maize, cassava & soybeans',
    waterSource: 'Seasonal Stream',
    waterDesc: 'At East boundary (50m walk)',
    topography: 'Gentle Slope (2-3%)',
    topographyDesc: 'Mechanization & tractor friendly',
    priorHistory: 'Maize & Cowpea',
    priorDesc: 'Fallow for 1 year (rich nitrogen)',
    landowner: {
      name: 'Elder Rasheed Oladipo',
      verified: true,
    },
    tenureTerm: '12 Months (Renewable)',
    permittedUse: 'Annual arable cropping (Maize/Soybean)',
    safeguards: [
      'No permanent structures without registered written amendment.',
      'Full guaranteed right to plant, tend, and harvest all seasonal yields.',
      'Binding dispute resolution via Egbeda Farmer Cooperative Council.',
    ],
    inspector: {
      name: 'Funke A.',
      role: 'OkoEgbeda Field Officer',
      date: '12 May 2024',
    },
  },
];

export const INITIAL_LEDGER_ENTRIES: LedgerEntry[] = [
  {
    id: 'led-1',
    title: 'Tractor Harrowing (1.5 Ha)',
    date: '18 May 2024',
    amount: 52500,
    type: 'outflow',
    category: 'Tractor',
    verificationCode: 'OKO-8821',
    verificationStatus: 'verified',
    subtitle: 'Verified Invoice with MF6028 Tractor Operator',
  },
  {
    id: 'led-2',
    title: 'Farmland Lease Deposit',
    date: '12 May 2024',
    amount: 45000,
    type: 'outflow',
    category: 'Farmland',
    verificationCode: 'LND-302',
    verificationStatus: 'verified',
    subtitle: 'Boundaries GPS-Mapped & Deed Stamped',
  },
  {
    id: 'led-3',
    title: 'Pioneer 30Y87 Hybrid (15kg)',
    date: '04 May 2024',
    amount: 30000,
    type: 'outflow',
    category: 'Seeds',
    verificationCode: 'Receipt Verified',
    verificationStatus: 'receipt_verified',
    subtitle: 'Egbeda Agro-Dealer Outlet #09',
  },
];
