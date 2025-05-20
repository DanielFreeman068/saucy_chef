'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import meals from '../../../backend/data/recipes.json';
import DishesSelect from "../components/DishesSelect.jsx";
import Footer from '../components/Footer.jsx';
import NavBar from '../components/NavBar.jsx';

export default function SelectRecipe() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [mealPlan, setMealPlan] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchText, setSearchText] = useState('');

    const day = searchParams.get('day');
    const meal = searchParams.get('meal');

    // Unique categories from meals
    const categories = ['All', 'Favorites', ...new Set(meals.map(meal => meal.Category))];

    // Filtering logic by category n search query
    const baseMeals =
        selectedCategory === 'Favorites'
            ? favorites
            : selectedCategory === 'All'
            ? meals
            : meals.filter(meal => meal.Category === selectedCategory);

    const filteredMeals = baseMeals.filter(meal =>
        meal.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Check for token and fetch current meal plan from backend
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        router.push('/');
        return;
        }

        const fetchMealPlan = async () => {
        try {
            const res = await fetch('https://saucy-chef-backend.onrender.com/api/users/meal-plan', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
            const data = await res.json();
            setMealPlan(data.mealPlan || {});
            } else {
            console.error('Failed to fetch meal plan');
            }
        } catch (err) {
            console.error('Failed to fetch meal plan', err);
        }
        };

        fetchMealPlan();

        const fetchFavorites = async () => {
            try {
                const res = await fetch('https://saucy-chef-backend.onrender.com/api/users/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Failed to fetch favorites');

                const data = await res.json();

                // Convert meal ids to strings for consistent comparison
                const favMeals = meals.filter(meal => data.favs.includes(meal.idMeal.toString()));
                setFavorites(favMeals);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoadingFavorites(false);
            }
        };

        fetchFavorites();
    }, [router]);

    // Handle recipe selection and update backend meal plan
    const handleRecipeSelect = async (recipe) => {
        const token = localStorage.getItem('token');
        const key = `${day}-${meal}`;
        const updatedMealPlan = { ...mealPlan, [key]: recipe };

        try {
            const res = await fetch('https://saucy-chef-backend.onrender.com/api/users/meal-plan', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ mealPlan: updatedMealPlan }),
            });

            if (res.ok) {
            setMealPlan(updatedMealPlan);
            router.push('/meal-planner');
            } else {
            console.error('Failed to update meal plan');
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
        <div className='min-h-screen flex flex-col'>
            <NavBar page="Select Recipe" />
            <div className='flex-grow'>

                {/* Search Input */}
                <div className="flex justify-center mt-10 mb-8 gap-2">
                    <input
                        type="text"
                        placeholder="Search by recipe name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-64 px-4 py-2 border border-[#953306] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#953306]"
                    />
                    <button
                        onClick={() => setSearchQuery(searchText)}
                        className="bg-[#953306] text-white px-4 py-2 rounded-lg shadow hover:bg-[#7a2802]"
                    >
                        Search
                    </button>
                </div>

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

                {/* Loading and empty states */}
                {selectedCategory === 'Favorites' && loadingFavorites && (
                    <p className="text-center text-[#953306]">Loading favorites...</p>
                )}

                {!loadingFavorites && (
                    filteredMeals.length === 0 ? (
                        <p className="text-center text-[#953306]">No recipes found.</p>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-20 mt-24 px-4">
                            {filteredMeals.map((meal) => (
                            <button
                                key={meal.idMeal}
                                onClick={() => handleRecipeSelect(meal)}
                                className="hover:cursor-pointer transform transition-transform duration-200 hover:scale-105"
                            >
                                <DishesSelect
                                name={meal.Name}
                                location={meal.Area}
                                image={meal.Image}
                                category={meal.Category}
                                isFavorite={favorites.some(fav => fav.idMeal.toString() === meal.idMeal.toString())}
                                />
                            </button>
                            ))}
                        </div>
                    )
                )}
            </div>
            <Footer />
        </div>
        </>
    );
}
