import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, AlertCircle } from 'lucide-react';
import { useEditMode } from '../contexts/EditModeContext';
import { useNavigate } from 'react-router-dom';

export default function PasswordPrompt() {
  const { showPasswordPrompt, verifyPassword, cancelPasswordPrompt } = useEditMode();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (showPasswordPrompt && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showPasswordPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    // Redirect to admin login page for proper authentication
    // The old password prompt remains as a fallback for dev.
    if (verifyPassword(password)) {
      // legacy local password worked - do nothing else
      setPassword('');
      setError('');
      return;
    }
    // Otherwise open the Admin login page
    navigate('/admin');
    cancelPasswordPrompt();
  };

  const handleCancel = () => {
    setPassword('');
    setError('');
    cancelPasswordPrompt();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <AnimatePresence>
      {showPasswordPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
          onClick={handleCancel}
          onKeyDown={handleKeyDown}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCancel}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X size={16} className="text-gray-600" />
            </button>

            {/* Content */}
            <div className="space-y-6">
              {/* Icon and Title */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-pap-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Lock size={24} className="text-pap-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-pap-primary mb-2">
                    Admin Authentication
                  </h3>
                  <p className="text-sm text-gray-600">
                    Enter the admin password to enable edit mode
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Password
                  </label>
                  <input
                    ref={inputRef}
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pap-sand focus:border-transparent"
                    placeholder="Enter password"
                    autoComplete="current-password"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-600 text-sm"
                  >
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </motion.div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-pap-primary text-white rounded-xl hover:bg-pap-primary/90 transition-colors font-medium"
                  >
                    Enable Edit Mode
                  </button>
                </div>
              </form>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Contact your administrator if you need access
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
