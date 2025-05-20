'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const endpoint = isLogin ? 'https://saucy-chef-backend.onrender.com/api/login/login': 'https://saucy-chef-backend.onrender.com/api/signup/register';
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
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left: Veggie Image */}
      <div className="hidden w-2/3 lg:flex h-full relative">
        {/* Overlay Box */}
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="bg-[#0000009d] p-18 mx-2 rounded-md text-center max-w-2xl">
            <Image src="/saucy_chef_logo2.png" alt="Saucy Chef Logo" width={120} height={120} className="w-[50px] md:w-[60px] lg:w-[150px] mx-auto mb-14" />
            <h1 className="text-white text-5xl md:text-7xl font-bold mb-14">The Saucy Chef</h1>
            <h3 className="text-white text-2xl md:text-3xl mb-8">Discover, save, and plan amazing recipes</h3>
            <h5 className="text-white text-lg md:text-lg">Join thousands of home cooks discovering new flavors every day.</h5>
          </div>
        </div>

        {/* Background Image */}
        <img src="/veggies.jpg" alt="Vegetables" className="w-full h-screen object-cover" />
      </div>

      {/* Right: Form Section */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center items-center bg-white px-2">
        <div className="m-12 px-10 py-12 shadow-lg shadow-[#636363] rounded-md w-full max-w-md flex flex-col items-center justify-center">


        {/* Toggle Buttons */}
        <div className="relative flex items-center justify-center mb-8 w-80 bg-gray-200 rounded-sm pl-1 p-1">
        {/* Animated background */}
        <div className={`absolute top-1 left-1 w-[calc(63%-2.9rem)] h-[calc(100%-0.5rem)] bg-white rounded-sm transition-all duration-300 ease-in-out ${ !isLogin ? 'translate-x-full' : '' }`} />

        {/* Buttons */}
        <button onClick={() => setIsLogin(true)} className={`z-10 flex-1 py-2 px-2 text-center font-medium rounded-sm transition-colors ${ isLogin ? 'text-[#7F0B04]' : 'text-gray-500' }`} >
          Login
        </button>

        <button onClick={() => setIsLogin(false)} className={`z-10 flex-1 py-2 px-2 text-center font-medium rounded-sm transition-colors ${ !isLogin ? 'text-[#7F0B04]' : 'text-gray-500' }`} >
          Sign Up
        </button>
      </div>

        {/* Titles */}
        <div className="mb-6 text-center max-w-md mx-auto">
          {isLogin ? (
            <h2 className="text-2xl leading-relaxed mb-12">Welcome Back!</h2>
          ) : (
            <p className="text-base mb-6 leading-relaxed break-words">
              Be part of a community that's making cooking simple, joyful, and stress-free—one recipe at a time.
            </p>
          )}
          <h2 className="text-2xl text-dark-blue font-semibold uppercase">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit} className="w-80">
          <label htmlFor="email" className="block text-sm text-gray-700 font-semibold text-left mb-1">
            Email:
          </label>
          <input type="email" id="email" name="email" required placeholder="Enter your email" className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200" value={formData.email} onChange={handleChange} />


          <label htmlFor="password" className="block text-sm text-gray-700 font-semibold text-left mb-1">
            Password:
          </label>
          <input type="password" id="password" name="password" required placeholder={isLogin ? "Enter your password" : "Create a password"} className="w-full py-2 px-3 mb-4 border border-gray-300 rounded-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200" value={formData.password} onChange={handleChange} />


          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button type="submit" className="w-full p-2 mt-6 bg-[#7F0B04] hover:bg-[#a1312b] text-white rounded-sm transition" >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <Link href="/forgot-password" className='flex justify-center text-blue-700 text-sm mt-6 hover:underline'>forgot password</Link>
        </form>
      </div>
      </div>
    </div>
  );
}