    'use client';

    import { useState } from 'react';
    import clsx from 'clsx';
    import Navbar from '../components/NavBar';
    import Link from 'next/link'

    export default function AdminPage() {

    // === State Definitions ===
    const [showModal, setShowModal] = useState(true); // Controls modal visibility
    const [password, setPassword] = useState('');     // Tracks input value
    const [error, setError] = useState('');           // Holds error message
    const [isUnlocking, setIsUnlocking] = useState(false); // Triggers fade transition

    const correctPassword = '123';

    // === Handle Password Submit ===
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password === correctPassword) {
        setIsUnlocking(true);
        setTimeout(() => {
            setShowModal(false);
        }, 400); // Match transition duration
        } else {
        setError('Incorrect password. Try again.');
        }
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden">
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
            <div className="p-12">
            <p className="text-lg">Welcome to the secure admin area.</p>
            </div>
        </div>
        </div>
    );
    }
