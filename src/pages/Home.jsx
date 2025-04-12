import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import '../styles/Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const endpoint =
        category === 'all'
          ? 'https://fakestoreapi.com/products'
          : `https://fakestoreapi.com/products/category/${category}`;
      const res = await axios.get(endpoint);
      setProducts(res.data);
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="home-container">
        {/* Section Title */}
        <div className="home-header">
          <h1 className="products-title">Products</h1>
          <div className="filter-bar-wrapper">
            <FilterBar setCategory={setCategory} setSearchTerm={setSearchTerm} />
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
