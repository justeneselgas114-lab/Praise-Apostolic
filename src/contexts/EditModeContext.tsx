import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  showPasswordPrompt: boolean;
  showTurnOffNotification: boolean;
  toggleEditMode: () => void;
  setEditMode: (enabled: boolean) => void;
  verifyPassword: (password: string) => boolean;
  cancelPasswordPrompt: () => void;
  hideTurnOffNotification: () => void;
  loginWithToken: (token: string) => void;
  logout: () => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider');
  }
  return context;
}

interface EditModeProviderProps {
  children: ReactNode;
}

export function EditModeProvider({ children }: EditModeProviderProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    try {
      return Boolean(localStorage.getItem('pap_admin_token'));
    } catch {
      return false;
    }
  });
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showTurnOffNotification, setShowTurnOffNotification] = useState(false);
  
  const toggleEditMode = () => {
    if (isEditMode) {
      // If already in edit mode, turn it off and show notification
      setIsEditMode(false);
      setShowTurnOffNotification(true);
      
      // Auto-hide notification after 3 seconds
      setTimeout(() => {
        setShowTurnOffNotification(false);
      }, 3000);
    } else {
      // If enabling edit mode, prompt user to sign in via Admin Login
      setShowPasswordPrompt(true);
    }
  };

  const setEditMode = (enabled: boolean) => {
    setIsEditMode(enabled);
  };

  const verifyPassword = (_password: string): boolean => {
    // Password verification is handled via the backend JWT auth flow.
    // Use the /admin login page to authenticate.
    return false;
  };

  const cancelPasswordPrompt = () => {
    setShowPasswordPrompt(false);
  };

  const hideTurnOffNotification = () => {
    setShowTurnOffNotification(false);
  };

  const loginWithToken = (token: string) => {
    try {
      localStorage.setItem('pap_admin_token', token);
    } catch {}
    setIsEditMode(true);
    setShowPasswordPrompt(false);
  };

  const logout = () => {
    try {
      localStorage.removeItem('pap_admin_token');
    } catch {}
    setIsEditMode(false);
  };

  // Keep in sync with storage changes (another tab or manual removal)
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'pap_admin_token') {
        setIsEditMode(Boolean(e.newValue));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const value: EditModeContextType = {
    isEditMode,
    showPasswordPrompt,
    showTurnOffNotification,
    toggleEditMode,
    setEditMode,
    verifyPassword,
    cancelPasswordPrompt,
    hideTurnOffNotification
    ,loginWithToken,
    logout
  };

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
}
