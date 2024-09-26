import React, { useState } from 'react';

const SignupDonor = () => {
    const [name, setName] = useState('');
    const [CNIC, setCnic] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [status, setStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();

        // Client-side validation
        if (!name || !CNIC || !phone || !email || !password || !city) {
            setErrorMessage("All fields are required");
            return;
        }

        const userData = {
            name,
            CNIC,
            phone,
            email,
            password,
            city,
        };

        try {
            const response = await fetch('http://localhost:4000/donor/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.status === 200) {
                alert("Donor Account created successfully!");
                setStatus(true);
            } else {
                alert("Error occurred while creating Donor Account. Account may already exist");
            }
        } catch (error) {
            console.log("Error occurred while signing up", error);
        }
    };

    const handleNext = () => {
        window.location.href = '/donor/login';
    };

    const handleBack = () => {
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-[#c3073f] mb-8">Donor Signup</h2>
                
                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-[#c3073f]"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="CNIC" className="mb-2 text-gray-700">CNIC</label>
                        <input
                            type="text"
                            id="CNIC"
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-[#c3073f]"
                            placeholder="Enter CNIC (e.g., 12345-1234567-1)"
                            pattern="\d{5}-\d{7}-\d"
                            value={CNIC}
                            onChange={(event) => setCnic(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="mb-2 text-gray-700">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-[#c3073f]"
                            placeholder="Enter Phone (11-Digit)"
                            pattern="\d{11}"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-[#c3073f]"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-[#c3073f]"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="city" className="mb-2 text-gray-700">City</label>
                        <input
                            type="text"
                            id="city"
                            className="border border-gray-300 p-2 rounded focus:outline-none focus:border-[#c3073f]"
                            placeholder="Enter City"
                            value={city}
                            onChange={(event) => setCity(event.target.value)}
                            required
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#c3073f] text-white py-2 px-4 rounded hover:bg-[#a20635] transition"
                    >
                        Signup
                    </button>
                </form>

                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleBack}
                        className="text-gray-700 underline"
                    >
                        Back
                    </button>
                    {status && (
                        <button
                            onClick={handleNext}
                            className="text-[#c3073f] underline"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignupDonor;
