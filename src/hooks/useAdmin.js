import useAuth from "../Provider/useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  return user?.role === "admin";
};

export default useAdmin;