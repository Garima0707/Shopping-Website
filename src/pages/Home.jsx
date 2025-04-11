import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';  
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
      <div className="home-container pt-16 px-4">
        {/* Product Section Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 mt-6">
  <div className="flex justify-between items-center mb-6 mt-6 px-2">
    <h1 className="text-2xl font-bold">Products</h1>

    <div className="flex gap-2 md:gap-4">
      <FilterBar setCategory={setCategory} setSearchTerm={setSearchTerm} />
    </div>
  </div>
</div>
        {/* Product Grid */}
        <div className="product-grid grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;