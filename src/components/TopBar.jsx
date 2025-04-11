import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import '../styles/TopBar.css';

function TopBar({ setCategory, setSearchTerm }) {
  return (
    <div className="top-bar">
      <div className="icon-row">
        <SearchBar setSearchTerm={setSearchTerm} />
        <FilterBar setCategory={setCategory} />
      </div>
    </div>
  );
}

export default TopBar;
