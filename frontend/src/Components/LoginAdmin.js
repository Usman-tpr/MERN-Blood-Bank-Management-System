import React, { useState } from 'react';

const Login = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminStatus, setAdminStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        // Simple form validation
        if (!email || !password) {
            setErrorMessage('Email and password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                const data = await response.json();
                alert("Login Successful");
                setAdminStatus(true);
                localStorage.setItem('token', data.token);
            } else {
                setErrorMessage("Invalid credentials or account does not exist.");
            }
        } catch (error) {
            console.log("Error occurred while logging in", error);
            setErrorMessage('An error occurred while trying to login.');
        }
    };

    const handleSignup = () => {
        window.location.href = '/admin/signup';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-[#c3073f] mb-8">Admin Login</h2>
                
                <form onSubmit={handleLogin} className="space-y-6">
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

                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-[#c3073f] text-white py-2 px-4 rounded hover:bg-[#a20635] transition"
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        onClick={handleSignup}
                        className="w-full mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300 transition"
                    >
                        Signup
                    </button>
                </form>

                {adminStatus && (
                    <button
                        onClick={() => window.location.href = '/admin/dashboard'}
                        className="mt-6 text-[#c3073f] bg-gray-200 w-full"
                    >
                        Go to Admin Dashboard
                    </button>
                )}
            </div>
        </div>
    );
};

export default Login;
