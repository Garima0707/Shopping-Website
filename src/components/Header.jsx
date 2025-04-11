import { useCart } from '../context/CartContext';
import React, { useState, useEffect } from 'react';
import { Menu, Home, ShoppingCart, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png'; 
import '../styles/Header.css'; 
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const menuItems = [
    { name: 'Home', icon: <Home size={18} />, link: '/home' },
    { name: 'Cart', icon: <ShoppingCart size={18} />, link: '/cart' },
    { name: 'Profile', icon: <User size={18} />, link: '/profile' },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const { cartItems } = useCart();
const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="overlay"
          />
        )}
      </AnimatePresence>

      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="store-name">
            <h3>The Clothing Store</h3>
          </div>

          <div className="menu-button-wrapper">
            <button onClick={toggleSidebar} className="menu-button">
              <Menu size={22} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="dropdown"
                >
                  <ul className="menu-list">
                  {menuItems.map((item, index) => (
  <motion.li
    key={item.name}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <a href={item.link} className="menu-item">
      <div className="icon-with-badge">
        {item.icon}
        {item.name === 'Cart' && totalItems > 0 && (
          <span className="floating-badge">{totalItems}</span>
        )}
      </div>
      {item.name}
    </a>
  </motion.li>
))}


                    <motion.li
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: menuItems.length * 0.05 }}
                    >
                      <button onClick={logout} className="menu-item logout">
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
