import { 
  Megaphone, Rocket, Briefcase, TrendingUp, Sparkles, Code2, Users, 
  Calendar, ArrowUpRight, Zap, Target, ArrowRight, ArrowLeft, Bell, 
  CheckCircle2, Star, Mail, ExternalLink, ChevronDown, Clock, MapPin, 
  UserCircle2, Plus, MoreHorizontal, Menu, X, Moon, Sun 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Megaphone, 
  Rocket, 
  Briefcase, 
  TrendingUp, 
  Sparkles, 
  Code2, 
  Users, 
  Calendar, 
  ArrowUpRight, 
  Zap, 
  Target, 
  ArrowRight, 
  ArrowLeft, 
  Bell, 
  CheckCircle2, 
  Star, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  Clock, 
  MapPin, 
  UserCircle2, 
  Plus, 
  MoreHorizontal, 
  Menu, 
  X, 
  Moon, 
  Sun
};

export const getIcon = (name: string) => {
  return iconMap[name] || Sparkles; // Fallback to Sparkles if icon not found
};