import { useEffect, useState } from "react";
import useAuth from "../Provider/useAuth";

const useRestaurant = () => {
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [isRestaurantLoading, setIsRestaurantLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/users/restaurant/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("admin data", data); // 👈 Add this
          setIsRestaurant(data?.restaurant);
          setIsRestaurantLoading(false);
        });
    }
  }, [user]);

  return { isRestaurant, isRestaurantLoading };
};

export default useRestaurant;