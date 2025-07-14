import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const CharityRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return user?.role === "charity" ? children : <Navigate to="/unauthorized" replace />;
};

export default CharityRoute;