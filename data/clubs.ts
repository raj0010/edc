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
      { name: 'Sarah Jenkins', role: 'President', email: 'sarah.j@edc-nexus.edu', socialUrl: 'https://linkedin.com' },
      { name: 'Mike Chen', role: 'Creative Dir', email: 'mike.chen@edc-nexus.edu' },
      { name: 'Jessica Alva', role: 'Social Lead', email: 'jess.a@edc-nexus.edu' },
      { name: 'Tom Ford', role: 'Events Head', email: 'tom.ford@edc-nexus.edu' }
    ],
    nextEvent: {
      title: 'Viral Marketing 101',
      date: 'Oct 12 • 5:00 PM',
      type: 'Workshop',
      description: 'Learn the psychology behind viral content. We will dissect successful campaigns from major brands and teach you how to craft hooks that capture attention instantly. Includes a live brainstorming session.',
      speakers: [
        { name: 'Emily Cooper', role: 'Social Media Lead, Vogue' },
        { name: 'David Kim', role: 'Brand Strategist' }
      ]
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
      { name: 'Alex Rivero', role: 'Founder', email: 'alex.r@edc-nexus.edu', socialUrl: 'https://twitter.com' },
      { name: 'Sam K.', role: 'Tech Lead', email: 'sam.k@edc-nexus.edu' },
      { name: 'Priya P.', role: 'Operations', email: 'priya.p@edc-nexus.edu' },
      { name: 'David L.', role: 'Relations', email: 'david.l@edc-nexus.edu' }
    ],
    nextEvent: {
      title: 'Pitch Perfect Night',
      date: 'Oct 15 • 6:30 PM',
      type: 'Competition',
      description: 'Watch 5 selected student startups pitch their ideas to a panel of angel investors and alumni. Networking session with refreshments will follow the main event.',
      speakers: [
        { name: 'Sarah Blakely', role: 'Angel Investor' },
        { name: 'Marcus Lemonis', role: 'Serial Entrepreneur' }
      ]
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
      { name: 'Marcus T.', role: 'President', email: 'marcus.t@edc-nexus.edu', socialUrl: 'https://linkedin.com' },
      { name: 'Elena R.', role: 'Strategy Head', email: 'elena.r@edc-nexus.edu' },
      { name: 'John D.', role: 'Case Lead', email: 'john.d@edc-nexus.edu' },
      { name: 'Sophie M.', role: 'Corporate', email: 'sophie.m@edc-nexus.edu' }
    ],
    nextEvent: {
      title: 'McKinsey Case Crack',
      date: 'Oct 18 • 4:00 PM',
      type: 'Seminar',
      description: 'A deep dive into solving profitability cases. This session covers framework selection, mental math shortcuts, and how to synthesize a recommendation like a top-tier consultant.',
      speakers: [
        { name: 'James O\'Neil', role: 'Associate, McKinsey' },
        { name: 'Linda Wu', role: 'Ex-BCG Consultant' }
      ]
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
      { name: 'Ryan Gosling', role: 'Portfolio Mgr', email: 'ryan.g@edc-nexus.edu' },
      { name: 'Emma Stone', role: 'Analyst', email: 'emma.s@edc-nexus.edu', socialUrl: 'https://linkedin.com' },
      { name: 'Christian B.', role: 'Quant', email: 'christian.b@edc-nexus.edu' },
      { name: 'Margot R.', role: 'Trader', email: 'margot.r@edc-nexus.edu' }
    ],
    nextEvent: {
      title: 'Market Makers Summit',
      date: 'Oct 22 • 5:30 PM',
      type: 'Conference',
      description: 'An evening discussing the current macroeconomic landscape, interest rate policies, and emerging market trends. Featuring a keynote on algorithmic trading.',
      speakers: [
        { name: 'Gordon Gekko', role: 'Hedge Fund Manager' },
        { name: 'Naomi Lapaglia', role: 'FinTech Innovator' }
      ]
    },
    stats: [
      { label: 'AUM', value: '$50k' },
      { label: 'Returns', value: '18%' },
      { label: 'Traders', value: '120' }
    ]
  }
];