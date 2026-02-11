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
            className="fixed inset-0 bg-black/5 z-40 backdrop-blur-[1px]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[520px] bg-white shadow-2xl z-50 border-l border-gray-100 flex flex-col"
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ToolsGrid (compact) */}
            <ToolsGrid
              apps={apps}
              onOpenLinkModal={(id) => {
                onClose();
                onOpenLinkModal(id);
              }}
              compact
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
