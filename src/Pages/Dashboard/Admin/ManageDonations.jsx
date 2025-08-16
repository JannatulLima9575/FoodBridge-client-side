import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageDonations = () => {
  const axios = useAxiosSecure();
  const { data: donations = [], refetch } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await axios.get("/donations");
      return res.data;
    },
  });

  const handleApprove = (id) => {
    axios
      .patch(`/donations/approve/${id}`)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Donation Approved!");
          refetch();
        }
      })
      .catch((err) => {
        toast.error("Failed to approve donation");
        console.error(err);
      });
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`/donations/${id}`);
    if (res.data.deletedCount > 0) {
      toast.success("Donation Deleted");
      refetch();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-500 dark:text-orange-500">
        🍽 Manage Donations
      </h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-md">
        <table className="table w-full bg-white dark:bg-gray-800">
          <thead className="bg-green-500 dark:bg-orange-500 text-white">
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
              <tr
                key={d._id}
                className="hover:bg-orange-50 dark:hover:bg-green-50 transition-colors"
              >
                <td>{i + 1}</td>
                <td className="font-medium">{d.foodType}</td>
                <td>{d.restaurantName}</td>
                <td
                  className={`${
                    d.status === "approved"
                      ? "text-green-600 font-semibold "
                      : "text-orange-600 font-semibold"
                  }`}
                >
                  {d.status}
                </td>
                <td>
                  {!d.approved && (
                    <button
                      onClick={() => handleApprove(d._id)}
                      className="btn btn-xs dark:bg-orange-500 bg-green-600 dark:hover:bg-orange-600 hover:bg-green-600 text-white border-none"
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(d._id)}
                    className="btn btn-xs bg-red-500 hover:bg-red-600 text-white border-none"
                  >
                    Delete
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

export default ManageDonations;
