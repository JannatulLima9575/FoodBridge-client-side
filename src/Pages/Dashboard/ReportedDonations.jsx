import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ReportedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: reports = [], refetch } = useQuery({
    queryKey: ["reported-donations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reports");
      return res.data;
    },
  });

  const handleRemoveDonation = async (donationId) => {
    try {
      await axiosSecure.delete(`/donations/${donationId}`);
      await axiosSecure.delete(`/reports/by-donation/${donationId}`);
      toast.success("Donation & Reports Removed");
      refetch();
    } catch (err) {
      toast.error("Failed to delete", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Reported Donations</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Donation ID</th>
              <th>Reporter</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, idx) => (
              <tr key={report._id}>
                <td>{idx + 1}</td>
                <td>{report.donationId}</td>
                <td>{report.reporterName} <br /> <span className="text-sm">{report.reporterEmail}</span></td>
                <td>{report.description}</td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleRemoveDonation(report.donationId)}
                  >
                    Remove Donation
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

export default ReportedDonations;