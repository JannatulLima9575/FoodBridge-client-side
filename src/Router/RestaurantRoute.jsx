import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const RestaurantRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (user?.role === "restaurant") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default RestaurantRoute;
