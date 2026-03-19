import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditMode } from '../contexts/EditModeContext';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isEditMode } = useEditMode();
  const navigate = useNavigate();
  const isDev = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    if (!isEditMode && !isDev) {
      navigate('/admin');
    }
  }, [isEditMode, isDev, navigate]);

  return <>{isEditMode || isDev ? children : null}</>;
}
