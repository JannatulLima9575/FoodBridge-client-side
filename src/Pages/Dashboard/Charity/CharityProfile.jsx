import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const CharityProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded p-6 mt-10">
      <img
        src={user?.photoURL}
        alt={user?.displayName}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold text-center">{user?.displayName}</h2>
      <p className="text-center text-gray-600">{user?.email}</p>
      <p className="text-center text-green-600 font-semibold mt-2">Role: Charity</p>
      <p className="mt-4 text-center">Mission: Serving communities with dignity and love.</p>
    </div>
  );
};

export default CharityProfile;