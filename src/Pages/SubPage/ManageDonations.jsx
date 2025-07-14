import React from 'react';

const ManageDonations = () => {

    const handleApprove = async (id) => {
  await axios.patch(`http://localhost:5000/donations/approve/${id}`);
  toast.success("Approved successfully");
  refetch(); // from react-query
};

    return (
        <div>
            <h1>Hi</h1>
        </div>
    );
};

export default ManageDonations;