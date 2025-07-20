import { useEffect, useState } from "react";
import useAuth from "../Provider/useAuth";

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://food-bridge-server-side.vercel.app/users/admin/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("admin data", data); // 👈 Add this
          setIsAdmin(data?.admin);
          setIsAdminLoading(false);
        });
    }
  }, [user]);

  return { isAdmin, isAdminLoading };
};

export default useAdmin;
