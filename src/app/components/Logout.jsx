'use client'
import React from 'react'

const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.clear(); //Clears all localStorage keys
        window.location.href = '/'; // redirect to login page
        };
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton