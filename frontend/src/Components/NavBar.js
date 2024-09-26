import React, { useState } from 'react';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className="bg-[#c3073f] text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="text-2xl font-bold">Blood Management</a>

                {/* Hamburger Icon for Mobile */}
                <button className="block md:hidden" onClick={toggleMenu}>
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
                            />
                        ) : (
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                            />
                        )}
                    </svg>
                </button>

                {/* Navigation Links */}
                <ul className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block`}>
                    <li><a href="/" className="block mt-4 md:mt-0 text-white hover:text-gray-200">Home</a></li>
                    <li><a href="/admin/login" className="block mt-4 md:mt-0 text-white hover:text-gray-200">Admin Login</a></li>
                    <li><a href="/donor/login" className="block mt-4 md:mt-0 text-white hover:text-gray-200">Donor Login</a></li>
                    <li><a href="/donor/signup" className="block mt-4 md:mt-0 text-white hover:text-gray-200">Donor Signup</a></li>
                    <li><a href="/admin/signup" className="block mt-4 md:mt-0 text-white hover:text-gray-200">Admin Signup</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
