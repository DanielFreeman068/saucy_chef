'use client'
import Image from "next/image";
import DishCard from "../components/DishCard.jsx"
import meals from '../../../backend/data/recipes.json';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const ExplorePage = () => {
        const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
        router.push('/'); // no token = redirect
        return;
        }
    }, []);


    return (
        <>
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
                <h1 className="text-[#953306] text-xl sm:text-2xl md:text-3xl lg:text-4xl">Explore Recipes</h1>
            </div>
            <div className="flex flex-row gap-6">
                <a href="/create-recipe" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">Create</a>
                <a href="/meal-planner" className="text-gray-900 bg-white rounded-lg px-3 md:px-5 md:py-3 text-nowrap py-2 shadow-lg hover:bg-gray-200 text-sm text-center">My Week</a>
            </div>
            </div>
        </div>

        {/* Filtration setup */}
        <div className="flex m-18 gap-x-8 items-center overflow-hidden ">
            <div className="flex text-xl text-[#953306] bg-[#F4E2CE] rounded-full px-4 py-2 gap-x-6">
                <button>All</button>
                <button>Appetizers</button>
                <button>Starters</button>
                <button>Main Courses</button>
                <button>Side Dishes</button>
                <button>Desserts</button>
                <button>Favorites</button>

            </div>
            <div>
                <input className="bg-[#F4E2CE] rounded-full px-4 py-3 min-w-80" type="text" placeholder="Search..." />
            </div>
            <div>
                <button className="bg-[#F4E2CE] text-lg rounded-full p-2 px-5 text-amber-800 hover:bg-[#f7ece0] transition-colors">Clear All</button>
            </div>
        </div>

        {/* recipes section */}
            <div className="flex flex-wrap justify-center gap-20 mt-24 px-4">
                    {meals.map((meal) => (
                <DishCard
                key={meal.idMeal}
                name={meal.Name}
                location={meal.Area}
                image={meal.Image}
                category={meal.Category}
                />
            ))}
            </div>
        </div>
        </>
    )
}

export default ExplorePage