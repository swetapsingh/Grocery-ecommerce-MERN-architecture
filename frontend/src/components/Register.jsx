import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:7000/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed');
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
      }}>Create Account</h2>
      
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
