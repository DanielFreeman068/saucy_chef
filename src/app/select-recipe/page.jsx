'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect } from 'react';


const recipes = [
    'Avocado Toast',
    'Chicken Salad',
    'Spaghetti Bolognese',
    'Pancakes',
    'Grilled Cheese',
    'Taco Bowl',
    'Fruit Smoothie'
    ];

    export default function SelectRecipe() {

    const searchParams = useSearchParams();
    const router = useRouter();

       //Checking for JWT Token
            useEffect(() => {
                const token = localStorage.getItem('token');
        
                if (!token) {
                router.push('/'); // no token = redirect
                return;
                }
            }, []);

    const day = searchParams.get('day');
    const meal = searchParams.get('meal');

    const handleRecipeSelect = useCallback((recipe) => {
        const key = `${day}-${meal}`;
        const existing = localStorage.getItem('mealPlan');
        const parsed = existing ? JSON.parse(existing) : {};
        parsed[key] = recipe;
        localStorage.setItem('mealPlan', JSON.stringify(parsed));
        router.push('/meal-planner');
        router.refresh();
    }, [day, meal, router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-pink-300">
            Select a Recipe for {meal} on {day}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {recipes.map((recipe) => (
            <button
                key={recipe}
                onClick={() => handleRecipeSelect(recipe)}
                className="bg-white p-4 rounded-xl shadow hover:bg-blue-100 transition text-pink-300"
            >
                {recipe}
            </button>
            ))}
        </div>
        <div className="mt-6 text-center">
            <Link href="/meal-planner" className="text-blue-500 hover:underline">
            Cancel
            </Link>
        </div>
        </div>
    );
}
