'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Navbar from '../components/NavBar';
import Link from 'next/link';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  // === State Definitions ===
  const [showModal, setShowModal] = useState(true); // Controls modal visibility
  const [password, setPassword] = useState('');     // Tracks input value
  const [error, setError] = useState('');           // Holds error message
  const [isUnlocking, setIsUnlocking] = useState(false); // Triggers fade transition
  const [users, setUsers] = useState([]);
  const [meals, setMeals] = useState([]);
  const router = useRouter();

  const correctPassword = '123';

  const loadMeals = async () => {
    try {
      const res = await fetch('https://saucy-chef-backend.onrender.com/api/create-recipe/all-recipes');
      const data = await res.json();
      setMeals(data); 
    } catch (err) {
      console.error('Failed to load meals:', err);
    }
  };

  useEffect(() => {
    loadMeals();
  }, []);

  // === Handle Password Submit ===
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
      setIsUnlocking(true);
      setTimeout(() => {
        setShowModal(false);
        fetchUsers();
      }, 400); // Match transition duration
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('https://saucy-chef-backend.onrender.com/api/users/get-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword: correctPassword}),
      });

      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        alert('Invalid admin password for API');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const res = await fetch('https://saucy-chef-backend.onrender.com/api/users/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminPassword: correctPassword,
          userId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        fetchUsers();
      } else {
        alert('Failed to delete user: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Request failed.');
    }
  };

  const handleDeleteRecipe = async (idMeal) =>{
    const confirmDelete = confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;

    try {
      const res = await fetch('https://saucy-chef-backend.onrender.com/api/create-recipe/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminPassword: correctPassword,
          idMeal,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message);
        loadMeals()
        router.refresh()
      } else {
        alert('Failed to delete user: ' + data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Request failed.');
    }
  }

  return (
    <div className="relative h-screen w-screen overflow-x-hidden">
      {/* === Navbar === */}
      <Navbar page="Admin Dashboard" />

      {/* === Password Modal Overlay === */}
      {showModal && (
        <div
          className={clsx(
            'absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 transition-opacity duration-500',
            isUnlocking ? 'opacity-0 pointer-events-none' : 'opacity-100'
          )}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg text-center w-80 animate-fade-in"
          >
            <h2 className="text-xl font-semibold mb-4">Enter Admin Password</h2>

            {/* Password Input */}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Password" />

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="w-full py-2 mb-4 bg-[#B53325] text-white rounded hover:bg-[#792319] transition" > Unlock </button>
            <Link href="/explore"><button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" > Back </button></Link>
          </form>
        </div>
      )}

      {/* === Admin Content Area === */}
      <div
        className={clsx(
          'h-full w-full transition-filter duration-500',
          showModal ? 'blur-md' : 'blur-0'
        )}
      >
        <div className="container mx-auto p-6 max-w-6xl">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Users</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {users.map(user => (
                <div 
                    key={user._id || user.id} 
                    className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center border border-gray-200"
                >
                    <span className="text-gray-700 truncate">{user.email}</span>
                    <button 
                    onClick={() => handleDeleteUser(user._id || user.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    aria-label="Delete user"
                    >
                    <Trash size={18} />
                    </button>
                </div>
                ))}
            </div>
          </section>
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Recipes</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-[40vh] overflow-y-auto">
                <div className="w-full">
                  <div className="bg-gray-50 sticky top-0 z-10 flex">
                    <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-1">ID</div>
                    <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex-1">Name</div>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {meals.map(meal => (
                      <div key={meal.idMeal} className="hover:bg-gray-50 flex">
                        <div className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex-1">{meal.idMeal}</div>
                        <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1">{meal.Name}</div>
                        <button 
                          onClick={() => handleDeleteRecipe(meal.idMeal)}
                          className="p-2 h-[50px] w-[50px] flex justify-center items-center text-red-500 hover:bg-red-100 rounded-full transition-colors"
                          aria-label="Delete user"
                          >
                          <Trash size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}