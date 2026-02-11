import React, { useState, useRef } from 'react';
import { Plus, X, Link, UserPlus, Check, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import { Avatar } from './Avatar';

// All active (non-departing, non-admin) employees across all handover groups
interface ActiveEmployee {
  id: string;
  name: string;
  role: string;
  department: string;
}

const ACTIVE_EMPLOYEES: ActiveEmployee[] = [
  { id: 'koko', name: 'Koko Lv', role: 'VP of Design', department: 'Design' },
  { id: 'mike', name: 'Mike Li', role: 'VP of Product', department: 'Product' },
  { id: 'jordan', name: 'Jordan Wu', role: 'Tech Lead', department: 'Engineering' },
  { id: 'rachel', name: 'Rachel Lin', role: 'Marketing Director', department: 'Marketing' },
  { id: 'tom', name: 'Tom Chen', role: 'Brand Manager', department: 'Marketing' },
  { id: 'amy-z', name: 'Amy Zhang', role: 'Content Lead', department: 'Marketing' },
  { id: 'kevin', name: 'Kevin Wang', role: 'Sales Director', department: 'Sales' },
];

// Generate a mock invite code
function generateInviteCode() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// Date input — same visual style as text inputs, with calendar icon on right
function DateInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  const dateRef = useRef<HTMLInputElement>(null);

  const formattedValue = value
    ? new Date(value + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
    : '';

  return (
    <div className="relative">
      <input
        ref={dateRef}
        type="date"
        lang="en"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
      />
      <div
        className={clsx(
          "modal-input w-full px-4 py-3 rounded-xl border text-sm transition-all flex items-center justify-between",
          value
            ? "border-gray-200 text-gray-900 bg-gray-50/50"
            : "border-gray-200 text-gray-300 bg-gray-50/50"
        )}
      >
        <span>{formattedValue || placeholder}</span>
        <Calendar className="modal-input-icon w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
}

// Avatar stack for offboarding cards — show ALL avatars, rightmost on top, then "X members" text
function AvatarStack({ names }: { names: string[] }) {
  const total = names.length;
  return (
    <div className="flex items-center">
      {names.map((name, i) => (
        <div
          key={name}
          className="relative"
          style={{ marginLeft: i === 0 ? 0 : -5, zIndex: i + 1 }}
        >
          <Avatar name={name} size="sm" className="avatar-stack-ring !w-5 !h-5 !text-[8px] ring-[1.5px] ring-white" />
        </div>
      ))}
      <span className="text-[11px] text-gray-400 ml-2">{total} members</span>
    </div>
  );
}

// Calculate days until last day — returns null if > 30 days
function getDaysLeftInfo(lastDay: string): { label: string; urgent: boolean } | null {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(lastDay + 'T00:00:00');
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { label: 'Overdue', urgent: true };
  if (diff === 0) return { label: 'Last day today', urgent: true };
  if (diff > 30) return null;
  return { label: `${diff} days left`, urgent: diff < 5 };
}

// Modal Component
function InitiateOffboardingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'invite' | 'existing'>('invite');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Invite via Link form
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLastDay, setInviteLastDay] = useState('');

  // Existing user form
  const [existingLastDay, setExistingLastDay] = useState('');

  // Success state
  const [successState, setSuccessState] = useState<{
    type: 'invite' | 'existing';
    name: string;
    link: string;
  } | null>(null);

  // Any field filled → button highlights
  const isInviteActive = !!(inviteName.trim() || inviteEmail.trim() || inviteLastDay);
  const isExistingActive = selectedUserId !== null || !!existingLastDay;

  const handleGenerateInvite = () => {
    if (!isInviteActive) return;
    const code = generateInviteCode();
    setSuccessState({
      type: 'invite',
      name: inviteName.trim() || 'the employee',
      link: `https://relay.app/invite/offboard-${code}`,
    });
  };

  const handleStartOffboarding = () => {
    if (!isExistingActive) return;
    const user = ACTIVE_EMPLOYEES.find(u => u.id === selectedUserId);
    const code = generateInviteCode();
    setSuccessState({
      type: 'existing',
      name: user?.name || 'the employee',
      link: `https://relay.app/invite/offboard-${code}`,
    });
  };

  const handleDone = () => {
    onClose();
    setTimeout(() => {
      setSuccessState(null);
      setInviteName('');
      setInviteEmail('');
      setInviteLastDay('');
      setExistingLastDay('');
      setSelectedUserId(null);
      setActiveTab('invite');
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={handleDone} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={e => e.stopPropagation()}
        className="admin-modal-bg bg-white rounded-2xl w-full max-w-[480px] shadow-2xl overflow-hidden font-sans relative z-10"
      >
        {/* Header */}
        <div className="px-8 pt-7 pb-0">
          <div className="flex items-start justify-between mb-1">
            <h2 className="admin-modal-title text-xl font-bold text-gray-900">Initiate Offboarding</h2>
            <button onClick={handleDone} className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 -mt-0.5 -mr-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-6">Select an employee and start the AI-guided offboarding process.</p>
        </div>

        {/* Success state */}
        {successState ? (
          <div className="px-8 pb-7">
            <div className="flex flex-col items-center pt-2 pb-2">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                <Check className="w-7 h-7 text-emerald-500" strokeWidth={2.5} />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                {successState.type === 'invite' ? 'Invite Link Generated' : 'Offboarding Started'}
              </h3>
              <p className="text-sm text-gray-500 text-center mb-5">
                Share this link with {successState.name} to join the offboarding workspace.
              </p>
              <div className="w-full bg-gray-100 rounded-xl px-5 py-4 text-center mb-5">
                <span className="text-sm text-gray-700 font-mono select-all">{successState.link}</span>
              </div>
              <button
                onClick={handleDone}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Switch Tabs — no spring bounce */}
            <div className="px-8 pb-5">
              <div className="modal-switch-track relative flex bg-gray-100 rounded-xl p-1">
                <motion.div
                  layout
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="modal-switch-indicator absolute top-1 bottom-1 rounded-lg bg-white shadow-sm"
                  style={{
                    width: 'calc(50% - 4px)',
                    left: activeTab === 'invite' ? 4 : 'calc(50% + 0px)',
                  }}
                />
                <button
                  onClick={() => setActiveTab('invite')}
                  className={clsx(
                    "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                    activeTab === 'invite' ? "modal-switch-active text-gray-900" : "text-gray-400"
                  )}
                >
                  <Link className="w-3.5 h-3.5" />
                  Invite via Link
                </button>
                <button
                  onClick={() => setActiveTab('existing')}
                  className={clsx(
                    "relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                    activeTab === 'existing' ? "modal-switch-active text-gray-900" : "text-gray-400"
                  )}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Add Existing User
                </button>
              </div>
            </div>

            {/* Tab Content — smooth vertical fade, no bounce */}
            <div className="px-8 pb-7 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {activeTab === 'invite' ? (
                  <motion.div
                    key="invite"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="space-y-5"
                  >
                    <p className="text-xs text-gray-400">Generate an invite link for an employee who hasn't joined Relay yet.</p>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Employee Name</label>
                      <input
                        type="text"
                        placeholder="e.g., John Smith"
                        value={inviteName}
                        onChange={e => setInviteName(e.target.value)}
                        className="modal-input w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all placeholder:text-gray-300 bg-gray-50/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Email</label>
                      <input
                        type="email"
                        placeholder="employee@company.com"
                        value={inviteEmail}
                        onChange={e => setInviteEmail(e.target.value)}
                        className="modal-input w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all placeholder:text-gray-300 bg-gray-50/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Last Working Day</label>
                      <DateInput
                        value={inviteLastDay}
                        onChange={setInviteLastDay}
                        placeholder="Select date"
                      />
                    </div>

                    <button
                      onClick={handleGenerateInvite}
                      disabled={!isInviteActive}
                      className={clsx(
                        "w-full py-3 rounded-xl text-sm font-semibold transition-all",
                        isInviteActive
                          ? "modal-btn-active bg-gray-900 text-white hover:bg-gray-800"
                          : "modal-btn-inactive bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      Generate Invite Link
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="existing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="space-y-5"
                  >
                    <p className="text-xs text-gray-400">Select an employee already registered in Relay:</p>

                    {/* User list inside a card */}
                    <div className="modal-list-container border border-gray-200 rounded-xl overflow-hidden">
                      <div className="modal-list-divider max-h-[240px] overflow-y-auto divide-y divide-gray-100">
                        {ACTIVE_EMPLOYEES.map(user => {
                          const isSelected = selectedUserId === user.id;
                          return (
                            <button
                              key={user.id}
                              onClick={() => setSelectedUserId(isSelected ? null : user.id)}
                              className={clsx(
                                "modal-list-item w-full flex items-center gap-3 px-4 py-3 transition-colors text-left",
                                isSelected ? "modal-list-item-selected bg-gray-50" : "hover:bg-gray-50/50"
                              )}
                            >
                              <Avatar name={user.name} size="sm" className="!w-9 !h-9 !text-xs" />
                              <div className="flex-1 min-w-0">
                                <span className="font-semibold text-gray-900 text-sm block">{user.name}</span>
                                <span className="text-xs text-gray-400">{user.role} · {user.department}</span>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-gray-500 flex-shrink-0" strokeWidth={2.5} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-900">Last Working Day</label>
                      <DateInput
                        value={existingLastDay}
                        onChange={setExistingLastDay}
                        placeholder="Select date"
                      />
                    </div>

                    <button
                      onClick={handleStartOffboarding}
                      disabled={!isExistingActive}
                      className={clsx(
                        "w-full py-3 rounded-xl text-sm font-semibold transition-all",
                        isExistingActive
                          ? "modal-btn-active bg-gray-900 text-white hover:bg-gray-800"
                          : "modal-btn-inactive bg-gray-100 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      Start Offboarding
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// Offboarding data — 1:1 mapped with Handover groups
interface OffboardingCard {
  id: string;
  name: string;
  role: string;
  department: string;
  members: string[];
  progress: number;
  lastDay: string; // YYYY-MM-DD
}

const OFFBOARDING_CARDS: OffboardingCard[] = [
  {
    id: '1',
    name: 'Shawn Guo',
    role: 'Product Manager',
    department: 'Product',
    members: ['Shawn Guo', 'Koko Lv', 'Cody Song'],
    progress: 75,
    lastDay: '2026-02-12',
  },
  {
    id: '2',
    name: 'Lisa Park',
    role: 'Engineering',
    department: 'Engineering',
    members: ['Lisa Park', 'Mike Li', 'Jordan Wu', 'Cody Song'],
    progress: 50,
    lastDay: '2026-02-20',
  },
  {
    id: '3',
    name: 'James Wu',
    role: 'Marketing',
    department: 'Marketing',
    members: ['James Wu', 'Rachel Lin', 'Tom Chen', 'Amy Zhang', 'Cody Song'],
    progress: 25,
    lastDay: '2026-03-01',
  },
  {
    id: '4',
    name: 'Nina Chen',
    role: 'Sales',
    department: 'Sales',
    members: ['Nina Chen', 'Kevin Wang', 'Cody Song'],
    progress: 10,
    lastDay: '2026-03-06',
  },
];

export function AdminConsole() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeCount = OFFBOARDING_CARDS.length;
  const completedCount = 5;

  return (
    <>
      <div className="admin-page-bg flex-1 h-full bg-gray-50 flex flex-col font-sans relative min-w-0">
        {/* Header */}
        <div className="admin-header border-b border-gray-100 flex-shrink-0">
          <div className="h-[72px] max-w-5xl mx-auto px-8 w-full flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-medium text-gray-900 text-lg leading-tight">Offboarding Management</h1>
              <p className="text-xs text-gray-400 mt-0.5">Initiate and manage employee offboarding processes</p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="admin-action-btn flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Offboarding
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto py-8">
          <div className="max-w-5xl mx-auto px-8 w-full">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="admin-card bg-white rounded-2xl border border-gray-200 p-6">
                <span className="text-2xl font-semibold text-gray-900">{activeCount}</span>
                <p className="text-sm text-gray-500 mt-1">Active Transitions</p>
              </div>
              <div className="admin-card bg-white rounded-2xl border border-gray-200 p-6">
                <span className="text-2xl font-semibold text-gray-900">{completedCount}</span>
                <p className="text-sm text-gray-500 mt-1">Completed</p>
              </div>
            </div>

            {/* Section Header */}
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
              Active Offboardings ({activeCount})
            </h2>

            {/* Offboarding Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {OFFBOARDING_CARDS.map((card) => {
                const daysInfo = getDaysLeftInfo(card.lastDay);
                return (
                  <div key={card.id} className="admin-card bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 transition-colors cursor-pointer">
                    {/* Top Row: Avatar + Info + Tags */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={card.name} size="md" />
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{card.name}</h3>
                          <p className="text-xs text-gray-400 mt-0.5">{card.role} · {card.department}</p>
                        </div>
                      </div>
                      {daysInfo && (
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[10px] font-bold tracking-wide flex-shrink-0",
                            daysInfo.urgent ? "days-left-tag-urgent bg-amber-50 text-amber-600" : "days-left-tag bg-gray-100 text-gray-500"
                          )}
                        >
                          {daysInfo.label}
                        </span>
                      )}
                    </div>

                    {/* Bottom Row: Member avatars + Progress */}
                    <div className="flex items-center justify-between">
                      <AvatarStack names={card.members} />
                      
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-black rounded-full" style={{ width: `${card.progress}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-500">{card.progress}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <InitiateOffboardingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}