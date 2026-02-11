import React from 'react';
import { clsx } from 'clsx';

// Cool tone palette (Sky, Blue, Cyan, Emerald, Teal, Indigo) for "Little Fresh" style
const COLORS = [
  'bg-sky-100 text-sky-700',
  'bg-emerald-100 text-emerald-700',
  'bg-blue-100 text-blue-700',
  'bg-cyan-100 text-cyan-700',
  'bg-teal-100 text-teal-700',
  'bg-indigo-100 text-indigo-700',
  'bg-violet-100 text-violet-700',
];

// Fixed color overrides for specific users
const NAME_COLOR_OVERRIDES: Record<string, string> = {
  'Cody Song': 'bg-sky-100 text-sky-700',
  'Koko Lv': 'bg-violet-100 text-violet-700',
  'Shawn Guo': 'bg-teal-100 text-teal-700',
  'Mike Zhang': 'bg-emerald-100 text-emerald-700',
  'Lisa Park': 'bg-[#D6ECF7] text-[#06157A]',
  'James Wu': 'bg-sky-100 text-sky-600',
  'Nina Chen': 'bg-violet-100 text-violet-500',
};

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  // Deterministic color based on name length
  // We can add a character code sum to be slightly more random than length
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colorIndex = charCodeSum % COLORS.length;
  
  // Allow className to override color if it contains 'bg-'
  const hasCustomBg = className?.includes('bg-');
  const colorClass = hasCustomBg ? '' : (NAME_COLOR_OVERRIDES[name] || COLORS[colorIndex]);

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={clsx(
        "rounded-full flex items-center justify-center font-bold tracking-wider flex-shrink-0",
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {initials}
    </div>
  );
}