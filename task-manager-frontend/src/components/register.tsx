import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  access_token: string;
}

interface RegisterProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      const response = await api.post<LoginResponse>('/auth/login', { username, password });
      localStorage.setItem('token', response.data.access_token);
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none'
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
