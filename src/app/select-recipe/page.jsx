'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import meals from '../../../backend/data/recipes.json';
import DishesSelect from "../components/DishesSelect.jsx";
import Footer from '../components/Footer.jsx';
import NavBar from '../components/NavBar.jsx';

export default function SelectRecipe() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [mealPlan, setMealPlan] = useState({});
    const [selectedCategory, setSelectedCategory] = useState('All');

    const day = searchParams.get('day');
    const meal = searchParams.get('meal');

    // Unique categories from meals
    const categories = ['All', ...new Set(meals.map(meal => meal.Category))];

    // Filtered meals
    const filteredMeals = selectedCategory === 'All' ? meals : meals.filter(meal => meal.Category === selectedCategory);

    // Check for token and fetch current meal plan from backend
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        router.push('/');
        return;
        }

        const fetchMealPlan = async () => {
        try {
            const res = await fetch('http://localhost:4000/api/users/meal-plan', {
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
    }, [router]);

    // Handle recipe selection and update backend meal plan
    const handleRecipeSelect = async (recipe) => {
        const token = localStorage.getItem('token');
        const key = `${day}-${meal}`;
        const updatedMealPlan = { ...mealPlan, [key]: recipe };

        try {
            const res = await fetch('http://localhost:4000/api/users/meal-plan', {
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
                        />
                    </button>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}
