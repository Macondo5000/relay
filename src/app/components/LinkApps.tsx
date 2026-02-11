import React, { useState, useMemo } from 'react';
import { Search, Link2, Unlink2 } from 'lucide-react';
import clsx from 'clsx';
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

// ── Props ─────────────────────────────────────────────────────
interface LinkAppsProps {
  apps: AppItem[];
  selectedId: string | null;
  onToggleLink: (id: string) => void;
  onOpenLinkModal: (id: string) => void;
}

// ── Component ─────────────────────────────────────────────────
export function LinkApps({ apps, selectedId, onToggleLink, onOpenLinkModal }: LinkAppsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Featured');

  const filteredApps = useMemo(() => {
    let result = apps;
    // Filter by category
    result = result.filter(a => a.category.includes(activeCategory));
    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(q));
    }
    return result;
  }, [apps, activeCategory, searchQuery]);

  const totalCount = apps.length;

  return (
    <div className="link-apps-page flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-gray-50">
      {/* ── Header ──────────────────────────────────────── */}
      <div className="link-apps-header px-16 pt-8 pb-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-gray-900 tracking-tight" style={{ fontSize: '20px', fontWeight: 600, lineHeight: '28px' }}>
            All Tools<span className="text-gray-400 font-normal ml-1">({totalCount})</span>
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="link-search-input pl-9 pr-4 py-2 w-[220px] rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* ── Category Tabs ─────────────────────────────── */}
        <div className="flex flex-wrap gap-3 pb-6">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={clsx(
                  'link-tab px-3 py-1.5 rounded-full text-xs transition-all whitespace-nowrap border',
                  isActive
                    ? 'link-tab-active bg-blue-50 text-blue-600 border-blue-100'
                    : 'bg-gray-100/70 text-gray-500 border-transparent hover:bg-gray-200/60'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Divider ─────────────────────────────────────── */}
      <div className="link-divider border-t border-gray-200/50" />

      {/* ── App Grid ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-16 py-6">
        {filteredApps.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-8 h-8 mb-3 opacity-50" />
            <p className="text-sm">No tools found for "{searchQuery || activeCategory}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {filteredApps.map(app => {
              const isSelected = selectedId === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => !app.linked && onOpenLinkModal(app.id)}
                  className={clsx(
                    'link-app-card flex items-center gap-3 rounded-2xl px-6 py-4 transition-all',
                    isSelected
                      ? 'ring-2 ring-blue-400/40 shadow-sm'
                      : 'hover:shadow-sm',
                    !app.linked && 'cursor-pointer'
                  )}
                  style={{ background: 'rgba(15,41,77,0.03)' }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-100 bg-white">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: app.iconBg }}
                    >
                      <span
                        className="font-bold text-xs leading-none"
                        style={{ color: app.iconColor }}
                      >
                        {app.iconLabel}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 truncate" style={{ fontSize: '15px', fontWeight: 600, lineHeight: '22px' }}>
                      {app.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      {app.linked ? (
                        <>
                          <Link2 className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2.2} />
                          <span className="text-xs text-gray-400">Linked</span>
                        </>
                      ) : (
                        <>
                          <Unlink2 className="w-3.5 h-3.5 text-gray-400" strokeWidth={2.2} />
                          <span className="text-xs text-gray-400">Unlinked</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}