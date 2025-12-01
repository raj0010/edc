import { NewsItem } from '../../types';

export const initialNews: NewsItem[] = [
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