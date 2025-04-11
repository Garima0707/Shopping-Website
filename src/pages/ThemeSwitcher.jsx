import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    document.body.className = ''; // clear all first
    document.body.classList.add(selectedTheme);
  };

  return (
    <div className="theme-switcher">
      <select onChange={handleThemeChange}>
        <option value="">🌈 Choose Theme</option>
        <option value="theme-purple-blue">Purple-Blue</option>
        <option value="theme-pink-orange">Pink-Orange</option>
        <option value="theme-ocean-green">Ocean-Green</option>
      </select>
    </div>
  );
}

export default ThemeSwitcher;
