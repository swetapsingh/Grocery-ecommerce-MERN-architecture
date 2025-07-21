import axios from 'axios';

const API_BASE = 'http://localhost:7000/api';

// Updated to get token from user object
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return { headers: { Authorization: `Bearer ${user.token}` } };
};

// Product APIs
export const getProducts = () => axios.get(`${API_BASE}/products`);

// Cart APIs
export const getCart = () => axios.get(`${API_BASE}/cart`, getAuthHeaders());
export const addToCart = (productId, quantity = 1) =>
  axios.post(`${API_BASE}/cart/add`, { productId, quantity }, getAuthHeaders());
export const updateCartItem = (productId, quantity) =>
  axios.put(`${API_BASE}/cart/update`, { productId, quantity }, getAuthHeaders());
export const removeFromCart = (productId) =>
  axios.delete(`${API_BASE}/cart/remove/${productId}`, getAuthHeaders());
export const clearCart = () =>
  axios.delete(`${API_BASE}/cart/clear`, getAuthHeaders());
