import { useEffect, useState } from "react";
import useAuth from "../Provider/useAuth";

const useCharity = () => {
  const [isCharity, setIsCharity] = useState(false);
  const [isCharityLoading, setIsCharityLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://food-bridge-server-side.vercel.app/users/charity/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("admin data", data); // 👈 Add this
          setIsCharity(data?.charity);
          setIsCharityLoading(false);
        });
    }
  }, [user]);

  return { isCharity, isCharityLoading };
};

export default useCharity;