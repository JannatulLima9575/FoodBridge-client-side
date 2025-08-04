import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaTrash, FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get("/users");
      return res.data;
    },
  });
  const axios = useAxiosSecure();
  const updateRole = async (email, role) => {
    try {
      const res = await axios.put(`/users/role/${email}`, { role });
      if (res.data.modifiedCount > 0) {
        toast.success(`Role updated to ${role}`);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to update role", err);
    }
  };

  const deleteUser = async (email) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
    try {
      const res = await axios.delete(`/users/${email}`);
      if (res.data.deletedCount > 0) {
        toast.success("User deleted");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to delete user", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🔐 Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead className="bg-green-100">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Make Admin</th>
              <th>Make Restaurant</th>
              <th>Make Charity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => updateRole(user.email, "admin")}
                    >
                      Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.role !== "restaurant" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => updateRole(user.email, "restaurant")}
                    >
                      Restaurant
                    </button>
                  )}
                </td>
                <td>
                  {user.role !== "charity" && (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => updateRole(user.email, "charity")}
                    >
                      Charity
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => deleteUser(user.email)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="text-center mt-4 text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;