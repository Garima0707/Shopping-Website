import { Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  return (
    <>
      {/* Show Header only if not on login page */}
      {location.pathname !== '/' && <Header />}

      <ToastContainer />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
