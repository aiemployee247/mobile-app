import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import * as authStorage from './authStorage';
import { ProfileUpdate, UserAccount } from './types';

type AuthContextValue = {
  user: UserAccount | null;
  isReady: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  signUp: (
    name: string,
    email: string,
    password: string
  ) => Promise<string | null>;
  updateProfile: (update: ProfileUpdate) => Promise<string | null>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const current = await authStorage.getCurrentUser();
      if (mounted) {
        setUser(current);
        setIsReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authStorage.login(email, password);
    if (!result.ok) return result.message;
    setUser(result.user);
    return null;
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const result = await authStorage.signUp(name, email, password);
      if (!result.ok) return result.message;
      setUser(result.user);
      return null;
    },
    []
  );

  const updateProfile = useCallback(async (update: ProfileUpdate) => {
    const result = await authStorage.updateProfile(update);
    if (!result.ok) return result.message;
    setUser(result.user);
    return null;
  }, []);

  const logout = useCallback(async () => {
    await authStorage.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, isReady, login, signUp, updateProfile, logout }),
    [user, isReady, login, signUp, updateProfile, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
