import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, getIdToken } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authApi } from '../api/auth.api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async (user) => {
    if (!user) return;
    try {
      const profile = await authApi.getMe();
      if (profile) {
        setUserProfile(profile);
      } else {
        console.warn("Could not fetch user profile from backend.");
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await refreshProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const value = {
    currentUser,
    userProfile,
    refreshProfile,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
