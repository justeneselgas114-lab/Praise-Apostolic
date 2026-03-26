import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditMode } from '../contexts/EditModeContext';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isEditMode } = useEditMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditMode) {
      navigate('/admin');
    }
  }, [isEditMode, navigate]);

  return <>{isEditMode ? children : null}</>;
}
