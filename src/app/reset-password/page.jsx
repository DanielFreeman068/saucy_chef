'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setMessage('Missing token in URL');
            return;
        }

        try {
            const res = await fetch('http://localhost:4000/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage('✅ Password reset successful!');
                alert("Password Successfully Reset!")
                router.push('/');
            } else {
                setMessage(data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Frontend error:', err);
            setMessage('Error resetting password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            {/* cancel button */}
            <button
                type="button"
                onClick={() => router.push('/')}
                className="absolute top-3 left-3 px-4 py-2 bg-[#7F0B04] hover:bg-[#a1312b] text-white rounded-sm transition"
            >
                Cancel
            </button>

            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#7F0B04]">Reset Password</h1>
                {message && <p className="mb-4 text-center text-sm text-red-500">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#7F0B04] hover:bg-[#a1312b] text-white rounded-sm transition py-3 font-semibold"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}