'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';
import DishCard from "../components/DishCard.jsx";

import meals from '../../../backend/data/recipes.json';

const ExplorePage = () => {
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);

    //Unique categories from meals
    const categories = ['All', 'Favorites', ...new Set(meals.map(meal => meal.Category))];

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        const fetchFavorites = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/users/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) throw new Error('Failed to fetch favorites');

                const data = await res.json();

                // Convert meal ids to strings for consistent comparison
                const favMeals = meals.filter(meal => data.favs.includes(meal.idMeal.toString()));
                setFavorites(favMeals);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoadingFavorites(false);
            }
        };

        fetchFavorites();
    }, [router]);

    // Filter meals excluding favorites when not on 'Favorites' category
    const filteredMeals = selectedCategory === 'Favorites' ? favorites : selectedCategory === 'All' ? meals : meals.filter(meal => meal.Category === selectedCategory)

    return (
        <>
            <div className='min-h-screen flex flex-col'>
                <NavBar page="Explore Recipes" />

                <div className='flex-grow'>
                    {/* Filter Controls */}
                    <div className="flex justify-center mt-10 mb-16 flex-wrap gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full shadow ${
                                    selectedCategory === category
                                        ? 'bg-[#953306] text-white'
                                        : 'bg-[#F4E2CE] text-[#953306]'
                                }`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Loading and empty states */}
                    {selectedCategory === 'Favorites' && loadingFavorites && (
                        <p className="text-center text-[#953306]">Loading favorites...</p>
                    )}

                    {!loadingFavorites && (
                        filteredMeals.length === 0 ? (
                            <p className="text-center text-[#953306]">No recipes found.</p>
                        ) : (
                            <div className="flex flex-wrap justify-center gap-20 mt-10 px-4">
                                {filteredMeals.map((meal) => (
                                    <DishCard
                                        key={meal.idMeal}
                                        id={meal.idMeal}
                                        name={meal.Name}
                                        location={meal.Area}
                                        image={meal.Image}
                                        category={meal.Category}
                                        isFavorite={favorites.some(fav => fav.idMeal.toString() === meal.idMeal.toString())}
                                    />
                                ))}
                            </div>
                        )
                    )}
                </div>

                <Footer />
            </div>
        </>
    );
};

export default ExplorePage;
