
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// --- SEED DATA ---

let clubs = [
  {
    id: 'marketing',
    name: 'Marketing Club',
    tagline: 'Master the Art of Outreach',
    description: 'We decode consumer behavior and craft compelling narratives that sell. Join us to explore brand strategy, digital analytics, and creative campaigns.',
    mission: 'To empower students with the creative and analytical skills needed to craft compelling narratives and drive growth in the digital age.',
    vision: 'A community of forward-thinking strategists shaping the future of global communication and brand identity.',
    icon: 'Megaphone',
    color: 'from-pink-500 to-rose-500',
    accentColor: 'text-pink-500',
    features: ['Brand Strategy Workshops', 'Digital Marketing Bootcamps', 'Live Case Studies'],
    leads: [
      { name: 'Sarah Jenkins', role: 'President', email: 'sarah.j@edc-som.edu', socialUrl: 'https://linkedin.com' },
      { name: 'Mike Chen', role: 'Creative Dir', email: 'mike.chen@edc-som.edu' },
      { name: 'Jessica Alva', role: 'Social Lead', email: 'jess.a@edc-som.edu' },
      { name: 'Tom Ford', role: 'Events Head', email: 'tom.ford@edc-som.edu' }
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
    ],
    resources: [
      { title: 'Brand Style Guide', url: '#', type: 'doc' },
      { title: 'Social Media Calendar Template', url: '#', type: 'doc' },
      { title: 'Case Study Archive', url: '#', type: 'link' }
    ]
  },
  {
    id: 'startup',
    name: 'Startup Club',
    tagline: 'From Idea to Unicorn',
    description: 'The incubation hub where raw ideas are refined into scalable business models. We provide mentorship, resources, and a network of investors.',
    mission: 'To provide the fertile ground where student ideas germinate into sustainable business ventures through mentorship and resource access.',
    vision: 'The leading campus incubator for next-generation unicorns, disruptors, and ethical changemakers.',
    icon: 'Rocket',
    color: 'from-violet-500 to-purple-500',
    accentColor: 'text-violet-500',
    features: ['Incubation Support', 'Pitch Deck Reviews', 'Founder Matchmaking'],
    leads: [
      { name: 'Alex Rivero', role: 'Founder', email: 'alex.r@edc-som.edu', socialUrl: 'https://twitter.com' },
      { name: 'Sam K.', role: 'Tech Lead', email: 'sam.k@edc-som.edu' },
      { name: 'Priya P.', role: 'Operations', email: 'priya.p@edc-som.edu' },
      { name: 'David L.', role: 'Relations', email: 'david.l@edc-som.edu' }
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
    ],
    resources: [
      { title: 'Pitch Deck Template', url: '#', type: 'doc' },
      { title: 'Investor Database', url: '#', type: 'link' },
      { title: 'Startup Legal Checklist', url: '#', type: 'doc' },
      { title: 'MVP Development Guide', url: '#', type: 'video' }
    ]
  },
  {
    id: 'consulting',
    name: 'Consulting Club',
    tagline: 'Solving Real World Problems',
    description: 'Bridging the gap between theory and practice through industry consulting projects. Prepare for top-tier firms with rigorous case prep.',
    mission: 'To bridge the gap between academic theory and complex real-world business challenges through hands-on problem solving.',
    vision: 'Developing the sharpest analytical minds capable of delivering high-impact solutions to the world’s toughest problems.',
    icon: 'Briefcase',
    color: 'from-blue-500 to-cyan-500',
    accentColor: 'text-blue-500',
    features: ['Case Interview Prep', 'Client Projects', 'Strategy Simulations'],
    leads: [
      { name: 'Marcus T.', role: 'President', email: 'marcus.t@edc-som.edu', socialUrl: 'https://linkedin.com' },
      { name: 'Elena R.', role: 'Strategy Head', email: 'elena.r@edc-som.edu' },
      { name: 'John D.', role: 'Case Lead', email: 'john.d@edc-som.edu' },
      { name: 'Sophie M.', role: 'Corporate', email: 'sophie.m@edc-som.edu' }
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
    ],
    resources: [
      { title: 'Case Interview Frameworks', url: '#', type: 'doc' },
      { title: 'Consulting Resume Guide', url: '#', type: 'doc' },
      { title: 'Market Sizing Cheat Sheet', url: '#', type: 'doc' }
    ]
  },
  {
    id: 'finance',
    name: 'Finance Club',
    tagline: 'Wealth & Wisdom',
    description: 'Understanding markets, investment strategies, and financial modeling. We manage a virtual portfolio and host trading competitions.',
    mission: 'To democratize financial literacy and foster deep expertise in global markets, investment strategies, and economic policy.',
    vision: 'A financially empowered student body equipped with the knowledge to make informed decisions for a prosperous future.',
    icon: 'TrendingUp',
    color: 'from-emerald-500 to-green-500',
    accentColor: 'text-emerald-500',
    features: ['Portfolio Management', 'Trading Simulations', 'Financial Literacy'],
    leads: [
      { name: 'Ryan Gosling', role: 'Portfolio Mgr', email: 'ryan.g@edc-som.edu' },
      { name: 'Emma Stone', role: 'Analyst', email: 'emma.s@edc-som.edu', socialUrl: 'https://linkedin.com' },
      { name: 'Christian B.', role: 'Quant', email: 'christian.b@edc-som.edu' },
      { name: 'Margot R.', role: 'Trader', email: 'margot.r@edc-som.edu' }
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
    ],
    resources: [
      { title: 'Financial Modeling 101', url: '#', type: 'video' },
      { title: 'Trading Terminology Glossary', url: '#', type: 'doc' },
      { title: 'Live Market Dashboard', url: '#', type: 'link' }
    ]
  }
];

