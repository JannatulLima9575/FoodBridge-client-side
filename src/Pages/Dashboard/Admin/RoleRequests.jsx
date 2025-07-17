import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const RoleRequests = () => {
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["roleRequests"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/role-requests");
      return res.data;
    },
  });

  const handleApprove = async (id, role, email) => {
    try {
      const res = await axios.patch(`http://localhost:5000/users/${id}`, {
        role,
        email,
      });
      if (res.data.modifiedCount > 0) {
        toast.success("Request approved!");
        refetch();
      }
    } catch (error) {
      toast.error("Approval failed!");
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📝 Role Requests</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Requested Role</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.requestedRole}</td>
                <td>
                  <button
                    onClick={() => handleApprove(r._id, r.requestedRole, r.email)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleRequests;