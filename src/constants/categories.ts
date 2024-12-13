import { 
  MonitorIcon, 
  UsersIcon, 
  HeartIcon, 
  ArmchairIcon, 
  HeadphonesIcon, 
  RadioIcon 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

export const categories: Category[] = [
  {
    title: 'Gaming PCs',
    icon: MonitorIcon,
    description: 'Top-rated gaming computers for every budget',
    color: 'bg-blue-500',
  },
  {
    title: 'Dating Apps',
    icon: HeartIcon,
    description: 'Find your player two',
    color: 'bg-pink-500',
  },
  {
    title: 'Meet Friends',
    icon: UsersIcon,
    description: 'Connect with fellow gamers',
    color: 'bg-green-500',
  },
  {
    title: 'Gaming Chairs',
    icon: ArmchairIcon,
    description: 'Comfort for long gaming sessions',
    color: 'bg-purple-500',
  },
  {
    title: 'Accessories',
    icon: HeadphonesIcon,
    description: 'Essential gaming peripherals',
    color: 'bg-yellow-500',
  },
  {
    title: 'Streaming Gear',
    icon: RadioIcon,
    description: 'Professional streaming equipment',
    color: 'bg-red-500',
  },
];