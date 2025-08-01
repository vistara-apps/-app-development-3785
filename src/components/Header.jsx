import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Users, Lightbulb, Rocket, User, CreditCard, BarChart3 } from 'lucide-react';

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/teams', label: 'Teams', icon: Users },
    { path: '/ideas', label: 'Ideas', icon: Lightbulb },
    { path: '/innovation', label: 'Innovation', icon: Rocket },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/subscription', label: 'Subscription', icon: CreditCard },
  ];

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <Link to="/" style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#3b82f6',
            textDecoration: 'none'
          }}>
            Hackathon Hub
          </Link>
          
          {isAuthenticated && (
            <nav style={{ display: 'flex', gap: '24px' }}>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: location.pathname === item.path ? '#3b82f6' : '#64748b',
                      backgroundColor: location.pathname === item.path ? '#eff6ff' : 'transparent',
                      fontWeight: location.pathname === item.path ? '600' : '400',
                      fontSize: '14px'
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ConnectButton />
          {!isAuthenticated && (
            <button
              onClick={() => setIsAuthenticated(true)}
              className="btn btn-primary"
            >
              Sign In
            </button>
          )}
          {isAuthenticated && (
            <button
              onClick={() => setIsAuthenticated(false)}
              className="btn btn-outline"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;