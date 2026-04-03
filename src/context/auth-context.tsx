'use client';

import React, { createContext, useState, useCallback, ReactNode } from 'react';
import type { User, AuthContextType } from '@/lib/types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in real app, call actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email && password) {
        setUser({
          id: '1',
          email,
          name: email.split('@')[0],
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
