import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { GroupChat } from './GroupChatList';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar } from './Avatar';

interface Member {
  name: string;
  title: string;
  status: 'departing' | 'admin' | 'active';
}

// Per-chat member data — counts MUST match membersCount in MOCK_GROUP_CHATS
const MEMBERS_MAP: Record<string, Member[]> = {
  '1': [ // Shawn Guo's Handover — 3 members
    { name: 'Shawn Guo', title: 'Product Manager', status: 'departing' },
    { name: 'Koko Lv', title: 'VP of Design', status: 'active' },
    { name: 'Cody Song', title: 'Director of Compensation and Incentives', status: 'admin' },
  ],
  '2': [ // Lisa Park's Handover — 4 members
    { name: 'Lisa Park', title: 'Engineering', status: 'departing' },
    { name: 'Mike Li', title: 'VP of Product', status: 'active' },
    { name: 'Jordan Wu', title: 'Tech Lead', status: 'active' },
    { name: 'Cody Song', title: 'Director of Compensation and Incentives', status: 'admin' },
  ],
  '3': [ // James Wu's Handover — 5 members
    { name: 'James Wu', title: 'Marketing', status: 'departing' },
    { name: 'Rachel Lin', title: 'Marketing Director', status: 'active' },
    { name: 'Tom Chen', title: 'Brand Manager', status: 'active' },
    { name: 'Amy Zhang', title: 'Content Lead', status: 'active' },
    { name: 'Cody Song', title: 'Director of Compensation and Incentives', status: 'admin' },
  ],
  '4': [ // Nina Chen's Handover — 3 members
    { name: 'Nina Chen', title: 'Sales', status: 'departing' },
    { name: 'Kevin Wang', title: 'Sales Director', status: 'active' },
    { name: 'Cody Song', title: 'Director of Compensation and Incentives', status: 'admin' },
  ],
};

interface GroupChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  groupChat: GroupChat | null;
}

export function GroupChatDrawer({ isOpen, onClose, groupChat }: GroupChatDrawerProps) {
  if (!groupChat) return null;

  const members = MEMBERS_MAP[groupChat.id] || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 z-40 backdrop-blur-[1px]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[320px] bg-white shadow-2xl z-50 border-l border-gray-100 flex flex-col"
          >
            {/* Header — close on left, title font matches Handover (text-lg font-medium) */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-medium text-lg text-gray-900">Group Members</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
               <div className="space-y-3">
                 {members.map((member, i) => (
                   <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-default">
                     {member.name === 'Cody Song' ? (
                       <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm shrink-0">
                         CS
                       </div>
                     ) : (
                       <Avatar name={member.name} size="md" />
                     )}
                     <div className="flex-1 min-w-0">
                       {/* Name + Tag inline, gap-2 = 8px */}
                       <div className="flex items-center gap-2">
                         <span className="font-medium text-gray-900 text-sm">{member.name}</span>
                         {member.status === 'departing' && (
                           <span className="px-1.5 py-0.5 bg-violet-50 text-violet-600 text-[10px] font-medium rounded-full shrink-0">
                             Departing
                           </span>
                         )}
                         {member.status === 'admin' && (
                           <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full shrink-0">
                             Admin
                           </span>
                         )}
                       </div>
                       <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}