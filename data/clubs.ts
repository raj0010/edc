import { Megaphone, Rocket, Briefcase, TrendingUp } from 'lucide-react';
import { Club } from '../types';

export const clubs: Club[] = [
  {
    id: 'marketing',
    name: 'Marketing Club',
    tagline: 'Master the Art of Outreach',
    description: 'We decode consumer behavior and craft compelling narratives that sell. Join us to explore brand strategy, digital analytics, and creative campaigns.',
    icon: Megaphone,
    color: 'from-pink-500 to-rose-500',
    accentColor: 'text-pink-500',
    features: ['Brand Strategy Workshops', 'Digital Marketing Bootcamps', 'Live Case Studies'],
    leads: [
      { name: 'Sarah Jenkins', role: 'President' },
      { name: 'Mike Chen', role: 'Creative Dir' },
      { name: 'Jessica Alva', role: 'Social Lead' },
      { name: 'Tom Ford', role: 'Events Head' }
    ],
    nextEvent: {
      title: 'Viral Marketing 101',
      date: 'Oct 12 • 5:00 PM',
      type: 'Workshop'
    },
    stats: [
      { label: 'Campaigns', value: '12+' },
      { label: 'Members', value: '150+' },
      { label: 'Reach', value: '50k' }
    ]
  },
  {
    id: 'startup',
    name: 'Startup Club',
    tagline: 'From Idea to Unicorn',
    description: 'The incubation hub where raw ideas are refined into scalable business models. We provide mentorship, resources, and a network of investors.',
    icon: Rocket,
    color: 'from-violet-500 to-purple-500',
    accentColor: 'text-violet-500',
    features: ['Incubation Support', 'Pitch Deck Reviews', 'Founder Matchmaking'],
    leads: [
      { name: 'Alex Rivero', role: 'Founder' },
      { name: 'Sam K.', role: 'Tech Lead' },
      { name: 'Priya P.', role: 'Operations' },
      { name: 'David L.', role: 'Relations' }
    ],
    nextEvent: {
      title: 'Pitch Perfect Night',
      date: 'Oct 15 • 6:30 PM',
      type: 'Competition'
    },
    stats: [
      { label: 'Startups', value: '45' },
      { label: 'Funding', value: '$2M+' },
      { label: 'Mentors', value: '20' }
    ]
  },
  {
    id: 'consulting',
    name: 'Consulting Club',
    tagline: 'Solving Real World Problems',
    description: 'Bridging the gap between theory and practice through industry consulting projects. Prepare for top-tier firms with rigorous case prep.',
    icon: Briefcase,
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'text-blue-500',
    features: ['Case Interview Prep', 'Client Projects', 'Strategy Simulations'],
    leads: [
      { name: 'Marcus T.', role: 'President' },
      { name: 'Elena R.', role: 'Strategy Head' },
      { name: 'John D.', role: 'Case Lead' },
      { name: 'Sophie M.', role: 'Corporate' }
    ],
    nextEvent: {
      title: 'McKinsey Case Crack',
      date: 'Oct 18 • 4:00 PM',
      type: 'Seminar'
    },
    stats: [
      { label: 'Projects', value: '30+' },
      { label: 'Placements', value: '85%' },
      { label: 'Alumni', value: '200+' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance Club',
    tagline: 'Wealth & Wisdom',
    description: 'Understanding markets, investment strategies, and financial modeling. We manage a virtual portfolio and host trading competitions.',
    icon: TrendingUp,
    color: 'from-emerald-500 to-green-500',
    accentColor: 'text-emerald-500',
    features: ['Portfolio Management', 'Trading Simulations', 'Financial Literacy'],
    leads: [
      { name: 'Ryan Gosling', role: 'Portfolio Mgr' },
      { name: 'Emma Stone', role: 'Analyst' },
      { name: 'Christian B.', role: 'Quant' },
      { name: 'Margot R.', role: 'Trader' }
    ],
    nextEvent: {
      title: 'Market Makers Summit',
      date: 'Oct 22 • 5:30 PM',
      type: 'Conference'
    },
    stats: [
      { label: 'AUM', value: '$50k' },
      { label: 'Returns', value: '18%' },
      { label: 'Traders', value: '120' }
    ]
  }
];