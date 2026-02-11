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
    <div className="flex w-full h-screen bg-gray-50 overflow-hidden">
      <div className="flex flex-col w-full max-w-[900px] h-full mx-auto">

        {/* ── Step Progress Bar ──────────────────────── */}
        <div className="flex items-center justify-center pt-5 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-16 h-1 rounded-full bg-gray-300" />
            <div className="w-16 h-1 rounded-full bg-gray-900" />
          </div>
        </div>

        {/* ── Spacer ── */}
        <div className="flex-1 min-h-0 max-h-[40px]" />

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

        {/* ── Tools Grid (reusing shared component) ── */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ToolsGrid
            apps={apps}
            onOpenLinkModal={handleOpenLinkModal}
          />
        </div>

        {/* ── Continue Button ────────────────────────── */}
        <div className="flex-shrink-0 pt-4 pb-6 px-10">
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className={clsx(
              'w-full flex items-center justify-center py-3 rounded-xl text-sm transition-all',
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
