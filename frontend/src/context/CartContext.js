// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as addAPIItem, updateCartItem, removeFromCart, clearCart } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user?.token) return;
    
    try {
      const res = await getCart();
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      setCart([]);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (productId) => {
    if (!user?.token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const res = await addAPIItem(productId);
      if (res.data) {
        await fetchCart();
      }
    } catch (err) {
      console.error('Add to cart failed:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const updateQuantity = async (productId, qty) => {
    if (!user?.token) {
      alert('Please login to update cart items');
      return;
    }

    try {
      await updateCartItem(productId, qty);
      await fetchCart();
    } catch (err) {
      console.error('Failed to update cart item:', err);
      alert('Failed to update item quantity. Please try again.');
    }
  };

  const removeItem = async (productId) => {
    if (!user?.token) {
      alert('Please login to remove items from cart');
      return;
    }

    try {
      await removeFromCart(productId);
      await fetchCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
      alert('Failed to remove item from cart. Please try again.');
    }
  };

  const clearAll = async () => {
    if (!user?.token) {
      alert('Please login to clear the cart');
      return;
    }

    try {
      await clearCart();
      setCart([]);
    } catch (err) {
      console.error('Failed to clear cart:', err);
      alert('Failed to clear the cart. Please try again.');
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeItem, clearAll }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
