'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyResetCodePage() {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    useEffect(() => {
        if (!email) {
            router.push('/forgot-password');
        }
    }, [email, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Verify code
            const verifyRes = await fetch('https://saucy-chef-backend.onrender.com/api/auth/verify-reset-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) {
                setMessage(verifyData.message || 'Invalid code');
                return;
            }

            // Step 2: Reset password
            const resetRes = await fetch('https://saucy-chef-backend.onrender.com/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code, password }),
            });

            const resetData = await resetRes.json();
            if (resetRes.ok) {
                alert('Password reset successful!');
                router.push('/');
            } else {
                setMessage(resetData.message || 'Failed to reset password');
            }
        } catch (err) {
            console.error(err);
            setMessage('Something went wrong');
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
                <h1 className="text-2xl font-bold mb-6 text-center text-[#7F0B04]">Verify Reset Code</h1>
                {message && <p className="text-center mb-4 text-sm text-red-500">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        maxLength={6}
                        placeholder="Enter 6-digit code"
                        value={code}
                        onChange={e => setCode(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
