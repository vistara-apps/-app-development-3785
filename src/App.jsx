import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import { ToastContainer } from './components/Toast';
import { useToast } from './hooks/useToast';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Ideas from './pages/Ideas';
import Innovation from './pages/Innovation';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toasts, removeToast } = useToast();
  
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <LandingPage setIsAuthenticated={setIsAuthenticated} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/teams" 
              element={isAuthenticated ? <Teams /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/ideas" 
              element={isAuthenticated ? <Ideas /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/innovation" 
              element={isAuthenticated ? <Innovation /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/profile" 
              element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/subscription" 
              element={isAuthenticated ? <Subscription /> : <Navigate to="/" replace />} 
            />
          </Routes>
          <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
