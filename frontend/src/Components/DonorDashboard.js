import React, { useState, useEffect } from 'react';

const DonorDashboard = () => {
    const [bloodType, setBloodType] = useState('');
    const [location, setLocation] = useState('');
    const [donorPosts, setDonorPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState('dashboard'); // Control which section to display

    const token = localStorage.getItem('token');

    // Fetch donor list and verify user
    useEffect(() => {
        fetch('http://localhost:4000/donor/verify', {
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
        .then(data => {
            fetchDonorPosts();
        })
        .catch(err => console.error(err));
    }, [token]);

    // Function to fetch donor posts
    const fetchDonorPosts = () => {
        fetch('http://localhost:4000/donor/posts', {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            setDonorPosts(data);
            setLoading(false);
        })
        .catch(err => console.error(err));
    }

    // Function to create new post
    const handleSubmit = (e) => {
        e.preventDefault();

        const postData = { bloodType, location };

        fetch('http://localhost:4000/donor/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(postData),
        })
        .then(response => response.json())
        .then(data => {
            alert('Post created successfully');
            setBloodType('');
            setLocation('');
            fetchDonorPosts(); // Fetch updated posts after submission
        })
        .catch(err => console.error(err));
    }

    return (
        <div className="flex min-h-screen ">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-8">Dashboard Menu</h2>
                <ul>
                    <li
                        className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedSection === 'dashboard' && 'bg-[#c3073f]'}`}
                        onClick={() => setSelectedSection('dashboard')}
                    >
                        Dashboard
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedSection === 'create-post' && 'bg-[#c3073f]'}`}
                        onClick={() => setSelectedSection('create-post')}
                    >
                        Create Blood Donation Post
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedSection === 'see-all-donors' && 'bg-[#c3073f]'}`}
                        onClick={() => setSelectedSection('see-all-donors')}
                    >
                        See All Donors
                    </li>
                    <li
                        className={`cursor-pointer py-2 px-4 mb-2 rounded ${selectedSection === 'profile' && 'bg-[#c3073f]'}`}
                        onClick={() => setSelectedSection('profile')}
                    >
                        Profile
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-8">
                {selectedSection === 'dashboard' && (
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
                        <p className='text-white'> Here you can manage your blood donations and view donor information.</p>
                    </div>
                )}

                {selectedSection === 'create-post' && (
                    <div className="max-w-lg mx-auto bg-white shadow-md rounded p-6">
                        <h2 className="text-2xl font-semibold mb-4">Create a New Blood Donation Post</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="bloodType" className="block text-gray-700">Blood Type</label>
                                <input
                                    type="text"
                                    id="bloodType"
                                    value={bloodType}
                                    onChange={(e) => setBloodType(e.target.value)}
                                    className="w-full mt-2 p-2 border rounded"
                                    placeholder="e.g. O+, A-"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-700">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full mt-2 p-2 border rounded"
                                    placeholder="e.g. New York"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#c3073f] text-white py-2 px-4 rounded hover:bg-[#a20635]"
                            >
                                Create Post
                            </button>
                        </form>
                    </div>
                )}

                {selectedSection === 'see-all-donors' && (
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-6">Donors List</h2>
                        {loading ? (
                            <p>Loading donors...</p>
                        ) : (
                            <ul className="space-y-4">
                                {donorPosts.map((post) => (
                                    <li key={post._id} className="bg-white p-4 rounded shadow-md">
                                        <p className="text-lg font-bold">Blood Type: {post.bloodType}</p>
                                        <p className="text-gray-700">Location: {post.location}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {selectedSection === 'profile' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Profile</h1>
                        <p>Manage your personal profile information here.</p>
                        {/* Add profile management features here */}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DonorDashboard;
