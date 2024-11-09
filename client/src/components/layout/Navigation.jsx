import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();

    const isActive = (path) => window.location.pathname === path;

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-primary">BH</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        isActive 
                                            ? 'border-primary text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink 
                                to="/rooms"
                                className={({ isActive }) => 
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        isActive 
                                            ? 'border-primary text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                Rooms
                            </NavLink>
                            <NavLink 
                                to="/about"
                                className={({ isActive }) => 
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        isActive 
                                            ? 'border-primary text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                About
                            </NavLink>
                            <NavLink 
                                to="/contact"
                                className={({ isActive }) => 
                                    `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                        isActive 
                                            ? 'border-primary text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`
                                }
                            >
                                Contact
                            </NavLink>
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {user ? (
                            <div className="relative ml-3">
                                <div>
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center space-x-2 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200">
                                            <User className="h-5 w-5 text-gray-500" />
                                        </div>
                                        <span className="text-gray-700">{user.firstName}</span>
                                        <ChevronDown className="h-4 w-4 text-gray-500" />
                                    </button>
                                </div>
                                {dropdownOpen && (
                                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-50">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Your Profile
                                        </Link>
                                        <Link
                                            to="/bookings"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            My Bookings
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                logout();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link 
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register"
                                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                        >
                            {isOpen ? (
                                <X className="block h-6 w-6" />
                            ) : (
                                <Menu className="block h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link 
                            to="/"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Home
                        </Link>
                        <Link 
                            to="/rooms"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Rooms
                        </Link>
                        <Link 
                            to="/about"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            About
                        </Link>
                        <Link 
                            to="/contact"
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Contact
                        </Link>
                        {user ? (
                            <>
                                <Link 
                                    to="/profile"
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Your Profile
                                </Link>
                                <Link 
                                    to="/bookings"
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    My Bookings
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login"
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register"
                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
} 