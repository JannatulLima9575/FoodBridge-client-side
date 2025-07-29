import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  // baseURL: "https://food-bridge-server-side.vercel.app",
  baseURL: "http://localhost:5000", 
  withCredentials: true, // VERY IMPORTANT for sending cookies (JWT)
});

const useAxiosSecure = () => {
/*   const navigate = useNavigate(); */

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
         /*  navigate("/unauthorized"); */
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;