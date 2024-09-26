import React, { useState, useEffect } from 'react';

const UpdateUser = () => {
    const [donors, setDonors] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [name, setName] = useState('');
    const [CNIC, setCNIC] = useState('');
    const [phone, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');

    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:4000/admin/retrieveAllDonors', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                setDonors(data.donors);
            } else if (response.status === 403) {
                alert("You are not authorized to perform this action");
                window.location.href = '/login';
            } else {
                alert("Error occurred while retrieving donors");
            }
        } catch (error) {
            console.log("Error occurred while retrieving donors", error);
        }
    };

    const handleSearch = donors.filter(donor =>
        donor.name.toLowerCase().includes(searchItem.toLowerCase())
    );

    const handleBack = () => {
        window.location.href = '/admin/dashboard';
    };

    const updateUserEnable = (donor) => {
        setSelectedDonor(donor);
        setName(donor.name);
        setCNIC(donor.CNIC);
        setPhoneNumber(donor.phoneNumber);
        setCity(donor.city);
        setBloodGroup(donor.bloodGroup);
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('http://localhost:4000/admin/updateDonor', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({
                    name,
                    CNIC,
                    phoneNumber: phone,
                    email: selectedDonor.email,
                    city,
                    bloodGroup,
                }),
            });

            if (response.status === 200) {
                alert("Donor updated successfully!");
                window.location.href = '/admin/dashboard';
            } else {
                alert("Error occurred while updating donor");
            }
        } catch (error) {
            console.log("Error occurred while updating donor", error);
        }

        setSelectedDonor(null);
    };

    const deleteUser = async (email) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:4000/admin/deleteDonor', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ email }),
            });

            if (response.status === 200) {
                alert("Donor deleted successfully!");
                fetchDonors(); // Refresh the donor list after deletion
            } else {
                alert("Error occurred while deleting donor");
            }
        } catch (error) {
            console.log("Error occurred while deleting donor", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-semibold text-[#c3073f] text-center mb-6">Update Donor</h1>

                {/* Search Bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search Donor by Name"
                        value={searchItem}
                        onChange={(event) => setSearchItem(event.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Donor Table */}
                <div className="overflow-auto mb-6 text-black">
                    <table className="w-full table-auto border-collapse ">
                        <thead>
                            <tr className="bg-gray-200 text-black">
                                <th className="p-3 text-left text-black">Name</th>
                                <th className="p-3 text-left text-black">CNIC</th>
                                <th className="p-3 text-left text-black">Phone Number</th>
                                <th className="p-3 text-left text-black">Email</th>
                                <th className="p-3 text-left text-black">City</th>
                                <th className="p-3 text-left text-black">Blood Group</th>
                                <th className="p-3 text-center text-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {handleSearch.map((donor) => (
                                <tr key={donor.email} className="border-t">
                                    <td className="p-3 text-black">{donor.name}</td>
                                    <td className="p-3 text-black">{donor.CNIC}</td>
                                    <td className="p-3 text-black">{donor.phoneNumber}</td>
                                    <td className="p-3 text-black">{donor.email}</td>
                                    <td className="p-3 text-black">{donor.city}</td>
                                    <td className="p-3 text-black">{donor.bloodGroup}</td>
                                    <td className="p-3 text-black text-center space-x-2">
                                        <button
                                            onClick={() => updateUserEnable(donor)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => deleteUser(donor.email)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Update Donor Form */}
                {selectedDonor && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Update Donor Information</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="CNIC"
                                value={CNIC}
                                onChange={(event) => setCNIC(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Phone Number (11-Digit)"
                                value={phone}
                                onChange={(event) => setPhoneNumber(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(event) => setCity(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Blood Group"
                                value={bloodGroup}
                                onChange={(event) => setBloodGroup(event.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <button
                                type="submit"
                                className="w-full bg-[#c3073f] text-white py-2 rounded hover:bg-[#a20635]"
                            >
                                Update Donor
                            </button>
                        </form>
                    </div>
                )}

                {/* Back Button */}
                <div className="mt-6">
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 w-full"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
