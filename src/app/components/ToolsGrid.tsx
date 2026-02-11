import React, { useState, useMemo } from 'react';
import { Search, Link2, Unlink2 } from 'lucide-react';
import clsx from 'clsx';
import type { AppItem } from './LinkedToolsList';

// ── Category definitions (matching Tanka) ─────────────────────
const CATEGORIES = [
  'Featured',
  'Files & Docs',
  'Email & Messengers',
  'Calendars',
  'Meeting & Voice',
  'Project & Task',
  'Customer & Growth',
  'Data & Analytics',
  'Design & Creative',
  'AI Models',
] as const;

type Category = (typeof CATEGORIES)[number];

// ── Props ─────────────────────────────────────────────────────
interface ToolsGridProps {
  apps: AppItem[];
  onOpenLinkModal: (id: string) => void;
  /** Compact mode for drawers / embedded usage */
  compact?: boolean;
  /** Center content with max-width (for full-screen pages like OnboardingGate) */
  centered?: boolean;
}

// ── Component ─────────────────────────────────────────────────
export function ToolsGrid({ apps, onOpenLinkModal, compact = false, centered = false }: ToolsGridProps) {
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
  const wrapCls = centered ? "max-w-[960px] w-full mx-auto" : "";

  return (
    <div className="flex flex-col h-full min-w-0 overflow-hidden">
      {/* ── Header ──────────────────────────────────────── */}
      <div className={clsx(compact ? "px-6 pt-5 pb-0" : "px-10 pt-8 pb-0")}>
        <div className={wrapCls}>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-gray-900 tracking-tight" style={{ fontSize: compact ? '18px' : '20px', fontWeight: 600, lineHeight: '28px' }}>
              All Tools<span className="text-gray-400 font-normal ml-1.5">({totalCount})</span>
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={clsx(
                  "pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-400",
                  compact ? "w-[160px]" : "w-[220px]"
                )}
              />
            </div>
          </div>

          {/* ── Category Tabs ─────────────────────────────── */}
          <div className="flex flex-wrap gap-2.5 pb-5">
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
      </div>

      {/* ── Divider ─────────────────────────────────────── */}
      <div className="border-t border-gray-200/50" />

      {/* ── App Grid ────────────────────────────────────── */}
      <div className={clsx("flex-1 overflow-y-auto py-5", compact ? "px-6" : "px-10")}>
        <div className={wrapCls}>
          {filteredApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Search className="w-8 h-8 mb-3 opacity-50" />
              <p className="text-sm">No tools found for "{searchQuery || activeCategory}"</p>
            </div>
          ) : (
            <div className={clsx("grid gap-4", compact ? "grid-cols-1" : "grid-cols-2")}>
              {filteredApps.map(app => (
                <div
                  key={app.id}
                  className="flex items-center gap-3.5 rounded-2xl px-5 py-4 transition-all"
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

                  {/* Action Button */}
                  {!app.linked ? (
                    <button
                      onClick={() => onOpenLinkModal(app.id)}
                      className="flex-shrink-0 px-4 py-1.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                      Link
                    </button>
                  ) : (
                    <button
                      className="flex-shrink-0 px-4 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-400 cursor-default"
                    >
                      View
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
