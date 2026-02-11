import React from 'react';
import clsx from 'clsx';

export interface AppItem {
  id: string;
  name: string;
  linked: boolean;
  category: string[];
  iconBg: string;
  iconColor: string;
  iconLabel: string;
  email?: string;
  /** 'api-key' = show key-input modal, 'oauth' = show browser-auth modal */
  authType: 'api-key' | 'oauth';
}

interface LinkedToolsListProps {
  apps: AppItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function LinkedToolsList({ apps, selectedId, onSelect }: LinkedToolsListProps) {
  const linkedApps = apps.filter(a => a.linked);

  return (
    <div className="linked-tools-list flex flex-col h-full bg-white border-r border-gray-200 w-[375px] flex-shrink-0">
      {/* Header */}
      <div className="flex-shrink-0 z-20">
        <div className="h-[60px] px-6 flex items-center border-b border-gray-100">
          <h2 className="text-gray-900" style={{ fontSize: '16px', fontWeight: 600, lineHeight: '22px' }}>
            Link
          </h2>
        </div>
      </div>

      {/* Subtitle */}
      <div className="px-6 py-4 pb-2">
        <p className="text-gray-400" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '22px' }}>
          Linked Tools ({linkedApps.length})
        </p>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {linkedApps.map((app, idx) => (
          <div key={app.id}>
            <div
              onClick={() => onSelect(app.id)}
              className={clsx(
                'linked-tool-item flex items-center gap-3 px-6 py-4 cursor-pointer transition-colors',
                selectedId === app.id
                  ? 'linked-tool-item-selected bg-gray-50'
                  : 'hover:bg-gray-50'
              )}
            >
              {/* App Icon */}
              <div className="linked-tool-icon-wrap w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-gray-100 bg-white">
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

              {/* Name + email */}
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 truncate" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '22px' }}>
                  {app.name}
                </p>
                <p className="text-gray-400 truncate mt-0.5" style={{ fontSize: '14px', fontWeight: 400, lineHeight: '21px' }}>
                  {app.email || 'tankatest@tanka.ai'}
                </p>
              </div>
            </div>

            {/* Divider (except last) */}
            {idx < linkedApps.length - 1 && (
              <div className="linked-tool-divider ml-[92px] mr-6 border-b border-gray-100" />
            )}
          </div>
        ))}

        {linkedApps.length === 0 && (
          <div className="p-8 text-center text-gray-400 text-sm">
            No linked tools yet
          </div>
        )}
      </div>
    </div>
  );
}
