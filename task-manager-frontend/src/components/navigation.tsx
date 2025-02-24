import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavigationProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav style={{ margin: '20px', display: 'flex', gap: '20px' }}>
      {isAuthenticated ? (
        <>
          <Link to="/tasks">Tasks</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
