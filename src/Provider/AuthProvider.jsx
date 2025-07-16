import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import auth from '../firebase/firebase.config';
import axios from "axios";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Update user profile (name)
  const updateUserProfile = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: name });
  };

  // ✅ Sign in with email & password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google Login
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Logout
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Track auth state & fetch user role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const res = await axios.get(`http://localhost:5000/users/${currentUser.email}`);
          const role = res.data?.role || "user";
          setUser({ ...currentUser, role });
        } catch (error) {
          console.error("Failed to fetch user role:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    signIn,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;