const features = [
  {
    id: 'inspire',
    title: 'Inspire',
    subtitle: 'Ignite the Spark',
    description: 'Through world-class speaker sessions, fire-side chats with unicorn founders, and immersive workshops, we plant the seeds of innovation.',
    icon: 'Sparkles',
    color: 'text-amber-500',
    bgGradient: 'from-amber-500/20 to-orange-500/5',
    borderHighlight: 'group-hover:border-amber-500/50',
    visual: 'orb'
  },
  {
    id: 'build',
    title: 'Build',
    subtitle: 'Forge the Future',
    description: 'Access our incubation labs, mentorship network, and technical resources. We help you turn back-of-the-napkin sketches into MVP prototypes.',
    icon: 'Code2',
    color: 'text-cyan-500',
    bgGradient: 'from-cyan-500/20 to-blue-500/5',
    borderHighlight: 'group-hover:border-cyan-500/50',
    visual: 'code'
  },
  {
    id: 'launch',
    title: 'Launch',
    subtitle: 'Scale to Infinity',
    description: 'Pitch to top-tier VCs, secure seed funding, and get your startup off the ground. We provide the launchpad for your journey to the stars.',
    icon: 'Rocket',
    color: 'text-violet-500',
    bgGradient: 'from-violet-500/20 to-purple-500/5',
    borderHighlight: 'group-hover:border-violet-500/50',
    visual: 'chart'
  }
];

let news = [
  {
    id: '1',
    title: 'EDC Expands to Pune Campus',
    summary: 'We are thrilled to announce the inauguration of our newest chapter at the Pune campus, bringing innovation to 500+ new students.',
    date: 'Oct 01, 2024',
    category: 'Announcement',
    author: 'Central Council'
  },
  {
    id: '2',
    title: 'Student Startup "EcoFlow" Raises Seed Round',
    summary: 'Incubated at our Startup Club, EcoFlow has successfully raised $50k in pre-seed funding from alumni investors.',
    date: 'Sep 28, 2024',
    category: 'Achievement',
    author: 'Startup Club'
  },
  {
    id: '3',
    title: 'Applications Open for Winter Incubation Cohort',
    summary: 'Got an idea? Submit your pitch deck by Nov 15th to join our 12-week intensive incubation program.',
    date: 'Oct 05, 2024',
    category: 'Opportunity',
    author: 'Incubation Team'
  }
];

// --- API ROUTES ---

// 1. CLUBS ROUTES
app.get('/v1/clubs', (req, res) => {
  res.json(clubs);
});

app.get('/v1/clubs/:id', (req, res) => {
  const club = clubs.find(c => c.id === req.params.id);
  if (club) res.json(club);
  else res.status(404).json({ error: 'Club not found' });
});

app.patch('/v1/clubs/:id', (req, res) => {
  const clubIndex = clubs.findIndex(c => c.id === req.params.id);
  if (clubIndex > -1) {
    clubs[clubIndex] = { ...clubs[clubIndex], ...req.body };
    res.json(clubs[clubIndex]);
  } else {
    res.status(404).json({ error: 'Club not found' });
  }
});

// 2. NEWS ROUTES
app.get('/v1/news', (req, res) => {
  res.json(news);
});

app.post('/v1/news', (req, res) => {
  const newItem = { ...req.body, id: Date.now().toString() };
  news.unshift(newItem);
  res.status(201).json(newItem);
});

app.delete('/v1/news/:id', (req, res) => {
  news = news.filter(n => n.id !== req.params.id);
  res.status(204).send();
});

// 3. FEATURES ROUTES
app.get('/v1/features', (req, res) => {
  res.json(features);
});

// 4. AUTH ROUTES
app.post('/v1/auth/login', (req, res) => {
  const { password } = req.body;
  if (password === 'nexus2024') {
    res.json({ success: true, token: 'server-jwt-token-' + Date.now() });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`EDC Nexus API Server listening on port ${port}`);
  console.log(`Base URL: http://localhost:${port}/v1`);
});
