import React, { useEffect, useState } from "react";
import AuthContext from './AuthContext';
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
import useAxios from "../hooks/useAxiosSecure";

// export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  const [name,setName] = useState('');
  // ✅ Create new user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Update user profile
  const updateUserProfile = (name,url='https://i.ibb.co/ZYW3VTp/brown-brim.png') => {
    setName(name);
    setLoading(true);
    return updateProfile(auth.currentUser, { displayName: name ,photoURL:url});
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
          if( !name && !currentUser.displayName){return}
          const { data } = await axios.post("/jwt", {
            email: currentUser.email,
            name: currentUser.displayName || name,
          });

          // ✅ Save token to localStorage
          localStorage.setItem("access-token", data.token);

          // ✅ Set token as default header
          axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

          // ✅ Fetch role from database
          /* const res = await axios.get(`/users/${currentUser.email}`);
          const role = res.data?.role || "user"; */

          setUser({ ...currentUser, role:data.role });
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
  }, [name]);

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