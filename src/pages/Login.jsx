import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const formRef = useRef(null);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  // Trigger shake animation on error
  const triggerShake = () => {
    if (formRef.current) {
      formRef.current.classList.remove('shake');
      void formRef.current.offsetWidth;
      formRef.current.classList.add('shake');
      setTimeout(() => {
        formRef.current.classList.remove('shake');
      }, 500);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      });

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        toast.success("Login Successful!!");
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        setError('Login failed: No token received');
        triggerShake();
      }
    } catch (err) {
      setError('Invalid username or password!');
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" ref={formRef} onSubmit={handleLogin}>
        <h2>Welcome Back </h2>

        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={4}
          required
        />

        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={4}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="error-msg">{error}</p>}
      </form>

      <ToastContainer position="bottom-center" autoClose={2000}/>
    </div>
  );
}

export default Login;
