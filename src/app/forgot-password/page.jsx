'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('https://saucy-chef-backend.onrender.com/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            } else {
                setMsg(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Error:', err);
            setMsg('Failed to send reset code');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <button
                type="button"
                onClick={() => router.push('/')}
                className="absolute top-3 left-3 px-4 py-2 bg-[#7F0B04] hover:bg-[#a1312b] text-white rounded-sm transition"
            >
                Cancel
            </button>

            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#7F0B04]">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button
                        className="w-full bg-[#7F0B04] hover:bg-[#a1312b] text-white rounded-sm transition py-3 font-semibold"
                        type="submit"
                    >
                        Send Code
                    </button>
                    {msg && <p className="text-sm text-center text-gray-600">{msg}</p>}
                </form>
            </div>
        </div>
    );
}
