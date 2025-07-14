import useAuth from "../Provider/useAuth";

const useRestaurant = () => {
  const { user } = useAuth();
  return user?.role === "restaurant";
};

export default useRestaurant;