export type NavLink = {
  href: string;
  label: string;
};

export interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  imageHint: string;
  date: string;
  content: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  duration: string;
  level: string;
  href: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  price: string;
  href: string;
}

export interface Bank {
  name: string;
  fees: string;
  digitalPlatform: string;
  agencyNetwork: string;
  youngOffer: boolean;
  card: string;
  logo: React.ReactNode;
}

export interface Brokerage {
  name: string;
  fees: string;
  platform: string;
  responsiveness: string;
  logo: React.ReactNode;
}

export interface Opcvm {
    id: string;
    name: string;
    managementCompany: string;
    category: "Monétaire" | "Obligataire CT" | "Obligataire MT/LT" | "Diversifié" | "Actions";
    nav: number; // Net Asset Value (Valeur Liquidative)
    perf1w: number;
    perf1m: number;
    perfYTD: number;
    perf1y: number;
    details: OpcvmDetails;
}

export interface OpcvmDetails {
    classification: string;
    creationDate: string;
    initialNav: number;
    subscriptionFee: string;
    managementFee: string;
    assetAllocation: {
        label: string;
        value: number;
    }[];
    historicalPerformance: {
        year: number;
        performance: number;
    }[];
    historicalNav: {
        date: string;
        value: number;
    }[];
}
