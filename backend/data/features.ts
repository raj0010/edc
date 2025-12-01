import { FeatureItem } from '../../types';

export const featuresData: FeatureItem[] = [
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