'use client'

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import meals from '../recipes.json';
import DishCard from "../components/DishCard.jsx"

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
                        <h1 className="text-[#953306] text-xl sm:text-2xl md:text-3xl lg:text-4xl">Select a Recipe for {meal} on {day}</h1>
                    </div>
                    <div className="flex flex-row gap-6">
                        <Link href="/meal-planner" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>

            {/* recipes section */}
            <div className="flex flex-wrap justify-center gap-20 mt-24 px-4">
                {meals.map((meal) => (
                    <button
                        key={meal.idMeal}
                        onClick={() => handleRecipeSelect(meal)}
                        className="hover:cursor-pointer transform transition-transform duration-200 hover:scale-105"
                    >
                        <DishCard
                        name={meal.Name}
                        location={meal.Area}
                        image={meal.Image}
                        category={meal.Category}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
