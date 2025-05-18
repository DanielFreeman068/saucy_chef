'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar'
import Footer from '../components/Footer.jsx'

export default function Home() {
    const router = useRouter();

    //Checking for JWT Token
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
        router.push('/'); // no token = redirect
        return;
        }
    }, []);

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
        alert(`Deleted meal plan for ${meal} on ${day}`)
        setSelectedRecipes(updated);
        localStorage.setItem('mealPlan', JSON.stringify(updated));
    };

    const clearAllMeals = () => {
        setSelectedRecipes({});
        localStorage.removeItem('mealPlan');
        alert("Weekly Meal Plan has been reset!")
    };

    return (
        <div>
            <NavBar page="Weekly Meal Planner"></NavBar>

            {/* meal planner section */}
            <div className="flex flex-col gap-16 px-4 mt-8">
                {days.map((day) => (
                <div key={day} className="bg-[#F4E2CE] rounded-2xl shadow-lg p-6 flex flex-col">
                    <h2 className="text-2xl font-semibold text-start text-[#953306] mb-4">{day}</h2>
                    <div className="flex flex-col md:flex-row justify-evenly gap-4">
                    {meals.map((meal) => {
                        const key = `${day}-${meal}`;
                        const recipe = selectedRecipes[key];

                        return (
                        <div key={meal} className="bg-white w-full h-[160px] rounded-xl p-4">
                            <div className="flex justify-center align-center h-full items-center">
                                <div className="flex flex-col gap-4 text-center">
                                    {!recipe && 
                                        (meal === "Breakfast" ? (
                                        <Image
                                            src="/mealIcons/breakfast.png"
                                            alt="Breakfast"
                                            width={34}
                                            height={34}
                                            className='mx-auto'
                                        />
                                        ) : meal === "Lunch" ? (
                                        <Image
                                            src="/mealIcons/lunch.png"
                                            alt="Lunch"
                                            width={34}
                                            height={34}
                                            className='mx-auto'
                                        />
                                        ) : meal === "Dinner" ? (
                                        <Image
                                            src="/mealIcons/dinner.png"
                                            alt="Dinner"
                                            width={34}
                                            height={34}
                                            className='mx-auto'
                                        />
                                        ) : (
                                        <p>Invalid meal type</p>
                                        ))
                                    }
                                    <span className="font-medium text-[#953306]">{meal}</span>
                                    <div className="flex items-center gap-2 mx-auto">
                                        {recipe && (
                                        <button
                                            onClick={() => deleteMeal(day, meal)}
                                            className="text-red-500 hover:text-red-700 text-sm text-center"
                                        >
                                            - Delete
                                        </button>
                                        )}
                                        <Link
                                        href={`/select-recipe?day=${day}&meal=${meal}`}
                                        className={`text-[#953306] hover:text-[#DFBC94] items-center gap-2 ${recipe ? 'hidden' : 'flex'}`}
                                        >
                                        <h1 className='text-2xl'>+</h1>
                                        <h1 className='text-md'>Add Meal</h1>
                                        </Link>
                                    </div>
                                    {recipe && (
                                        <h1 className="text-sm text-gray-700">{recipe.Name}</h1>
                                    )}
                                </div>
                            </div>
                        </div>
                        );
                    })}
                    </div>
                </div>
                ))}
            </div>

            {/* clear all button */}
            <div className="flex justify-center mb-8">
                <button
                onClick={clearAllMeals}
                className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition"
                >
                Clear All
                </button>
            </div>
            <Footer/>
        </div>
    );
}
