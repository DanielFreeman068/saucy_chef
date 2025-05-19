"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import meals from '../../../../backend/data/recipes.json';
import Link from 'next/link';
import { IoMdClose } from "react-icons/io";
import { CgBowl } from "react-icons/cg";
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";

export default function RecipeCard() {
    const params = useParams();
    const { id } = params;

    const [meal, setMeal] = useState(null);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const foundMeal = meals.find((dish) => dish.idMeal === id);
        setMeal(foundMeal);
    }, [id]);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await fetch('http://localhost:4000/api/users/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error('Failed to fetch favorites');
                const data = await res.json();

                setFavoriteIds(data.favs.map(String));
            } catch (err) {
                console.error('Error fetching favorites:', err);
            }
        };

        fetchFavorites();
    }, []);

    const isFavorite = meal && favoriteIds.includes(meal.idMeal.toString());

const handleToggleFavorite = async () => {
    if (!meal) return;
    setLoading(true);

    try {
        const res = await fetch('http://localhost:4000/api/users/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ mealId: meal.idMeal })
        });

        const data = await res.json();
        if (res.ok) {
            setFavoriteIds(data.favs.map(String));
            const isNowFavorite = data.favs.includes(meal.idMeal.toString());
            alert(isNowFavorite ? "Added to favorites!" : "Removed from favorites!");
        } else {
            console.error(data.message || "Error updating favorites.");
        }
    } catch (err) {
        console.error("Server error:", err);
    } finally {
        setLoading(false);
    }
};

    if (!meal) return <div>Loading...</div>;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`Ingredient${i}`];
        const measure = meal[`Measure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ ingredient, measure: measure || '' });
        }
    }

    return (
        <div className="flex flex-col md:flex-row bg-orange-50 rounded-lg overflow-hidden shadow-lg mt-15 m-10">
            <div className="w-full md:w-3/7 md:sticky md:top-0 md:self-start">
                <Link href="/explore" className='hover:cursor-pointer'>
                    <IoMdClose className="absolute m-4 text-5xl" />
                </Link>
                <img src={meal.Image} alt={meal.Name} className="w-full h-64 md:h-4/5 object-cover" />
            </div>

            <div className="w-full md:w-3/5 p-4 md:p-6 md:overflow-y-auto md:max-h-[45rem]">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#B53325]">{meal.Name}</h1>
                    <button
                        onClick={handleToggleFavorite}
                        disabled={loading}
                        className="text-5xl hover:scale-110 hover:cursor-pointer transition-transform"
                        title={isFavorite ? "Unfavorite" : "Add to favorites"}
                        style={{ color: isFavorite ? '#fbbf24' : '#b7791f' }}
                    >
                        {isFavorite ? <AiFillStar /> : <CiStar />}
                    </button>
                </div>

                <p className="text-sm md:text-base text-[#953306] mb-4">
                    <Link href={meal.Youtube} target="_blank" rel="noopener noreferrer">
                        YouTube link : {meal.Youtube}
                    </Link>
                </p>

                <hr className="border-1 border-[#DFBC94] mb-5" />

                <div className="mb-5">
                    <div className="flex mb-2">
                        <span className="font-semibold text-[#953306] w-28 text-base md:text-lg">Category:</span>
                        <span className="text-[#CE744B] text-base md:text-lg">{meal.Category}</span>
                    </div>
                    <div className="flex mb-2">
                        <span className="font-semibold text-[#953306] w-28 text-base md:text-lg">Location:</span>
                        <span className="text-[#CE744B] text-base md:text-lg">{meal.Area}</span>
                    </div>
                    <div className="flex mb-2">
                        <span className="font-semibold text-[#953306] w-28 text-base md:text-lg">Tags:</span>
                        <span className="text-[#CE744B] text-base md:text-lg">{meal.Tags}</span>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="flex items-center mb-3">
                        <span className="text-2xl md:text-3xl mr-2"><CgBowl className="text-[#953306]" /></span>
                        <span className="font-semibold text-base text-[#953306] md:text-lg">{ingredients.length} Ingredients</span>
                    </div>

                    <ul className="list-none space-y-2 text-base md:text-lg">
                        {ingredients.map((item, index) => (
                            <li key={index} className="flex">
                                <span className="font-semibold text-[#953306]">{item.ingredient} :</span>
                                <span className="ml-2 text-[#CE744B]">{item.measure}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl md:text-2xl font-semibold text-[#953306] mb-3">Instructions:</h3>
                    <div className="max-h-64 pr-2 mb-18 mr-6 overflow-y-auto">
                        {meal.Instructions.split('\n').map((line, index) => (
                            <p key={index} className="md:text-xl text-[#CE744B] leading-relaxed mb-4">{line.trim()}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
