'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];

    const [selectedRecipes, setSelectedRecipes] = useState({});

    useEffect(() => {
        const saved = localStorage.getItem('mealPlan');
        if (saved) {
        setSelectedRecipes(JSON.parse(saved));
        }
    }, []);

    const deleteMeal = (day, meal) => {
        const key = `${day}-${meal}`;
        const updated = { ...selectedRecipes };
        delete updated[key];
        setSelectedRecipes(updated);
        localStorage.setItem('mealPlan', JSON.stringify(updated));
    };

    const clearAllMeals = () => {
        setSelectedRecipes({});
        localStorage.removeItem('mealPlan');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-pink-300">Weekly Meal Planner</h1>

        <div className="flex justify-center mb-8">
            <button
            onClick={clearAllMeals}
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
            >
            Clear All
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {days.map((day) => (
            <div key={day} className="bg-white rounded-2xl shadow-lg p-5 flex flex-col">
                <h2 className="text-2xl font-semibold text-center text-pink-300 mb-4">{day}</h2>
                <div className="flex flex-col gap-4">
                {meals.map((meal) => {
                    const key = `${day}-${meal}`;
                    const recipe = selectedRecipes[key];

                    return (
                    <div key={meal} className="bg-gray-100 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                        <span className="font-medium text-pink-300">{meal}</span>
                        <div className="flex items-center gap-2">
                            {recipe && (
                            <button
                                onClick={() => deleteMeal(day, meal)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Delete
                            </button>
                            )}
                            <Link
                            href={`/select-recipe?day=${day}&meal=${meal}`}
                            className="text-blue-600 hover:underline text-sm"
                            >
                            {recipe ? 'Change' : '+ Add'}
                            </Link>
                        </div>
                        </div>
                        {recipe && <p className="mt-2 text-sm text-gray-700 italic">{recipe}</p>}
                    </div>
                    );
                })}
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}
