import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });

  const handleRoleChange = async (id, role) => {
    const res = await axios.patch(`http://localhost:5000/users/${id}`, { role });
    if (res.data.modifiedCount > 0) {
      toast.success(`Role changed to ${role}`);
      refetch();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👥 Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td className="space-x-2">
                  <button onClick={() => handleRoleChange(u._id, "admin")} className="btn btn-xs btn-accent">Make Admin</button>
                  <button onClick={() => handleRoleChange(u._id, "restaurant")} className="btn btn-xs btn-success">Make Restaurant</button>
                  <button onClick={() => handleRoleChange(u._id, "charity")} className="btn btn-xs btn-info">Make Charity</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;