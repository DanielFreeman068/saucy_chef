'use client'

import { useSearchParams, useRouter } from 'next/navigation';

import Image from 'next/image';
import { useCallback, useEffect } from 'react';
import meals from '../../../backend/data/recipes.json';
import DishCard from "../components/DishCard.jsx"
import Link from 'next/link'
import Footer from '../components/Footer.jsx'
import NavBar from '../components/NavBar.jsx'

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
            <NavBar page="Select Recipe"/>
                    
                
            

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
            <Footer/>
        </div>
        
    );
}
