// src/pages/CartPage.jsx
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearAll } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return <div className="p-4">Please login to view your cart</div>;
  }

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    await updateQuantity(productId, newQty);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + (item.productId?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="container p-8">
      <h1 style={{ 
        fontSize: '2.5rem', 
        textAlign: 'center',
        marginBottom: '2rem'
      }}>Your Cart</h1>

      {isLoading ? (
        <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>Loading cart...</p>
      ) : cart.length === 0 ? (
        <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>Your cart is empty.</p>
      ) : (
        <div className="card">
          {cart.map((item) => (
            <div key={item._id} style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '16px',
              marginBottom: '1.5rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '2rem',
              alignItems: 'center'
            }}>
              <img 
                src={item.productId?.image} 
                alt={item.productId?.name}
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
              />
              <div>
                <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>
                  {item.productId?.name}
                </h3>
                <p style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>
                  Price: ₹{item.productId?.price}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <label style={{ fontSize: '1.4rem' }}>Quantity:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    style={{
                      width: '80px',
                      padding: '0.5rem',
                      fontSize: '1.3rem',
                      borderRadius: '8px',
                      border: '2px solid #d3f3d0'
                    }}
                    onChange={(e) => handleQuantityChange(item.productId?._id, parseInt(e.target.value))}
                  />
                </div>
                <p style={{ fontSize: '1.4rem', margin: '0.5rem 0' }}>
                  Subtotal: ₹{(item.productId?.price || 0) * item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId?._id)}
                style={{
                  background: '#f4c6d0',
                  color: '#304d30',
                  padding: '0.8rem 1.5rem'
                }}
              >
                Remove
              </button>
            </div>
          ))}

          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            borderTop: '2px solid #f8e1e7',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ fontSize: '2rem' }}>
              Total: ₹{calculateTotal()}
            </h2>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={clearAll}
                style={{
                  background: '#f4c6d0',
                  color: '#304d30'
                }}
              >
                Clear Cart
              </button>
              <button
                style={{
                  background: '#304d30',
                  color: 'white'
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
