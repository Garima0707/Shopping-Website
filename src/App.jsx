import { Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/CartPage';
import ProductDetail from './pages/ProductDetail';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

function App() {
  const location = useLocation(); // ✅ Get current path

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
      </Routes>
    </>
  );
}

export default App;
