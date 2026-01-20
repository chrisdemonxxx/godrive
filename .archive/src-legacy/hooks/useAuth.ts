import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, auth } from '@/shared/lib/supabase';
import { logError } from '@/utils/errors';
import type { User as AppUser } from '@/types';

export interface UseAuthReturn {
  user: AppUser | null;
  authUser: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

/**
 * Hook for authentication state and operations
 */
export function useAuth(): UseAuthReturn {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      setUser(data as AppUser);
    } catch (error) {
      logError('Failed to fetch user profile', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    if (authUser) {
      await fetchUserProfile(authUser.id);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;
      setUser(null);
      setAuthUser(null);
    } catch (error) {
      logError('Failed to sign out', error);
      throw error;
    }
  };

  return {
    user,
    authUser,
    loading,
    signOut,
    refreshUser,
  };
}
