import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PenSquare, LogOut, LayoutDashboard, Home, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <PenSquare className="text-white w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            MiniBlog
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium">
                            <Home size={18} /> Home
                        </Link>
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center gap-2 font-medium">
                                    <LayoutDashboard size={18} /> Dashboard
                                </Link>
                                <Link to="/create" className="btn-primary flex items-center gap-2">
                                    <PenSquare size={18} /> Write
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2 font-medium"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                                <div className="flex items-center gap-2 pl-4 border-l border-gray-100">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700">
                                        <User size={16} />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
                                <Link to="/register" className="btn-primary">Get Started</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Icon (simplified for now) */}
                    <div className="md:hidden flex items-center gap-4">
                         {user && (
                             <Link to="/create" className="p-2 text-indigo-600">
                                 <PenSquare size={24} />
                             </Link>
                         )}
                         <Link to="/login" className="p-2">
                             <User size={24} className="text-gray-600" />
                         </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
