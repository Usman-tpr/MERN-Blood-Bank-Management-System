import React from 'react';

const Home = () => {

    const handleLoginAdmin = () => {
        window.location.href = '/admin/login';
    }

    const handleSignupAsDonor = () => {
        window.location.href = '/donor/signup';
    }

    const handleSignupAsAdmin = () => {
        window.location.href = '/admin/signup';
    }

    const handleLoginAsDonor = () => {
        window.location.href = '/donor/login';
    }

    return (
        <div className="bg-gray-50">
            {/* 1. Hero Section */}
            <section className="h-screen flex flex-col items-center justify-center bg-[#c3073f] text-white">
                <h1 className="text-6xl font-bold">Blood Management System</h1>
                <p className="mt-4 text-xl">Donate blood, save lives!</p>
                <div className="mt-8 space-x-4 flex items-center">
                    <button onClick={handleSignupAsDonor} className="px-6 py-3 bg-white text-[#c3073f] font-semibold rounded hover:bg-gray-200">Register as Donor</button>
                    <button onClick={handleLoginAsDonor} className="px-6 py-3 bg-transparent border border-white rounded text-white hover:bg-white hover:text-[#c3073f]">Login as Donor</button>
                </div>
            </section>

            {/* 2. About Section */}
            <section className="py-16 text-center">
                <h2 className="text-4xl font-semibold text-[#c3073f]">About Us</h2>
                <p className="mt-4 text-gray-700 max-w-2xl mx-auto">We are dedicated to connecting blood donors with patients in need. Our platform ensures a smooth and safe donation process to make a real difference in people's lives.</p>
            </section>

            {/* 3. How It Works Section */}
            <section className="py-16 bg-gray-100">
                <h2 className="text-4xl font-semibold text-center text-[#c3073f]">How It Works</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-6 text-center bg-white shadow-md rounded">
                        <h3 className="text-2xl font-semibold text-[#c3073f]">Register as a Donor</h3>
                        <p className="mt-4 text-gray-600">Fill out the form, verify your details, and become an active donor.</p>
                    </div>
                    <div className="p-6 text-center bg-white shadow-md rounded">
                        <h3 className="text-2xl font-semibold text-[#c3073f]">Find a Blood Donor</h3>
                        <p className="mt-4 text-gray-600">Clients can easily find registered donors nearby and request blood.</p>
                    </div>
                    <div className="p-6 text-center bg-white shadow-md rounded">
                        <h3 className="text-2xl font-semibold text-[#c3073f]">Admin Support</h3>
                        <p className="mt-4 text-gray-600">Admins manage donors and ensure smooth transactions between clients and donors.</p>
                    </div>
                </div>
            </section>

            {/* 4. Donor Benefits Section */}
            <section className="py-16 text-center">
                <h2 className="text-4xl font-semibold text-[#c3073f]">Why Become a Donor?</h2>
                <p className="mt-4 text-gray-700">Becoming a blood donor is one of the most selfless acts. Here are some reasons:</p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-6 text-center bg-gray-100 rounded">
                        <h3 className="text-2xl font-semibold text-[#c3073f]">Save Lives</h3>
                        <p className="mt-4 text-gray-600">Your donation can save multiple lives in emergencies and surgeries.</p>
                    </div>
                    <div className="p-6 text-center bg-gray-100 rounded">
                        <h3 className="text-2xl font-semibold text-[#c3073f]">Health Benefits</h3>
                        <p className="mt-4 text-gray-600">Donating blood improves your own cardiovascular health and reduces risks of diseases.</p>
                    </div>
                    <div className="p-6 text-center bg-gray-100 rounded">
                        <h3 className="text-2xl font-semibold text-[#c3073f]">Community Impact</h3>
                        <p className="mt-4 text-gray-600">You contribute to the health of your community and become a role model.</p>
                    </div>
                </div>
            </section>

            {/* 5. Admin Section */}
            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-4xl font-semibold text-[#c3073f]">Admin Dashboard</h2>
                <p className="mt-4 text-gray-700">Manage donors and requests through our comprehensive admin panel.</p>
                <button onClick={handleLoginAdmin} className="mt-8 px-6 py-3 bg-[#c3073f] text-white font-semibold rounded hover:bg-gray-200">Login as Admin</button>
            </section>

            {/* 6. Testimonials Section */}
            <section className="py-16 text-center">
                <h2 className="text-4xl font-semibold text-[#c3073f]">Testimonials</h2>
                <div className="mt-8 max-w-4xl mx-auto">
                    <blockquote className="text-lg text-gray-700">"Thanks to this platform, I was able to find a donor quickly for my relative. The process was seamless!"</blockquote>
                    <p className="mt-4 text-gray-500">- John Doe</p>
                </div>
            </section>

            {/* 7. Call to Action Section */}
            <section className="py-16 bg-[#c3073f] text-white text-center">
                <h2 className="text-4xl font-semibold">Join the Cause</h2>
                <p className="mt-4">Become a donor or help manage the process. Let's save lives together.</p>
                <div className="mt-8 space-x-4">
                    <button onClick={handleSignupAsDonor} className="px-6 py-3 bg-white text-[#c3073f] font-semibold rounded hover:bg-gray-200">Register as Donor</button>
                    <button onClick={handleSignupAsAdmin} className="px-6 py-3 bg-white text-[#c3073f] font-semibold rounded hover:bg-gray-200">Register as Admin</button>
                </div>
            </section>

        </div>
    );
}

export default Home;
