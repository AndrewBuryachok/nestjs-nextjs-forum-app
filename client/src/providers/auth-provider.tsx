'use client';

import { createContext, useContext } from 'react';
import { BaseUser } from '@/features/users/types';

type AuthContextType = {
  user: BaseUser | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

type Props = AuthContextType & {
  children: React.ReactNode;
};

export function AuthProvider(props: Props) {
  return (
    <AuthContext.Provider value={{ user: props.user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a AuthProvider');
  }
  return context;
}
