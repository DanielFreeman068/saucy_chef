'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from 'next/link';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';
import DishCard from "../components/DishCard.jsx";

// Importing mock data from backend
import meals from '../../../backend/data/recipes.json';


const ExplorePage = () => {
const router = useRouter();

// Redirect to home page if not authenticated
useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
    router.push('/');  // Redirect unauthenticated users
    return;
    }
}, []);

return (
    <>
    <div>
        {/* === Navigation Bar === */}
        <NavBar page="Explore Recipes" />

        {/* === Recipes Grid Section === */}
        <div className="flex flex-wrap justify-center gap-20 mt-24 px-4">
        {meals.map((meal) => (
            <DishCard 
            key={meal.idMeal}
            id={meal.idMeal}
            name={meal.Name}
            location={meal.Area}
            image={meal.Image}
            category={meal.Category}
            />
        ))}
        </div>
    </div>

    {/* === Footer Section === */}
    <Footer />
    </>
);
};

export default ExplorePage;
