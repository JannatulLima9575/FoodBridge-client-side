import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ManageDonations = () => {
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/donations");
      return res.data;
    },
  });
  

const handleApprove = (id) => {
  axios.patch(`http://localhost:5000/donations/approve/${id}`)
    .then(res => {
      if (res.data.modifiedCount > 0) {
        toast.success("Donation Approved!");
        refetch();
      }
    })
    .catch(err => {
      toast.error("Failed to approve donation");
      console.error(err);
    });
};

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:5000/donations/${id}`);
    if (res.data.deletedCount > 0) {
      toast.success("Donation Deleted");
      refetch();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🍽 Manage Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Restaurant</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d, i) => (
              <tr key={d._id}>
                <td>{i + 1}</td>
                <td>{d.foodType}</td>
                <td>{d.restaurantName}</td>
                <td>{d.status}</td>
                <td>
                  {!d.approved && (
                    <button onClick={() => handleApprove(d._id)} className="btn btn-xs btn-success">Approve</button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(d._id)} className="btn btn-xs btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;