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

  // ✅ Update user profile
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
    // Clear JWT from localStorage
    localStorage.removeItem('access-token');
    return signOut(auth);
  };

  // ✅ Track Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // ✅ Get JWT token from server
          const { data } = await axios.post("https://food-bridge-server-side.vercel.app/jwt", {
            email: currentUser.email,
          });

          // ✅ Save token to localStorage
          localStorage.setItem("access-token", data.token);

          // ✅ Set token as default header
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

          // ✅ Fetch role from database
          const res = await axios.get(`https://food-bridge-server-side.vercel.app/users/${currentUser.email}`);
          const role = res.data?.role || "user";

          setUser({ ...currentUser, role });
        } catch (error) {
          console.error("Failed to fetch user role or token:", error);
          setUser(currentUser); // fallback without role
        }
      } else {
        // No user
        setUser(null);
        localStorage.removeItem("access-token");
        delete axios.defaults.headers.common["Authorization"];
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