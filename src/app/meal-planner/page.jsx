'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';

export default function Home() {
    const router = useRouter();

    // Check for JWT token on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
        router.push('/');
        }
    }, [router]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];

    const [selectedRecipes, setSelectedRecipes] = useState({});

    // Fetch meal plan from backend
    useEffect(() => {
        const fetchMealPlan = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await fetch('http://localhost:4000/api/users/meal-plan', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });

            if (res.ok) {
            const data = await res.json();
            setSelectedRecipes(data.mealPlan || {});
            } else {
            console.error('Failed to fetch meal plan');
            }
        } catch (error) {
            console.error('Error fetching meal plan:', error);
        }
        };

        fetchMealPlan();
    }, []);

    // Delete a single meal from meal plan in backend
    const deleteMeal = async (day, meal) => {
        const key = `${day}-${meal}`;
        const updated = { ...selectedRecipes };
        delete updated[key];

        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:4000/api/users/meal-plan', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ mealPlan: updated }),
            });

            if (res.ok) {
            setSelectedRecipes(updated);
            alert(`Deleted meal plan for ${meal} on ${day}`);
            } else {
            alert('Failed to delete meal on server');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred while deleting the meal');
        }
    };


    // Clear all meals from backend & update state
    const clearAllMeals = async () => {
        const token = localStorage.getItem('token');

        try {
        const res = await fetch('http://localhost:4000/api/users/meal-plan', {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        if (res.ok) {
            setSelectedRecipes({});
            alert('Weekly Meal Plan has been reset!');
        } else {
            alert('Failed to clear meal plan on server');
        }
        } catch (error) {
        console.error(error);
        alert('An error occurred while clearing meal plan');
        }
    };

    return (
        <div>
        <NavBar page="Weekly Meal Planner" />

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
                    <div key={meal} className="bg-white w-full h-[160px] rounded-xl overflow-hidden">
                        {/* non selected food section */}
                        {!recipe && (
                        <div className="flex justify-center align-center h-full items-center">
                            <div className="flex flex-col gap-4 text-center">
                            {meal === 'Breakfast' ? (
                                <Image src="/mealIcons/breakfast.png" alt="Breakfast" width={34} height={34} className="mx-auto" />
                            ) : meal === 'Lunch' ? (
                                <Image src="/mealIcons/lunch.png" alt="Lunch" width={34} height={34} className="mx-auto" />
                            ) : meal === 'Dinner' ? (
                                <Image src="/mealIcons/dinner.png" alt="Dinner" width={34} height={34} className="mx-auto" />
                            ) : (
                                <p>Invalid meal type</p>
                            )}

                            <span className="font-medium text-[#953306] text-lg">{meal}</span>
                            <div className="flex items-center gap-2 mx-auto">
                                <Link
                                href={`/select-recipe?day=${day}&meal=${meal}`}
                                className="text-[#953306] hover:text-[#DFBC94] items-center gap-2 flex"
                                >
                                <h1 className="text-2xl">+</h1>
                                <h1 className="text-md">Add Meal</h1>
                                </Link>
                            </div>
                            </div>
                        </div>
                        )}

                        {/* selected food section */}
                        {recipe && (
                        <div className="flex justify-center">
                            <div className="flex">
                            <img src={recipe.Image} alt={recipe.Name} className="w-1/2 min-h-[160px]" />
                            <div className="flex flex-col w-1/2 h-[160px]">
                                <div className="flex h-1/4 items-center justify-between">
                                <h1 className="font-medium text-xl text-[#953306] ml-3">{meal}</h1>
                                <button
                                    onClick={() => deleteMeal(day, meal)}
                                    className="text-red-500 hover:text-red-700 text-sm text-center"
                                >
                                    <Image
                                    src="/mealIcons/delete.png"
                                    alt="Trash"
                                    height={30}
                                    width={30}
                                    className="hover:cursor-pointer mr-3 rounded-full p-1 bg-transparent hover:bg-gray-300"
                                    />
                                </button>
                                </div>
                                <div className="flex items-center align-center h-full justify-center mx-2">
                                <h1 className="text-sm xl:text-lg">{recipe.Name}</h1>
                                </div>
                            </div>
                            </div>
                        </div>
                        )}
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

        <Footer />
        </div>
    );
}
