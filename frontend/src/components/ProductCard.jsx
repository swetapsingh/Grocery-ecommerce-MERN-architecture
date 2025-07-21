// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/productCard.css';

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user?.token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    setIsAdding(true);
    try {
      // This should add the product to the backend and context
      await addToCart(product._id); // Call addToCart from context
      alert(`Added "${product.name}" to cart!`);
    } catch (err) {
      console.error('Failed to add to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
      <button
        className="add-to-cart-btn"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
