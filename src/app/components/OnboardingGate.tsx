import React, { useState } from 'react';
import clsx from 'clsx';
import { RelayLogo } from './RelayLogo';
import { LinkModal } from './LinkModal';
import { ToolsGrid } from './ToolsGrid';
import type { AppItem } from './LinkedToolsList';

interface OnboardingGateProps {
  apps: AppItem[];
  onToggleLink: (id: string) => void;
  onContinue: () => void;
  userName: string;
}

export function OnboardingGate({ apps, onToggleLink, onContinue, userName }: OnboardingGateProps) {
  const [modalAppId, setModalAppId] = useState<string | null>(null);

  const linkedCount = apps.filter(a => a.linked).length;
  const canContinue = linkedCount >= 1;

  const firstName = userName.split(' ')[0];
  const modalApp = modalAppId ? apps.find(a => a.id === modalAppId) || null : null;

  const handleOpenLinkModal = (id: string) => {
    const app = apps.find(a => a.id === id);
    if (!app || app.linked) return;
    setModalAppId(id);
  };

  const handleLinkComplete = (id: string) => {
    onToggleLink(id);
    setModalAppId(null);
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 overflow-hidden">
      {/* ── Top Bar: Logo + Welcome + Continue ── */}
      <div className="flex-shrink-0 flex items-center justify-between px-10 py-6 border-b border-gray-200/60">
        <div className="flex items-center gap-4">
          <RelayLogo size={36} />
          <div>
            <h1
              className="text-gray-900"
              style={{ fontSize: '18px', fontWeight: 700, lineHeight: '24px' }}
            >
              Welcome, {firstName}
            </h1>
            <p
              className="text-gray-400 mt-0.5"
              style={{ fontSize: '13px', lineHeight: '18px' }}
            >
              Before starting the offboarding process, please complete the connection of your relevant data sources.
            </p>
          </div>
        </div>

        <button
          onClick={onContinue}
          disabled={!canContinue}
          className={clsx(
            'flex-shrink-0 px-6 py-2.5 rounded-xl text-sm transition-all',
            canContinue
              ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          )}
          style={{ fontWeight: 600 }}
        >
          Continue
        </button>
      </div>

      {/* ── Tools Grid (takes full remaining space) ── */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <ToolsGrid
          apps={apps}
          onOpenLinkModal={handleOpenLinkModal}
          centered
        />
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
