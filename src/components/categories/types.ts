
import { ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  description: string;
  tagline: string;
  cta: string;
  image: string;
  backupImage: string;
  icon: ReactNode;
}

export const categories: Category[] = [{
  id: 'security',
  name: 'Security Courses',
  description: 'Professional security training',
  tagline: 'Comprehensive security courses designed for individuals and organizations seeking professional certification and expertise',
  cta: 'Explore Security Courses',
  image: 'https://images.unsplash.com/photo-1553522911-d0ba7b3ee935?q=80&w=1470&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1553522911-d0ba7b3ee935?q=80&w=1470&auto=format&fit=crop',
  icon: null // Will be set in the parent component
}, {
  id: 'english',
  name: 'English Language',
  description: 'Master the English language',
  tagline: 'From beginners to advanced levels, our English language courses help you communicate confidently in any situation',
  cta: 'Explore English Courses',
  image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1471&auto=format&fit=crop',
  icon: null
}, {
  id: 'short-courses',
  name: 'Short Courses',
  description: 'Quick learning for busy professionals',
  tagline: 'Intensive, focused training designed for quick skill acquisition and immediate application in your career',
  cta: 'Explore Short Courses',
  image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1480&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1480&auto=format&fit=crop',
  icon: null
}, {
  id: 'health-safety',
  name: 'Health & Safety',
  description: '#1 Most popular topic on Lilly-Angel',
  tagline: 'With over 100,000 customers, from individuals to some of the most respected global brands',
  cta: 'Explore Health And Safety Courses',
  image: '/lovable-uploads/b6830540-4fd4-4909-8e65-53d63367223e.png',
  backupImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop',
  icon: null
}, {
  id: 'level-7',
  name: 'Level 7 Courses',
  description: 'Advanced professional qualifications',
  tagline: 'High-level qualifications designed for career advancement and deep industry expertise',
  cta: 'Explore Level 7 Courses',
  image: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=1470&auto=format&fit=crop',
  backupImage: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=1470&auto=format&fit=crop',
  icon: null
}];
