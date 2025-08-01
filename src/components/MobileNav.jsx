import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, Lightbulb, Rocket, User, CreditCard, BarChart3 } from 'lucide-react';

const MobileNav = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/teams', label: 'Teams', icon: Users },
    { path: '/ideas', label: 'Ideas', icon: Lightbulb },
    { path: '/innovation', label: 'Innovation', icon: Rocket },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/subscription', label: 'Subscription', icon: CreditCard },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/"
              onClick={closeMenu}
              className="text-xl font-bold text-blue-600"
            >
              Hackathon Hub
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {isAuthenticated && (
            <nav className="space-y-2 mb-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}

          <div className="space-y-3">
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  setIsAuthenticated(true);
                  closeMenu();
                }}
                className="w-full btn btn-primary"
              >
                Sign In
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  closeMenu();
                }}
                className="w-full btn btn-outline"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
