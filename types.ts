

export interface ClubMember {
  name: string;
  role: string;
  imageUrl?: string;
  email?: string;
  socialUrl?: string;
}

export interface ClubEvent {
  title: string;
  date: string;
  type: string;
  description?: string;
  speakers?: { name: string; role: string }[];
}

export interface ClubResource {
  title: string;
  url: string;
  type?: 'doc' | 'link' | 'video';
}

export interface Club {
  id: string;
  name: string;
  tagline: string;
  description: string;
  mission?: string;
  vision?: string;
  icon: string; // Changed from LucideIcon to string for JSON serialization
  color: string;
  accentColor: string; // For text/borders (e.g., 'text-pink-500')
  features: string[];
  leads: ClubMember[];
  nextEvent: ClubEvent;
  stats: { label: string; value: string }[];
  resources?: ClubResource[];
}

export interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderHighlight: string;
  visual: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Announcement' | 'Achievement' | 'Opportunity';
  author: string;
  link?: string;
}