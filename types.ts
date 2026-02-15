
export enum Section {
  ABOUT = 'ABOUT',
  WORKING = 'WORKING',
  PORTFOLIO = 'PORTFOLIO',
  APPOINTMENT = 'APPOINTMENT',
  CONTACT = 'CONTACT'
}

export interface NavItem {
  id: Section;
  label: string;
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  metric: string;
  subMetric: string;
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  icon: string;
}
