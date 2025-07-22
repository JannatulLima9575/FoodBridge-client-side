import { useContext } from "react";
// import AuthContext from "../Provider/AuthContext";";
import { Navigate } from "react-router";
import AuthContext from "../Provider/AuthContext";

const RestaurantRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return user?.role === "restaurant" ? children : <Navigate to="/unauthorized" replace />;
};

export default RestaurantRoute;