import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { email: form.email });
      const res = await axios.post('http://localhost:7000/api/auth/login', form);
      console.log('Login response:', res.data);
      if (res.data.token && res.data.user) {
        const userData = {
          token: res.data.token,
          name: res.data.user.name,
          email: res.data.user.email,
          id: res.data.user.id
        };
        login(userData);
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login error details:', {
        status: err.response?.status,
        error: err.response?.data,
        message: err.message
      });
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container" style={{
      maxWidth: '600px',
      margin: '4rem auto',
      padding: '3rem',
      background: 'linear-gradient(135deg, rgba(248,225,231,0.9), rgba(211,243,208,0.9))',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <h2 style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#304d30'
      }}>Welcome Back</h2>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{
            fontSize: '1.4rem',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '2px solid #f8e1e7',
            background: 'rgba(255,255,255,0.9)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{
            fontSize: '1.4rem',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            border: '2px solid #f8e1e7',
            background: 'rgba(255,255,255,0.9)',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
        <button
          type="submit"
          style={{
            fontSize: '1.4rem',
            padding: '1rem',
            background: '#304d30',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%',
            marginTop: '1rem'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
