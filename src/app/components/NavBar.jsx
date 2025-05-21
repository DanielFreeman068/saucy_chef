    'use client';

    import { useState, useRef, useEffect } from 'react';
    import { Menu } from 'lucide-react';
    import Image from "next/image";
    import Link from 'next/link';
import { urlToUrlWithoutFlightMarker } from 'next/dist/client/components/router-reducer/fetch-server-response';


    export default function Navbar({ page }) {
    const [isOpen, setIsOpen] = useState(false);           // Controls dropdown visibility
    const [isSelect, setIsSelect] = useState(false);       // Tracks if current page is "Select Recipe"
    const dropdownRef = useRef(null);                      // Ref for detecting outside clicks

    // Default page title if not provided
    if (!page) {
        page = "The Saucy Chef";
    }

    // Detect if current page is "Select Recipe" to render custom UI
    useEffect(() => {
        if (page === "Select Recipe") {
        setIsSelect(true);
        }
    });

    // Close dropdown if clicking outside of the dropdown area
    useEffect(() => {
        function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Clears localStorage and redirects user to login page
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/';
    };

    return (
        <div className="w-full">
        {/* Navbar Container */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#F4E2CE] shadow-lg shadow-[#00000033]">
            
            {/* === Left Section: Menu or Cancel Button === */}
            <div className="relative" ref={dropdownRef}>
            {isSelect ? (
                // "Cancel" button for recipe selection page
                <div className="flex flex-row gap-6">
                <Link
                    href="/meal-planner"
                    className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center"
                >
                    Cancel
                </Link>
                </div>
            ) : (
                // Hamburger menu icon (Menu from lucide-react)
                <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 cursor-pointer text-[#6e2604] hover:text-[#53230c]"
                >
                <Menu size={46} />
                </button>
            )}

            {/* === Dropdown Menu === */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                <div>
                    <a href="/explore" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Explore Recipes</a>
                    <a href="/create-recipe" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create Recipe</a>
                    <a href="/meal-planner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Week</a>
                    <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Login</a>
                    <button onClick={handleLogout} className="block w-full text-left cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
                </div>
            )}
            </div>

            {/* === Center: Page Title === */}
            <div className="text-center text-[#953306] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            {page}
            </div>

            {/* === Right: Logo === */}
            <div className="flex items-center space-x-3">
            <Link
                href="/explore"
            >
                <Image
                    src="/saucy_chef_logo2.png"
                    alt="Saucy Chef Logo"
                    width={100}
                    height={100}
                    className="w-[50px] md:w-[60px] lg:w-[80px] cursor-pointer"
                />
            </Link>
            </div>
        </div>
        </div>
    );
    }
