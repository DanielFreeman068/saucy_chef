'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';
import DishCard from "../components/DishCard.jsx";

// Importing mock data from backend
import meals from '../../../backend/data/recipes.json';

const ExplorePage = () => {
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState('All');

    // Unique categories from meals
    const categories = ['All', ...new Set(meals.map(meal => meal.Category))];

    // Redirect to home page if not authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        router.push('/');
        }
    }, []);

    // Filtered meals
    const filteredMeals = selectedCategory === 'All' ? meals : meals.filter(meal => meal.Category === selectedCategory);

    return (
        <>
        <div className='min-h-screen flex flex-col'>
            {/* === Navigation Bar === */}
            <NavBar page="Explore Recipes" />
            <div className='flex-grow'>

                {/* === Filter Controls === */}
                <div className="flex justify-center mt-10 mb-16 flex-wrap gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`px-4 py-2 rounded-full shadow ${selectedCategory === category ? 'bg-[#953306] text-white' : 'bg-[#F4E2CE] text-[#953306]'}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
                </div>

                {/* === Recipes Grid Section === */}
                <div className="flex flex-wrap justify-center gap-20 mt-10 px-4">
                {filteredMeals.map((meal) => (
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
        </div>
        </>
    );
};

export default ExplorePage;
