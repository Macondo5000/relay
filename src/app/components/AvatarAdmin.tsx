import React, { useState } from 'react';
import { X, Globe, Lock, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar } from './Avatar';
import svgPaths from "../../imports/svg-d70oxd7f8z";

// Avatar data — linked to Digital Avatars (MOCK_EMPLOYEES in App.tsx)
interface AvatarEntry {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'live' | 'inactive';
  access: 'public' | 'restricted';
  allowedMembers?: string[];
  createdDate: string;
}

// All possible members that can be added
interface MemberOption {
  id: string;
  name: string;
  role: string;
  company: string;
}

const ALL_MEMBERS: MemberOption[] = [
  { id: 'koko', name: 'Koko Lv', role: 'VP of Design', company: 'Tanka' },
  { id: 'shawn', name: 'Shawn Guo', role: 'Product Manager', company: 'Tanka' },
  { id: 'james', name: 'James Wu', role: 'Marketing', company: 'Product Manager' },
  { id: 'mike', name: 'Mike Li', role: 'VP of Product', company: 'Tanka' },
  { id: 'jordan', name: 'Jordan Wu', role: 'Tech Lead', company: 'Engineering' },
  { id: 'rachel', name: 'Rachel Lin', role: 'Marketing Director', company: 'Marketing' },
  { id: 'amy-z', name: 'Amy Zhang', role: 'Content Lead', company: 'Marketing' },
  { id: 'kevin', name: 'Kevin Wang', role: 'Sales Director', company: 'Sales' },
];

const AVATAR_ENTRIES: AvatarEntry[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    department: 'Product',
    status: 'live',
    access: 'restricted',
    allowedMembers: ['Koko Lv', 'Shawn Guo', 'Cody Song'],
    createdDate: 'Oct 5, 2025',
  },
  {
    id: '2',
    name: 'Mike Zhang',
    role: 'Engineering',
    department: 'Engineering',
    status: 'live',
    access: 'public',
    createdDate: 'Nov 12, 2025',
  },
  {
    id: '3',
    name: 'Emily Wang',
    role: 'Marketing Director',
    department: 'Marketing',
    status: 'live',
    access: 'public',
    createdDate: 'Dec 1, 2025',
  },
  {
    id: '4',
    name: 'David Li',
    role: 'Sales Director',
    department: 'Sales',
    status: 'live',
    access: 'public',
    createdDate: 'Jan 10, 2026',
  },
  {
    id: '5',
    name: 'Amy Zhou',
    role: 'UI/UX Designer',
    department: 'Design',
    status: 'live',
    access: 'restricted',
    allowedMembers: ['Koko Lv', 'Shawn Guo', 'James Wu', 'Amy Zhang', 'Cody Song'],
    createdDate: 'Jan 25, 2026',
  },
];

