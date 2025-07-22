import { useContext } from "react";
import  AuthContext  from "./AuthContext";
// import { AuthContext } from "./AuthProvider";
// import AuthContext from "../Provider/AuthContext";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;