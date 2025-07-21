import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/cart', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCart();
    }
  }, [user]);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:7000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(item => item.productId?._id !== productId),
      }));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete('http://localhost:7000/api/cart/clear', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCart({ items: [] });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put('http://localhost:7000/api/cart/update', 
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.map(item =>
          item.productId._id === productId ? { ...item, quantity: newQuantity } : item
        ),
      }));
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  if (loading) return <h3>Loading...</h3>;
  if (!cart || cart.items.length === 0) return <h3>Your cart is empty</h3>;

  const calculateTotal = () => {
    return cart.items.reduce(
      (total, item) => total + item.quantity * (item.productId?.price || 0), 0
    );
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item._id} className="cart-item">
            <img src={item.productId?.image || ''} alt={item.productId?.name || 'Product'} />
            <div className="item-details">
              <h3>{item.productId?.name}</h3>
              <p>Price: ₹{item.productId?.price}</p>
              <div className="quantity-control">
                <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.productId._id, item.quantity + 1)}>+</button>
              </div>
              <p>Total: ₹{(item.productId?.price || 0) * item.quantity}</p>
            </div>
            <button onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ₹{calculateTotal()}</h3>
        <button className="clear-cart" onClick={handleClearCart}>Clear Cart</button>
        <Link to="/checkout">
          <button className="checkout-btn">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
