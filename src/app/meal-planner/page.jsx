'use client';

import Link from 'next/link';
import Image from 'next/image';
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
        <div>
            {/* header section */}
            <div className="relative w-full h-[150px] bg-[#F4E2CE] overflow-hidden shadow-lg shadow-[#00000033]">
                {/* Bottom Left Bowl */}
                <Image
                    src="/curry.png"
                    alt="Bottom Bowl"
                    width={250}
                    height={250}
                    className="absolute bottom-0 left-0 w-[130px] md:w-[200px] z-0"
                />
        
                {/* Top Right Bowl */}
                <Image
                    src="/acai.png"
                    alt="Top Bowl"
                    width={250}
                    height={250}
                    className="absolute top-0 right-0 w-[130px] md:w-[200px] z-0"
                />
        
                <div className="relative z-10 flex items-center flex-col sm:flex-row justify-evenly align-center h-full w-full shadow-lg">
                    <div className="flex justify-evenly items-center gap-5 sm:gap-10 md:gap-20 lg:gap-32 xl:gap-48">
                    <Image
                        src="/saucy_chef_logo2.png"
                        alt="Saucy Chef Logo"
                        width={100}
                        height={100}
                        className="w-[50px] md:w-[80px] lg:w-[100px]"
                    />
                    <h1 className="text-[#953306] text-xl sm:text-2xl md:text-3xl lg:text-4xl">Weekly Meal Planner</h1>
                    </div>
                    <div className="flex flex-row gap-6">
                    <a href="/" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">Create</a>
                    <a href="/meal-planner" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">Explore Recipes</a>
                    </div>
                </div>
            </div>

            {/* meal planner section */}
            <div className="flex justify-center mb-8">
                <button
                onClick={clearAllMeals}
                className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
                >
                Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
