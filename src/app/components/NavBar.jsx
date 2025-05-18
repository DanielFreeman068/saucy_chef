    'use client'
    import { useState, useRef, useEffect } from 'react';
    import { Menu, Search, Bell } from 'lucide-react';
    import Image from "next/image";
    import Link from 'next/link'

    export default function Navbar({ page }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isSelect, setIsSelect] = useState(false)

    if (!page){
        page = "The Saucy Chef"
    }

    useEffect(()=>{
        if(page === "Select Recipe"){
        setIsSelect(true)
        
    }
    })
    

    // Close dropdown when clicking outside
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

    const handleLogout = () => {
        localStorage.clear(); 
        window.location.href = '/'; 
        };

    return (
        <div className="w-full">
        {/* Navbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#F4E2CE] shadow-lg shadow-[#00000033]">
            <div className="relative" ref={dropdownRef}>
            
            {isSelect ? (
                <div className="flex flex-row gap-6">
                        <Link href="/meal-planner" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">
                            Cancel
                        </Link>
                    </div>
                ) : (
                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#6e2604] hover:text-[#53230c]">
                    <Menu size={46} />
                </button>
            )}
            
            
            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden">
                <div className="py-1">
                    <a href="/explore" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Explore Recipes</a>
                    <a href="/create-recipe" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create Recipe</a>
                    <a href="/meal-planner" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Week</a>
                    <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Login</a>
                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Logout</button>


                </div>
                </div>
            )}
            </div>
            
            {/* Brand/Logo */}
            <div className="text-center text-[#953306] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">{page}</div>
            
            {/* Right side icons */}
            <div className="flex items-center space-x-3">
            <Image
                src="/saucy_chef_logo2.png"
                alt="Saucy Chef Logo"
                width={100}
                height={100}
                className="w-[50px] md:w-[60px] lg:w-[80px]"
                />
            </div>
        </div>
        </div>
    );
    }