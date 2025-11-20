import { LucideIcon } from 'lucide-react';

export interface ClubMember {
  name: string;
  role: string;
  imageUrl?: string;
}

export interface ClubEvent {
  title: string;
  date: string;
  type: string;
}

export interface Club {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  accentColor: string; // For text/borders (e.g., 'text-pink-500')
  features: string[];
  leads: ClubMember[];
  nextEvent: ClubEvent;
  stats: { label: string; value: string }[];
}

export interface NavItem {
  label: string;
  href: string;
}