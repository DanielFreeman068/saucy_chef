'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleForm = () => {
    setIsLogin(prev => !prev);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const endpoint = isLogin ? 'http://localhost:4000/api/login/login': 'http://localhost:4000/api/signup/register';
      console.log(endpoint)
      // Both login and signup only need email and password
      const dataToSend = { 
        email: formData.email, 
        password: formData.password,
        // For signup, include empty favs array
        ...(isLogin ? {} : { favs: [] })
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store user and token, then navigate to explore
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        router.push('/explore');
      } else {
        setError(data.message || (isLogin ? 'Login failed' : 'Signup failed'));
      }
    } catch (err) {
      console.error(`Error during ${isLogin ? 'login' : 'signup'}:`, err);
      setError(`An error occurred during ${isLogin ? 'login' : 'signup'}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 relative overflow-hidden">

      <div className="relative flex w-11/12 max-w-4xl bg-white bg-opacity-10 border border-white/20 rounded-xl shadow-lg overflow-hidden">
        {/* Form Container */}
        <div className="flex-1 p-10 flex flex-col justify-center items-center text-center">
          <div className="flex items-center justify-center mb-6 w-full">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                isLogin 
                  ? 'bg-dark-blue text-white' 
                  : 'bg-gray-200 text-gray-700'
              } rounded-l-full`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                !isLogin 
                  ? 'bg-dark-blue text-white' 
                  : 'bg-gray-200 text-gray-700'
              } rounded-r-full`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="mb-5 text-2xl text-dark-blue font-semibold uppercase">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          
          <form onSubmit={handleSubmit} className="w-80">
            <label htmlFor="email" className="block text-sm text-gray-700 font-semibold text-left mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
              value={formData.email}
              onChange={handleChange}
            />

            <label htmlFor="password" className="block text-sm text-gray-700 font-semibold text-left mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200"
              value={formData.password}
              onChange={handleChange}
            />

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full p-2 mt-6 bg-dark-blue text-blue-500 rounded-full hover:bg-hl-blue hover:text-dark-blue transition"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}