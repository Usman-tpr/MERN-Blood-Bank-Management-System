import React, { useEffect } from 'react';

const AdminDashboard = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        // Verify Admin Authorization
        fetch('http://localhost:4000/admin/verify', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                alert("You are not authorized to view this page");
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error("Error verifying admin", error);
        });
    }, []); // Empty dependency array to ensure this runs only once when the component mounts

    const handleUpdate = () => {
        window.location.href = '/admin/update';
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-semibold text-[#c3073f] text-center mb-6">
                    Admin Dashboard
                </h1>

                <div className="space-y-4">
                    <p className="text-gray-700 text-lg">
                        Welcome to the Admin Dashboard. From here, you can manage and update donor accounts.
                    </p>

                    <button
                        onClick={handleUpdate}
                        className="bg-[#c3073f] text-white px-4 py-2 rounded hover:bg-[#a20635] transition w-full"
                    >
                        Update a Donor Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
