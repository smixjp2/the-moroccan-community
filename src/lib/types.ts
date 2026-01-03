
import { LucideIcon } from "lucide-react";

export type NavLink = {
  href: string;
  label: string;
  path: string;
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
  videoUrl?: string;
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
  icon: React.ComponentType<{ className?: string }> | LucideIcon;
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

export interface Lesson {
  title: string;
  duration: string;
  videoUrl: string;
}

export type FormState = {
  message: string;
  status: 'error' | 'success' | '';
  errors?: Record<string, string[]>;
};
    