// Manage Avatar Modal — pill switch style matching New Offboarding
function ManageAvatarModal({
  isOpen,
  onClose,
  entry,
}: {
  isOpen: boolean;
  onClose: () => void;
  entry: AvatarEntry;
}) {
  const [visibility, setVisibility] = useState<'public' | 'restricted'>(entry.access);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(
    new Set(entry.allowedMembers || [])
  );

  const toggleMember = (name: string) => {
    setSelectedMembers(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const handleSave = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={e => e.stopPropagation()}
        className="admin-modal-bg bg-white rounded-2xl w-full max-w-[480px] shadow-2xl overflow-hidden font-sans"
      >
        {/* Header */}
        <div className="px-8 pt-7 pb-0">
          <div className="flex items-start justify-between mb-1">
            <h2 className="admin-modal-title text-xl font-bold text-gray-900">Manage {entry.name}'s Avatar</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 -mt-0.5 -mr-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Configure visibility and access permissions</p>
        </div>

        {/* Content */}
        <div className="px-8 pb-7">
          {/* VISIBILITY label */}
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">Visibility</p>

          {/* Public / Restricted pill switch — matching New Offboarding style */}
          <div className="modal-switch-track relative flex bg-gray-100 rounded-xl p-1 mb-6">
            <motion.div
              layout
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="modal-switch-indicator absolute top-1 bottom-1 rounded-lg bg-white shadow-sm"
              style={{
                width: 'calc(50% - 4px)',
                left: visibility === 'public' ? 4 : 'calc(50% + 0px)',
              }}
            />
            <button
              onClick={() => setVisibility('public')}
              className={clsx(
                "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                visibility === 'public' ? "modal-switch-active text-gray-900" : "text-gray-400"
              )}
            >
              <Globe className="w-3.5 h-3.5" />
              Public
            </button>
            <button
              onClick={() => setVisibility('restricted')}
              className={clsx(
                "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                visibility === 'restricted' ? "modal-switch-active text-gray-900" : "text-gray-400"
              )}
            >
              <Lock className="w-3.5 h-3.5" />
              Restricted
            </button>
          </div>

          {/* Allowed Members — only shown when Restricted */}
          <AnimatePresence mode="wait" initial={false}>
            {visibility === 'restricted' && (
              <motion.div
                key="restricted-members"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-3">
                  Allowed Members ({selectedMembers.size})
                </p>

                <div className="modal-list-container border border-gray-200 rounded-xl overflow-hidden mb-6">
                  <div className="modal-list-divider max-h-[240px] overflow-y-auto divide-y divide-gray-100">
                    {ALL_MEMBERS.map(member => {
                      const isSelected = selectedMembers.has(member.name);
                      return (
                        <button
                          key={member.id}
                          onClick={() => toggleMember(member.name)}
                          className={clsx(
                            "modal-list-item w-full flex items-center gap-3 px-4 py-3 transition-colors text-left",
                            isSelected ? "modal-list-item-selected bg-gray-50" : "hover:bg-gray-50/50"
                          )}
                        >
                          <div className={clsx(
                            "w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-colors",
                            isSelected ? "modal-checkbox-selected bg-gray-900 border-gray-900" : "modal-checkbox-unselected border-gray-300"
                          )}>
                            {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                          </div>
                          <Avatar name={member.name} size="sm" className="!w-9 !h-9 !text-xs" />
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-gray-900 text-sm block">{member.name}</span>
                            <span className="text-xs text-gray-400">{member.company}, {member.role}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="modal-btn-active w-full py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          >
            Save Permissions
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function AvatarAdmin() {
  const [manageEntry, setManageEntry] = useState<AvatarEntry | null>(null);

  const totalAvatars = AVATAR_ENTRIES.length;
  const liveCount = AVATAR_ENTRIES.filter(a => a.status === 'live').length;
  const publicCount = AVATAR_ENTRIES.filter(a => a.access === 'public').length;
  const restrictedCount = AVATAR_ENTRIES.filter(a => a.access === 'restricted').length;

  return (
    <>
      <div className="admin-page-bg flex-1 h-full bg-gray-50 flex flex-col font-sans relative min-w-0">
        {/* Header */}
        <div className="admin-header border-b border-gray-100 flex-shrink-0">
          <div className="h-[72px] max-w-5xl mx-auto px-8 w-full flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-medium text-gray-900 text-lg leading-tight">Avatar Administration</h1>
              <p className="text-xs text-gray-400 mt-0.5">Manage digital avatars and configure access permissions</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto py-8">
          <div className="max-w-5xl mx-auto px-8 w-full">
            {/* Dashboard Stats — 4 cards in a row, matching Offboarding style */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="admin-card bg-white rounded-2xl border border-gray-200 p-6">
                <span className="text-2xl font-semibold text-gray-900">{totalAvatars}</span>
                <p className="text-sm text-gray-500 mt-1">Total Avatars</p>
              </div>
              <div className="admin-card bg-white rounded-2xl border border-gray-200 p-6">
                <span className="text-2xl font-semibold text-gray-900">{liveCount}</span>
                <p className="text-sm text-gray-500 mt-1">Live</p>
              </div>
              <div className="admin-card bg-white rounded-2xl border border-gray-200 p-6">
                <span className="text-2xl font-semibold text-gray-900">{publicCount}</span>
                <p className="text-sm text-gray-500 mt-1">Public</p>
              </div>
              <div className="admin-card bg-white rounded-2xl border border-gray-200 p-6">
                <span className="text-2xl font-semibold text-gray-900">{restrictedCount}</span>
                <p className="text-sm text-gray-500 mt-1">Restricted</p>
              </div>
            </div>

            {/* Avatar List */}
            <div className="space-y-4">
              {AVATAR_ENTRIES.map((entry) => (
                <div
                  key={entry.id}
                  className="admin-card bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 transition-colors"
                >
                  {/* Main Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar name={entry.name} size="lg" />
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-semibold text-gray-900">{entry.name}</h3>
                          {/* Live badge */}
                          {entry.status === 'live' && (
                            <span className="live-badge inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Live
                            </span>
                          )}
                          {/* Access badge */}
                          <span className={clsx(
                            "px-2 py-0.5 rounded-full text-[11px] font-medium border",
                            entry.access === 'restricted'
                              ? "access-badge-restricted border-violet-300 text-violet-500"
                              : "access-badge-public border-gray-200 text-gray-500"
                          )}>
                            {entry.access === 'public' ? 'Public' : 'Restricted'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">
                          {entry.role} · {entry.department}
                        </p>
                      </div>
                    </div>

                    {/* Manage button */}
                    <button
                      onClick={() => setManageEntry(entry)}
                      className="admin-manage-btn flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 48 48">
                        <path d={svgPaths.p2a12a600} stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                        <path d={svgPaths.p36f96000} stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
                      </svg>
                      Manage
                    </button>
                  </div>

                  {/* Created date */}
                  <p className="text-xs text-gray-400 mt-2 ml-16">
                    Created {entry.createdDate}
                  </p>

                  {/* Allowed Members — only for restricted, with divider */}
                  {entry.access === 'restricted' && entry.allowedMembers && (
                    <>
                      <div className="admin-divider border-t border-gray-100 mt-4 ml-16" />
                      <div className="mt-4 ml-16">
                        <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2.5">
                          Allowed Members ({entry.allowedMembers.length})
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {entry.allowedMembers.map((member) => (
                            <div
                              key={member}
                              className="member-pill inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-full"
                            >
                              <Avatar name={member} size="sm" className="!w-5 !h-5 !text-[8px]" />
                              <span className="text-xs text-gray-700 font-medium">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manage Modal */}
      <AnimatePresence>
        {manageEntry && (
          <ManageAvatarModal
            isOpen={!!manageEntry}
            onClose={() => setManageEntry(null)}
            entry={manageEntry}
          />
        )}
      </AnimatePresence>
    </>
  );
}