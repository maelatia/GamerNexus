import React from 'react';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
}

export default function CategoryCard({ title, icon: Icon, description, color }: CategoryCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 hover:transform hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className={`${color} inline-flex p-3 rounded-lg`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="mt-4 text-x2 font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
    </div>
  );
}