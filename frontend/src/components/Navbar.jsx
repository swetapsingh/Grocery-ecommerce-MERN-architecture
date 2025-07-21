import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem 4rem',
      background: '#f8e1e7',
      borderBottom: '4px solid #d3f3d0',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: '#304d30', 
        fontSize: '2.5rem',
        margin: 0
      }}>GrocyCart</h2>
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <Link to="/" style={{ fontSize: '1.4rem' }}>Home</Link>
        {!user ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart" style={{
              background: '#304d30',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '12px',
              transition: 'all 0.3s ease'
            }}>Cart</Link>
          </>
        ) : (
          <>
            <Link to="/products">Products</Link>
            <Link to="/cart" style={{
              background: '#304d30',
              color: 'white',
              padding: '0.8rem 1.5rem',
              borderRadius: '12px'
            }}>Cart</Link>
            <span style={{ 
              fontSize: '1.4rem',
              color: '#304d30'
            }}>Hi, {user.name}</span>
            <button 
              onClick={logout} 
              style={{
                background: '#f4c6d0',
                color: '#304d30',
                padding: '0.8rem 1.5rem',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.3rem',
                transition: 'all 0.3s ease'
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
