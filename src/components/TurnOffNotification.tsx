import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Power } from 'lucide-react';
import { useEditMode } from '../contexts/EditModeContext';

export default function TurnOffNotification() {
  const { showTurnOffNotification, hideTurnOffNotification } = useEditMode();

  return (
    <AnimatePresence>
      {showTurnOffNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[999] bg-white rounded-xl shadow-lg border border-gray-200 p-4 max-w-sm"
        >
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Power size={18} className="text-gray-600" />
            </div>
            
            {/* Message */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                Edit mode disabled
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                You can re-enable it anytime with the admin password
              </p>
            </div>
            
            {/* Close Button */}
            <button
              onClick={hideTurnOffNotification}
              className="w-6 h-6 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Close notification"
            >
              <X size={14} className="text-gray-400" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
