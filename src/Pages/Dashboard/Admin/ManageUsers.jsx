import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axios = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axios.get("/users");
      return res.data;
    },
  });

  const updateRole = async (email, role) => {
    try {
      const res = await axios.put(`/users/role/${email}`, { role });
      if (res.data.modifiedCount > 0) {
        toast.success(`Role updated to ${role}`);
        refetch();
      }
    } catch (err) {
      toast.error("Failed to update role");
      console.error(err);
    }
  };

  const deleteUser = async (email) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await axios.delete(`/users/${email}`);
      if (res.data.deletedCount > 0) {
        toast.success("User deleted");
        refetch();
      }
    } catch (err) {
      toast.error("Failed to delete user");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#257429] dark:text-orange-500">
        🔐 Manage Users
      </h2>
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-md">
        <table className="table w-full">
          <thead className="bg-green-500 dark:bg-orange-500 text-white">
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
              <tr
                key={user._id}
                className="hover:bg-green-50 dark:hover:bg-orange-50 transition-colors"
              >
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td>
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-sm bg-green-600 [#257429] dark:bg-orange-500 hover:bg-green-600 dark:hover:bg-orange-600 text-white border-none"
                      onClick={() => updateRole(user.email, "admin")}
                    >
                      Admin
                    </button>
                  )}
                </td>
                <td>
                  {user.role !== "restaurant" && (
                    <button
                      className="btn btn-sm bg-green-600 dark:bg-orange-500 hover:bg-green-600 dark:hover:bg-orange-600 text-white border-none"
                      onClick={() => updateRole(user.email, "restaurant")}
                    >
                      Restaurant
                    </button>
                  )}
                </td>
                <td>
                  {user.role !== "charity" && (
                    <button
                      className="btn btn-sm bg-green-600 dark:bg-orange-500 hover:bg-green-600 dark:hover:bg-orange-600 text-white border-none"
                      onClick={() => updateRole(user.email, "charity")}
                    >
                      Charity
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm bg-orange-500 dark:bg-green-500 hover:bg-orange-600 dark:hover:bg-green-600 text-white border-none"
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
          <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;