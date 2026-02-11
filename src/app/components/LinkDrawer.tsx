import React, { useState, useMemo } from 'react';
import { X, Search, Link2, Unlink2 } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'motion/react';
import type { AppItem } from './LinkedToolsList';

// ── Category definitions ──────────────────────────────────────
const CATEGORIES = [
  'Featured',
  'Files & Docs',
  'Emails & Messengers',
  'Calendars',
  'Meeting',
  'AI Models',
  'Data & Analytics',
  'Tanka Official',
  'Others',
] as const;

type Category = (typeof CATEGORIES)[number];

interface LinkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onOpenLinkModal: (id: string) => void;
}

export function LinkDrawer({ isOpen, onClose, apps, onOpenLinkModal }: LinkDrawerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Featured');

  const filteredApps = useMemo(() => {
    let result = apps;
    result = result.filter(a => a.category.includes(activeCategory));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(q));
    }
    return result;
  }, [apps, activeCategory, searchQuery]);

  const totalCount = apps.length;

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
            className="fixed right-0 top-0 bottom-0 w-[560px] bg-white shadow-2xl z-50 border-l border-gray-100 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="font-medium text-lg text-gray-900">
                  All Tools<span className="text-gray-400 font-normal ml-1">({totalCount})</span>
                </h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 w-[180px] rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Category Tabs */}
            <div className="px-6 pt-4 pb-3">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={clsx(
                        'px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap border',
                        isActive
                          ? 'bg-blue-50 text-blue-600 border-blue-100'
                          : 'bg-gray-100/70 text-gray-500 border-transparent hover:bg-gray-200/60'
                      )}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200/50" />

            {/* App Grid */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {filteredApps.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <Search className="w-8 h-8 mb-3 opacity-50" />
                  <p className="text-sm">No tools found for "{searchQuery || activeCategory}"</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => !app.linked && onOpenLinkModal(app.id)}
                      className={clsx(
                        'flex items-center gap-3 rounded-2xl px-4 py-3 transition-all',
                        !app.linked && 'cursor-pointer hover:shadow-sm'
                      )}
                      style={{ background: 'rgba(15,41,77,0.03)' }}
                    >
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100 bg-white">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: app.iconBg }}
                        >
                          <span
                            className="font-bold text-[10px] leading-none"
                            style={{ color: app.iconColor }}
                          >
                            {app.iconLabel}
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 truncate text-sm font-semibold">
                          {app.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {app.linked ? (
                            <>
                              <Link2 className="w-3 h-3 text-emerald-500" strokeWidth={2.2} />
                              <span className="text-[11px] text-gray-400">Linked</span>
                            </>
                          ) : (
                            <>
                              <Unlink2 className="w-3 h-3 text-gray-400" strokeWidth={2.2} />
                              <span className="text-[11px] text-gray-400">Unlinked</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
