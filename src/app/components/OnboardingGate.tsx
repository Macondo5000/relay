import React, { useState, useMemo } from 'react';
import { Search, Check } from 'lucide-react';
import clsx from 'clsx';
import { RelayLogo } from './RelayLogo';
import { LinkModal } from './LinkModal';
import type { AppItem } from './LinkedToolsList';

interface OnboardingGateProps {
  apps: AppItem[];
  onToggleLink: (id: string) => void;
  onContinue: () => void;
  userName: string;
}

export function OnboardingGate({ apps, onToggleLink, onContinue, userName }: OnboardingGateProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalAppId, setModalAppId] = useState<string | null>(null);

  const linkedCount = apps.filter(a => a.linked).length;
  const canContinue = linkedCount >= 1;

  const filteredApps = useMemo(() => {
    if (!searchQuery.trim()) return apps;
    const q = searchQuery.toLowerCase();
    return apps.filter(a => a.name.toLowerCase().includes(q));
  }, [apps, searchQuery]);

  const firstName = userName.split(' ')[0];
  const modalApp = modalAppId ? apps.find(a => a.id === modalAppId) || null : null;

  const handleCardClick = (app: AppItem) => {
    if (app.linked) {
      onToggleLink(app.id);
    } else {
      setModalAppId(app.id);
    }
  };

  const handleLinkComplete = (id: string) => {
    onToggleLink(id);
    setModalAppId(null);
  };

  return (
    <div className="onboarding-gate flex w-full h-screen bg-gray-50 overflow-hidden">
      <div className="onboarding-container flex flex-col w-full max-w-[860px] h-full mx-auto">

        {/* ── Step Progress Bar ──────────────────────── */}
        <div className="flex items-center justify-center pt-5 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            {/* Step 1 — previous (gray) */}
            <div className="onboarding-step-prev w-16 h-1 rounded-full bg-gray-300" />
            {/* Step 2 — current (black) */}
            <div className="onboarding-step-current w-16 h-1 rounded-full bg-gray-900" />
          </div>
        </div>

        {/* ── Spacer — push welcome toward vertical center ── */}
        <div className="flex-1 min-h-0 max-h-[60px]" />

        {/* ── Logo + Welcome ────────────────────────── */}
        <div className="flex flex-col items-center pt-2 pb-5 flex-shrink-0">
          <RelayLogo size={44} className="mb-4" />
          <h1
            className="text-gray-900 text-center mb-2"
            style={{ fontSize: '24px', fontWeight: 700, lineHeight: '32px' }}
          >
            Welcome, {firstName}
          </h1>
          <p
            className="text-gray-500 text-center max-w-md"
            style={{ fontSize: '15px', lineHeight: '22px' }}
          >
            Before getting started, please connect at least one app so Relay can
            help with your handover.
          </p>
        </div>

        {/* ── "All Tools (n)" title + search ─────────── */}
        <div className="flex items-center justify-between px-3 pb-3 flex-shrink-0">
          <h2
            className="text-gray-900"
            style={{ fontSize: '16px', fontWeight: 600, lineHeight: '22px' }}
          >
            All Tools
            <span className="text-gray-400 font-normal ml-1">({apps.length})</span>
          </h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="onboarding-search pl-8 pr-3 py-1.5 w-[180px] rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all placeholder:text-gray-400"
              style={{ fontSize: '13px' }}
            />
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────── */}
        <div className="onboarding-divider mx-3 border-t border-gray-200/60" />

        {/* ── App Grid (scrollable, 3 columns, ~2 rows visible) */}
        <div className="flex-1 overflow-y-auto px-3 pt-4 min-h-0">
          {filteredApps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Search className="w-7 h-7 mb-2 opacity-40" />
              <p className="text-sm">No apps found</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2.5">
              {filteredApps.map(app => (
                <div
                  key={app.id}
                  className={clsx(
                    'onboarding-app-card group relative flex flex-col items-center justify-center rounded-2xl py-4 px-2 transition-all cursor-pointer',
                    app.linked
                      ? 'bg-emerald-50/60 ring-1 ring-emerald-200'
                      : 'bg-white ring-1 ring-gray-100 hover:ring-gray-200 hover:shadow-sm'
                  )}
                  onClick={() => handleCardClick(app)}
                >
                  {/* Linked check badge — top-right */}
                  {app.linked && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                  )}

                  {/* Icon */}
                  <div className="onboarding-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center border border-gray-100 bg-white mb-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: app.iconBg }}
                    >
                      <span
                        className="font-bold leading-none"
                        style={{ color: app.iconColor, fontSize: '10px' }}
                      >
                        {app.iconLabel}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <p
                    className="text-gray-900 text-center truncate w-full"
                    style={{ fontSize: '13px', fontWeight: 500, lineHeight: '18px' }}
                  >
                    {app.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Continue Button ────────────────────────── */}
        <div className="flex-shrink-0 pt-4 pb-6 px-3">
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className={clsx(
              'onboarding-continue-btn w-full flex items-center justify-center py-3 rounded-xl text-sm transition-all',
              canContinue
                ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
            style={{ fontWeight: 600 }}
          >
            Continue
          </button>
          {!canContinue && (
            <p className="text-center text-gray-400 text-xs mt-2">
              Connect at least 1 app to continue
            </p>
          )}
        </div>
      </div>

      {/* ── Link Auth Modal ─────────────────────────── */}
      {modalApp && (
        <LinkModal
          app={modalApp}
          onClose={() => setModalAppId(null)}
          onLinked={handleLinkComplete}
        />
      )}
    </div>
  );
}