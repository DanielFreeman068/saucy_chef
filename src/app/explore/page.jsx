'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer.jsx';
import DishCard from "../components/DishCard.jsx";

const ExplorePage = () => {
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState('All');
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchText, setSearchText] = useState('');

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch all meals
                const mealRes = await fetch('https://saucy-chef-backend.onrender.com/api/create-recipe/all-recipes');
                const mealData = await mealRes.json();
                setMeals(mealData);

                // Then fetch favorites
                const favRes = await fetch('https://saucy-chef-backend.onrender.com/api/users/favorites', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!favRes.ok) throw new Error('Failed to fetch favorites');
                const favData = await favRes.json();

                const favMeals = mealData.filter(meal => favData.favs.includes(meal.idMeal.toString()));
                setFavorites(favMeals);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingFavorites(false);
            }
        };

        fetchData();
    }, [router]);

    const categories = ['All', 'Favorites', ...new Set(meals.map(meal => meal.Category))];

    const baseMeals =
        selectedCategory === 'Favorites'
            ? favorites
            : selectedCategory === 'All'
            ? meals
            : meals.filter(meal => meal.Category === selectedCategory);

    const filteredMeals = baseMeals.filter(meal =>
        meal.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='min-h-screen flex flex-col'>
            <NavBar page="Explore Recipes" />

            <div className='flex-grow'>
                {/* Search Input */}
                <div className="flex justify-center mt-10 mb-8 gap-2">
                    <input
                        type="text"
                        placeholder="Search by recipe name..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-64 px-4 py-2 border border-[#953306] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#953306]"
                    />
                    <button
                        onClick={() => setSearchQuery(searchText)}
                        className="bg-[#953306] cursor-pointer text-white px-4 py-2 rounded-lg shadow hover:bg-[#7a2802]"
                    >
                        Search
                    </button>
                </div>

                {/* Filter Controls */}
                <div className="flex justify-center mb-[100px] flex-wrap gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 cursor-pointer rounded-full shadow ${
                                selectedCategory === category
                                    ? 'bg-[#953306] text-white'
                                    : 'bg-[#F4E2CE] text-[#953306]'
                            }`}
                            onClick={() => {
                                setSelectedCategory(category);
                                setSearchQuery('');
                                setSearchText('');
                            }}
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
    );
};

export default ExplorePage;