import { useEffect, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import '../styles/ProductCard.css';

function FilterBar({ setCategory, setSearchTerm }) {
  const [categories, setCategories] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('https://fakestoreapi.com/products/categories');
      const data = await res.json();
      setCategories(['all', ...data]);
    };
    fetchCategories();
  }, []);

  return (
    <div className="top-bar">
      <div className="icon-row">
        {/* Search Icon + Input */}
        <div className="search-bar">
          <button
            className="search-icon-button"
            onClick={() => setShowSearch(!showSearch)}
            title="Search Products"
          >
            <Search size={20} />
          </button>
          {showSearch && (
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>

        {/* Filter Icon + Dropdown */}
        <div className="filter-bar">
          <button
            className="filter-icon-button"
            onClick={() => setShowFilters(!showFilters)}
            title="Toggle Filters"
          >
            <Filter size={22} />
          </button>
          {showFilters && (
            <div className="filter-options">
              <select onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
