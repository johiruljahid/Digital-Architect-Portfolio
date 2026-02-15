
import { Section, NavItem, Project, Experience } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: Section.ABOUT, label: 'ABOUT', icon: '👤', color: 'blue' },
  { id: Section.WORKING, label: 'WORKING', icon: '💼', color: 'indigo' },
  { id: Section.PORTFOLIO, label: 'PORTFOLIO', icon: '📁', color: 'cyan' },
  { id: Section.APPOINTMENT, label: 'APPOINTMENT', icon: '📅', color: 'rose' },
  { id: Section.CONTACT, label: 'CONTACT', icon: '📇', color: 'amber' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-COMMERCE CAMPAIGN',
    metric: '$120K Revenue',
    subMetric: '6.5X ROAS',
    image: 'https://picsum.photos/seed/ecom/400/250'
  },
  {
    id: '2',
    title: 'LEAD GEN SUCCESS',
    metric: '350% Growth',
    subMetric: 'HIGH INTENT LEADS',
    image: 'https://picsum.photos/seed/leads/400/250'
  },
  {
    id: '3',
    title: 'BRAND STRATEGY',
    metric: 'Global Reach',
    subMetric: 'CAMPAIGN BOOST',
    image: 'https://picsum.photos/seed/brand/400/250'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: '1',
    company: 'PIXEL PERFECT AGENCY',
    role: 'SENIOR MARKETING LEAD',
    period: '2021 - Present',
    icon: '🚀'
  },
  {
    id: '2',
    company: 'GROWTHX SYSTEMS',
    role: 'DIGITAL STRATEGIST',
    period: '2019 - 2021',
    icon: '📈'
  },
  {
    id: '3',
    company: 'CREATIVE ORBIT',
    role: 'CONTENT COORDINATOR',
    period: '2017 - 2019',
    icon: '✨'
  }
];

export const APPOINTMENT_SERVICES = [
  { id: '1', title: 'DIGITAL STRATEGY AUDIT', time: '45 MIN', icon: '📊' },
  { id: '2', title: 'ADS CAMPAIGN SETUP', time: '60 MIN', icon: '🚀' },
  { id: '3', title: 'SOCIAL MEDIA STRATEGY', time: '30 MIN', icon: '📱' },
  { id: '4', title: 'CONVERSION OPTIMIZATION', time: '60 MIN', icon: '🎯' },
];

export const TIME_SLOTS = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];
