import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthContext";

const RequestCharityRoleSuccess = () => {
  const [params] = useSearchParams();
  const { user } = useContext(AuthContext);
  const axios = useAxiosSecure();

  useEffect(() => {
    const transactionId = params.get("transactionId");
    const organizationName = localStorage.getItem("orgName");
    const mission = localStorage.getItem("mission");

    if (transactionId && user) {
      axios.post("/charity-role-request", {
        email: user.email,
        organizationName,
        mission,
        transactionId
      }).then(() => {
        toast.success("Request submitted successfully.");
      }).catch(() => {
        toast.error("Request failed.");
      });
    }
  }, []);

  return (
    <div className="text-center py-10">
      <h2 className="text-3xl font-bold text-green-600">Payment Successful!</h2>
      <p>Your request has been submitted.</p>
    </div>
  );
};

export default RequestCharityRoleSuccess;