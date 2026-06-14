export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  appStoreLink?: string;
  playStoreLink?: string;
  appleId?: string;
  githubLink?: string;
  tags: string[];
  category: 'Golf & IoT' | 'Social & Map Integration' | 'Full-Stack & Utilities';
  metrics?: string;
  featured: boolean;
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  value: string;
  sub: string;
}
