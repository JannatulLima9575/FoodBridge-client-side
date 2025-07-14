import useAuth from "../Provider/useAuth";

const useCharity = () => {
  const { user } = useAuth();
  return user?.role === "charity";
};

export default useCharity;