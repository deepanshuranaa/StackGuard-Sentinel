'use client';

import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react';
import type { User, AuthContextType } from '@/lib/types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CREDENTIALS_KEY = 'sg_credentials';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore credentials from session storage on mount
  useEffect(() => {
    try {
      const storedCredentials = sessionStorage.getItem(CREDENTIALS_KEY);
      if (storedCredentials) {
        const credentials = JSON.parse(storedCredentials);
        setUser(credentials);
      }
    } catch (error) {
      console.error('Failed to restore credentials from session storage:', error);
      sessionStorage.removeItem(CREDENTIALS_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in real app, call actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (email && password) {
        const newUser = {
          id: '1',
          email,
          name: email.split('@')[0],
        };
        setUser(newUser);
        // Store credentials in session storage
        sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify(newUser));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Clear credentials from session storage
    sessionStorage.removeItem(CREDENTIALS_KEY);
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
