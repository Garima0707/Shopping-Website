import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isBouncing, setIsBouncing] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);

    // Trigger bounce animation
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500); // Reset after animation duration
  };

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img
          src={product.image}
          alt={product.title}
        />
      </div>
      <Link to={`/product/${product.id}`}>
  <h3 className="product-title">{product.title}</h3>
</Link>

      <div className="price-cart-row">
        <p className="price">${product.price}</p>
        <button
          className={`icon-button ${isBouncing ? 'bounce' : ''}`}
          onClick={handleAddToCart}
          title="Add to Cart"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
