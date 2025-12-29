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
