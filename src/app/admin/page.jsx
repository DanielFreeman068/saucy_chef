'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Navbar from '../components/NavBar';

export default function AdminPage() {
const [showModal, setShowModal] = useState(true);
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [isUnlocking, setIsUnlocking] = useState(false);

const correctPassword = '123'; // 🔒 You can move this to an env variable later

const handleSubmit = (e) => {
    e.preventDefault();

    if (password === correctPassword) {
    setIsUnlocking(true);
    setTimeout(() => {
        setShowModal(false);
    }, 400); 
    } else {
    setError('Incorrect password. Try again.');
    }
};

return (
    <div className="relative h-screen w-screen overflow-hidden">
        <Navbar page="Admin Dashboard"/>
    {/* Modal Overlay */}
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
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
            Unlock
            </button>
        </form>
        </div>
    )}

    {/* Admin Page Content */}
    <div className={clsx('h-full w-full transition-filter duration-500', showModal ? 'blur-md' : 'blur-0')}>
        <div className="p-12">
        <h1 className="text-4xl font-bold text-[#7F0B04] mb-6">Admin Dashboard</h1>
        <p className="text-lg">Welcome to the secure admin area.</p>
        
        </div>
    </div>
    </div>
);
}