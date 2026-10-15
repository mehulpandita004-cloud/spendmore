import React from 'react';
import {
  UtensilsCrossed,
  Bus,
  GraduationCap,
  Film,
  ShoppingBag,
  Home,
  MoreHorizontal,
  CreditCard,
  Tag,
} from 'lucide-react';

const iconMap = {
  UtensilsCrossed,
  Bus,
  GraduationCap,
  Film,
  ShoppingBag,
  Home,
  MoreHorizontal,
  CreditCard,
};

export default function CategoryIcon({ name, className = 'w-5 h-5' }) {
  const IconComponent = iconMap[name] || Tag;
  return <IconComponent className={className} />;
}
