import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { clsx } from 'clsx';
import outlinePaths from "../../imports/svg-2fmgjnirci";

export interface GroupChat {
  id: string;
  name: string;
  membersCount: number;
  progress: number;
  colorIndex: number;
}

export const MOCK_GROUP_CHATS: GroupChat[] = [
  { id: '1', name: "Shawn Guo's Handover", membersCount: 3, progress: 75, colorIndex: 0 },
  { id: '2', name: "Lisa Park's Handover", membersCount: 4, progress: 50, colorIndex: 1 },
  { id: '3', name: "James Wu's Handover", membersCount: 5, progress: 25, colorIndex: 2 },
  { id: '4', name: "Nina Chen's Handover", membersCount: 3, progress: 10, colorIndex: 3 },
];

interface GroupChatListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  chats?: GroupChat[];
}

// [background, fill color hex] — matching Digital Avatars palette
const GROUP_COLORS: [string, string][] = [
  ['bg-violet-100', '#8b5cf6'],    // violet-500
  ['bg-blue-100', '#3b82f6'],      // blue-500
  ['bg-cyan-100', '#06b6d4'],      // cyan-500
  ['bg-emerald-100', '#10b981'],   // emerald-500
];

// Group Avatar — clean linear Users icon, unique color per card
export function GroupAvatar({ name, className, size = 'md', colorIndex }: { name: string, className?: string, size?: 'sm' | 'md' | 'lg', colorIndex?: number }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Use colorIndex if provided, otherwise hash-based fallback
  let idx: number;
  if (colorIndex !== undefined) {
    idx = colorIndex % GROUP_COLORS.length;
  } else {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    idx = Math.abs(hash) % GROUP_COLORS.length;
  }

  const [bgClass, strokeColor] = GROUP_COLORS[idx];

  return (
    <div className={clsx(
      "rounded-full flex items-center justify-center shrink-0",
      sizeClasses[size],
      bgClass,
      className
    )}>
      <Users className={clsx(iconSizeClasses[size])} style={{ color: strokeColor }} strokeWidth={2.2} />
    </div>
  );
}

export function GroupChatList({ selectedId, onSelect, chats }: GroupChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const chatList = chats || MOCK_GROUP_CHATS;

  const filteredChats = chatList.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-[375px] flex-shrink-0">
      {/* Header Section */}
      <div className="flex-shrink-0 bg-white z-20">
        <div className="h-[72px] px-6 flex items-center justify-between border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Handover</h2>
        </div>
        
        {/* Search Bar */}
        <div className="px-6 py-4 pb-2">
          <div className="relative search-input-box rounded-xl bg-gray-50">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto pt-2">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelect(chat.id)}
            className={clsx(
              "px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50 flex items-center gap-4",
              selectedId === chat.id ? "bg-gray-50" : ""
            )}
          >
            <GroupAvatar name={chat.name} size="md" colorIndex={chat.colorIndex} />
            
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-gray-900 truncate text-[15px] block">{chat.name}</span>
              <p className="text-sm text-gray-500 mt-0.5">
                {chat.membersCount} members · {chat.progress}%
              </p>
            </div>
          </div>
        ))}

        {filteredChats.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
}
