export type TabType = 'home' | 'machinery' | 'farmland' | 'farm-ledger';

export interface FarmParcel {
  id: string;
  name: string;
  hectares: number;
  location: string;
  beaconNumber?: string;
}

export interface MachineryItem {
  id: string;
  title: string;
  hp: number;
  ratePerHa: number;
  image: string;
  operator: {
    name: string;
    avatar: string;
    rating: number;
    completedJobs: number;
    phone: string;
  };
  features: string[];
  fuelAllotment: string;
  availability: string;
  tags: string[];
  distance?: string;
  category: 'tractors' | 'ploughs' | 'sprayers' | 'harvesters';
}

export interface FarmlandListing {
  id: string;
  title: string;
  surveyNumber: string;
  locationAxis: string;
  hectares: number;
  ratePerHaYear: number;
  totalPriceYear: number;
  status: string;
  leaseType: string;
  image: string;
  mapImage: string;
  beaconId: string;
  polygonSize: string;
  soilType: string;
  soilDesc: string;
  waterSource: string;
  waterDesc: string;
  topography: string;
  topographyDesc: string;
  priorHistory: string;
  priorDesc: string;
  landowner: {
    name: string;
    verified: boolean;
  };
  tenureTerm: string;
  permittedUse: string;
  safeguards: string[];
  inspector: {
    name: string;
    role: string;
    date: string;
  };
}

export interface LedgerEntry {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'outflow' | 'inflow';
  category: 'Tractor' | 'Farmland' | 'Seeds' | 'Fertiliser' | 'Harvest' | 'Other';
  verificationCode: string;
  verificationStatus: 'verified' | 'receipt_verified' | 'pending';
  subtitle: string;
}
