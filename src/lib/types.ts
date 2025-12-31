
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
  isNew?: boolean;
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

export interface Tool {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export type Opcvm = {
    id: string;
    name: string;
    managementCompany: string;
    category: string;
    nav: number;
    perf1w: number;
    perf1m: number;
    perfYTD: number;
    perf1y: number;
    details: {
        classification: string;
        creationDate: string;
        initialNav: number;
        subscriptionFee: string;
        managementFee: string;
        assetAllocation: { label: string; value: number }[];
        historicalPerformance: { year: number; performance: number }[];
        historicalNav: { date: string; value: number }[];
    };
};

    