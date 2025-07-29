import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import useAuth from "../../Provider/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ReportDonationModal = ({ isOpen=false, closeModal=()=>{}, donationId }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const report = {
      donationId,
      reporterName: user?.displayName,
      reporterEmail: user?.email,
      description: data.description,
      reportTime: new Date(),
    };

    try {
      await axiosSecure.post("/reports", report);
      toast.success("Reported successfully");
      reset();
      closeModal();
    } catch (error) {
      toast.error("Failed to report", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal} className="z-50 relative">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-gray-800 rounded p-6 max-w-md w-full space-y-4">
          <Dialog.Title className="text-xl font-bold">
            Report Donation
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <textarea
              {...register("description", { required: true })}
              placeholder="Describe the issue"
              className="textarea textarea-bordered w-full"
              rows="4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                type="button"
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-error">
                Submit Report
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ReportDonationModal;