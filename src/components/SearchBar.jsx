import { useState } from 'react';
import { Search } from 'lucide-react';
import '../styles/SearchBar.css';

function SearchBar({ setSearchTerm }) {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="search-bar">
      <button
        className="search-icon-button"
        onClick={() => setShowInput(!showInput)}
        title="Search Products"
      >
        <Search size={20} />
      </button>

      {showInput && (
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
    </div>
  );
}

export default SearchBar;
