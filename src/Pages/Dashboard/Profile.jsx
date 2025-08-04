import React, { useContext, useState } from "react";
import AuthContext from "../../Provider/AuthContext";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";


const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName,
      photoURL: user?.photoURL,
    },
  });

  const onSubmit = (data) => {
    updateUserProfile(data.name, data.photoURL)
      .then(() => {
        toast.success("Profile updated successfully");
        setIsOpen(false);
      })
      .catch(() => {
        toast.error("Failed to update profile");
      });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
        <img
          src={user?.photoURL}
          alt="Profile"
          referrerPolicy="no-referrer"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold">{user?.displayName}</h2>
        <p className="text-gray-500 dark:text-gray-300">{user?.email}</p>

        <button
          className="mt-4 btn btn-primary"
          onClick={() => {
            reset({ name: user?.displayName, photoURL: user?.photoURL });
            setIsOpen(true);
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">Edit Profile</Dialog.Title>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="input input-bordered w-full"
                />
                {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
              </div>
              <div>
                <label className="block font-medium">Photo URL</label>
                <input
                  {...register("photoURL")}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Profile;