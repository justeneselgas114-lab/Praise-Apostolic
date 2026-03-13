import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EditModeContextType {
  isEditMode: boolean;
  showPasswordPrompt: boolean;
  showTurnOffNotification: boolean;
  toggleEditMode: () => void;
  setEditMode: (enabled: boolean) => void;
  verifyPassword: (password: string) => boolean;
  cancelPasswordPrompt: () => void;
  hideTurnOffNotification: () => void;
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [showTurnOffNotification, setShowTurnOffNotification] = useState(false);
  
  // Default password - in production, this should be stored securely
  const ADMIN_PASSWORD = 'papadmin123';

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
      // If enabling edit mode, show password prompt
      setShowPasswordPrompt(true);
    }
  };

  const setEditMode = (enabled: boolean) => {
    setIsEditMode(enabled);
  };

  const verifyPassword = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsEditMode(true);
      setShowPasswordPrompt(false);
      return true;
    }
    return false;
  };

  const cancelPasswordPrompt = () => {
    setShowPasswordPrompt(false);
  };

  const hideTurnOffNotification = () => {
    setShowTurnOffNotification(false);
  };

  const value: EditModeContextType = {
    isEditMode,
    showPasswordPrompt,
    showTurnOffNotification,
    toggleEditMode,
    setEditMode,
    verifyPassword,
    cancelPasswordPrompt,
    hideTurnOffNotification
  };

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
}
