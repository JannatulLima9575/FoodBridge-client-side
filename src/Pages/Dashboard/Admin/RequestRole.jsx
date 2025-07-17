import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../Provider/useAuth";
import axios from "axios";


const RequestRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return toast.error("Please select a role");

    try {
      const response = await axios.post("http://localhost:5000/role-requests", {
        email: user.email,
        name: user.displayName,
        image: user.photoURL,
        requestedRole: role,
      });

      if (response.data.insertedId) {
        toast.success("Role request sent successfully");
        setRole("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Request Role Access</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="">Select a Role</option>
          <option value="restaurant">Restaurant</option>
          <option value="charity">Charity</option>
        </select>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestRole;