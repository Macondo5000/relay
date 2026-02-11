import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ToolsGrid } from './ToolsGrid';
import type { AppItem } from './LinkedToolsList';

interface LinkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppItem[];
  onOpenLinkModal: (id: string) => void;
}

export function LinkDrawer({ isOpen, onClose, apps, onOpenLinkModal }: LinkDrawerProps) {
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-[780px] flex flex-col overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 48px)', minHeight: '400px' }}
            >
              {/* Modal header with close button */}
              <div className="flex items-center justify-between px-10 pt-6 pb-0 flex-shrink-0">
                <h2 className="text-lg font-semibold text-gray-900">Link</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* ToolsGrid */}
              <ToolsGrid
                apps={apps}
                onOpenLinkModal={(id) => {
                  onClose();
                  onOpenLinkModal(id);
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
