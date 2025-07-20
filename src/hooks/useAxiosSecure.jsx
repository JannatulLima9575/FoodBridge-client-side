import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://food-bridge-server-side.vercel.app",
  withCredentials: true, // VERY IMPORTANT for sending cookies (JWT)
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/unauthorized");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;