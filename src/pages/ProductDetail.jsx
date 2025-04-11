import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0); // Start from 0

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (quantity === 0) {
      toast.warning("Quantity must be at least 1 to add to cart.");
      return;
    }
    addToCart(product, quantity);
    toast.success(`${product.title} added to cart (${quantity})`);
  };

  const increaseQuantity = () => {
    if (quantity < 5) {
      setQuantity(prev => prev + 1);
    } else {
      toast.info('Maximum quantity is 5');
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <div className="detail-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="detail-info">
        <h2>{product.title}</h2>
        <p className="description">{product.description}</p>
        <div className="price-add">
          <span className="price">${product.price}</span>
          <div className="quantity-controls">
            <button onClick={decreaseQuantity}><Minus size={16} /></button>
            <span className="quantity-display">{quantity}</span>
            <button onClick={increaseQuantity}><Plus size={16} /></button>
          </div>
          <button className="add-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
