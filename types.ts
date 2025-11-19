import { LucideIcon } from 'lucide-react';

export interface Club {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string;
  features: string[];
}

export interface NavItem {
  label: string;
  href: string;
}