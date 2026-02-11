import React from 'react';
import { ToolsGrid } from './ToolsGrid';
import type { AppItem } from './LinkedToolsList';

// ── Props ─────────────────────────────────────────────────────
interface LinkAppsProps {
  apps: AppItem[];
  selectedId: string | null;
  onToggleLink: (id: string) => void;
  onOpenLinkModal: (id: string) => void;
}

// ── Component ─────────────────────────────────────────────────
export function LinkApps({ apps, onOpenLinkModal }: LinkAppsProps) {
  return (
    <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-gray-50">
      <ToolsGrid apps={apps} onOpenLinkModal={onOpenLinkModal} />
    </div>
  );
}
