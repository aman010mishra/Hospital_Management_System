import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Hospital, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For demo purposes, assume login is successful if fields are filled.
    setIsLoggedIn(true);
    setShowLoginForm(false);
    navigate("/"); // navigate back to the home route
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary transition-all duration-300 hover:opacity-80"
          >
            <Hospital className="h-6 w-6" />
            <span className="text-xl font-medium">HospitalHub</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <NavLink to="/" icon={<Home className="h-4 w-4 md:mr-2" />} label="Home" />
            <NavLink to="/hospitals" icon={<Hospital className="h-4 w-4 md:mr-2" />} label="Hospitals" />
            <NavLink 
              to="/create" 
              icon={<PlusCircle className="h-4 w-4 md:mr-2" />} 
              label="Add Hospital" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            />
            {!isLoggedIn ? (
              <button 
                onClick={() => setShowLoginForm(true)}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-blue-500 text-white transition-all duration-200 hover:bg-blue-600"
              >
                Login
              </button>
            ) : (
              <button 
                onClick={handleLogout}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-red-500 text-white transition-all duration-200 hover:bg-red-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
      {showLoginForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md p-6 w-80">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm mb-1">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  required 
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-all duration-200"
              >
                Submit
              </button>
            </form>
            <button 
              onClick={() => setShowLoginForm(false)}
              className="mt-4 text-sm text-blue-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, className }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
        "hover:bg-accent hover:text-accent-foreground",
        className
      )}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </Link>
  );
};

export default Navbar;
