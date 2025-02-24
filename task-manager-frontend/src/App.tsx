import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import Navigation from './components/navigation';
import TasksPage from './components/taskspage';

const Home: React.FC = () => (
  <div style={{ margin: '20px' }}>
    <h2>Home Page</h2>
    <p>Welcome to the Task Manager!</p>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Task Manager Frontend</h1>
        <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/tasks" replace />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/tasks" replace />}
          />
          <Route
            path="/tasks"
            element={isAuthenticated ? <TasksPage /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
