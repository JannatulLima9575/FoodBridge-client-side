import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`https://food-bridge-server-side.vercel.app/users/admin/${user?.email}`);
      return res.data?.admin;
    },
  });

  if (loading || isLoading) return <p className="text-center py-20">Loading...</p>;

  return isAdmin ? children : <Navigate to="/unauthorized" replace />;
};

export default AdminRoute;