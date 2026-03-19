import React from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react';

// Toast/Alert Components
export function ErrorAlert({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl bg-red-50 border-l-4 border-red-500 p-4 flex gap-3"
    >
      <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-red-900 text-sm">Error</h3>
        <p className="text-red-700 text-sm mt-0.5">{message}</p>
      </div>
    </motion.div>
  );
}

export function SuccessAlert({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl bg-green-50 border-l-4 border-green-500 p-4 flex gap-3"
    >
      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-green-900 text-sm">Success</h3>
        <p className="text-green-700 text-sm mt-0.5">{message}</p>
      </div>
    </motion.div>
  );
}

export function WarningAlert({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl bg-yellow-50 border-l-4 border-yellow-500 p-4 flex gap-3"
    >
      <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-yellow-900 text-sm">Warning</h3>
        <p className="text-yellow-700 text-sm mt-0.5">{message}</p>
      </div>
    </motion.div>
  );
}

export function InfoAlert({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-xl bg-blue-50 border-l-4 border-blue-500 p-4 flex gap-3"
    >
      <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
      <div>
        <h3 className="font-semibold text-blue-900 text-sm">Info</h3>
        <p className="text-blue-700 text-sm mt-0.5">{message}</p>
      </div>
    </motion.div>
  );
}

// Loading Skeleton
export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl bg-gray-200 h-20 animate-pulse" />
      ))}
    </div>
  );
}

// Smooth transitions for list items
export const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// Form section variants
export const formSectionVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

// Button styling utilities
export function PrimaryButton({
  children,
  disabled = false,
  loading = false,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl bg-gradient-to-r from-pap-primary to-pap-primary/90 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm ${className}`}
    >
      {loading ? 'Loading...' : children}
    </motion.button>
  );
}

export function SecondaryButton({
  children,
  disabled = false,
  loading = false,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-800 font-semibold hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm ${className}`}
    >
      {loading ? 'Loading...' : children}
    </motion.button>
  );
}

export function DangerButton({
  children,
  disabled = false,
  loading = false,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      disabled={disabled || loading}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm ${className}`}
    >
      {loading ? 'Loading...' : children}
    </motion.button>
  );
}
