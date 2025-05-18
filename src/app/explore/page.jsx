'use client'
import Image from "next/image";
import DishCard from "../components/DishCard.jsx"
import meals from '../../../backend/data/recipes.json';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer.jsx'

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
        <NavBar page="Explore Recipes"></NavBar>
        {/* recipes section */}
            <div className="flex flex-wrap justify-center gap-20 mt-24 px-4 ">
                {meals.map((meal) => (
                    
                    <DishCard 
                    key={meal.idMeal}
                    id={meal.idMeal}
                    name={meal.Name}
                    location={meal.Area}
                    image={meal.Image}
                    category={meal.Category}
                    />
                ))}
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default ExplorePage
