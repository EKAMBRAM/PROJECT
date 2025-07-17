import React from 'react';

interface AnimatePresenceProps {
  children: React.ReactNode;
  mode?: 'wait' | 'sync';
}

export const AnimatePresence: React.FC<AnimatePresenceProps> = ({ 
  children, 
  mode = 'sync' 
}) => {
  return <>{children}</>;
};