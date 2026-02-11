import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { RelayLogo } from './RelayLogo';

interface LoginPageProps {
  onLogin: (userId: string) => void;
}

interface Account {
  id: string;
  initials: string;
  name: string;
  tag: string;
  tagColor: string;
  description: string;
  avatarBg: string;
  avatarText: string;
}

const ACCOUNTS: Account[] = [
  {
    id: 'shawn',
    initials: 'SG',
    name: 'Shawn Guo',
    tag: 'Departing',
    tagColor: 'bg-gray-100 text-gray-600',
    description: 'Tanka, Product Manager · Product',
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-700',
  },
  {
    id: 'koko',
    initials: 'KL',
    name: 'Koko Lv',
    tag: 'Active',
    tagColor: 'bg-gray-100 text-gray-600',
    description: 'Tanka, VP of Design · Design',
    avatarBg: 'bg-violet-100',
    avatarText: 'text-violet-700',
  },
  {
    id: 'cody',
    initials: 'CS',
    name: 'Cody Song',
    tag: 'Admin',
    tagColor: 'bg-gray-100 text-gray-600',
    description: 'Director of Compensation and Incentives · People Ops',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-700',
  },
];

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center font-sans"
      style={{
        backgroundColor: '#f7f8f8',
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Centered content wrapper */}
      <div className="flex flex-col items-center w-full max-w-[560px] px-6">
        {/* Logo + Brand */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <RelayLogo size={44} />
            <span className="text-[28px] font-bold text-gray-900 tracking-tight">Relay</span>
          </div>
          <p className="text-[15px] text-gray-500" style={{ fontWeight: 400 }}>AI-Powered Knowledge Transfer</p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
          className="w-full bg-white rounded-2xl border border-gray-200/70 overflow-hidden"
        >
          {/* Account list */}
          <div className="px-3 py-4">
            {ACCOUNTS.map((account, idx) => (
              <div key={account.id}>
                <motion.button
                  onClick={() => onLogin(account.id)}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                  whileTap={{ scale: 0.995 }}
                  className="w-full flex items-center gap-4 px-3 py-4 rounded-xl transition-colors text-left group cursor-pointer"
                >
                  {/* Avatar */}
                  <div className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                    account.avatarBg,
                    account.avatarText
                  )}>
                    {account.initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-[15px]">{account.name}</span>
                      <span className={clsx(
                        "px-2 py-0.5 rounded-full text-[11px] font-medium shrink-0",
                        account.tagColor
                      )}>
                        {account.tag}
                      </span>
                    </div>
                    <p className="text-[13px] text-gray-400 mt-0.5 whitespace-nowrap" style={{ fontWeight: 400 }}>{account.description}</p>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-400 transition-colors flex-shrink-0" />
                </motion.button>
                {idx < ACCOUNTS.length - 1 && (
                  <div className="mx-3 border-t border-gray-50" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer text — 20px below card, same font size as "Select your account" */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-[15px] text-gray-400 text-center mt-5"
          style={{ fontWeight: 400 }}
        >
          Demo mode · Select any user to explore Relay
        </motion.p>
      </div>
    </div>
  );
}