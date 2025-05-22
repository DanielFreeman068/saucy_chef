'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { ChevronLeft, Plus, Trash2, Save, Camera } from 'lucide-react';



const CreationPage = () => {
    const router = useRouter();
    const [showSuccess, setShowSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    
        useEffect(() => {
            const token = localStorage.getItem('token');
    
            if (!token) {
            router.push('/'); // no token = redirect
            return;
            }
        }, []);

        const [recipe, setRecipe] = useState({
            Name: '',
            Category: '',
            Area: '',
            Instructions: '',
            Image: '',
            Youtube: '',
            ingredients: [{ ingredient: '', measure: '' }]
        });

        // Handle text input changes
        const handleChange = (e) => {
            const { name, value } = e.target;
            setRecipe(prev => ({
            ...prev,
            [name]: value
            }));
        };
        
        const handleFileUpload = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "my_unsigned_preset");

            try {
                const res = await fetch(`https://api.cloudinary.com/v1_1/dafmz44zh/image/upload`, {
                method: "POST",
                body: formData,
                });

                const data = await res.json();

                if (data.secure_url) {
                setRecipe((prev) => ({
                    ...prev,
                    Image: data.secure_url,
                }));
                } else {
                console.error("No secure_url in Cloudinary response", data);
                }
            } catch (err) {
                console.error("Upload error:", err);
            }
            };

        // Handle ingredient changes
        const handleIngredientChange = (index, field, value) => {
            const updatedIngredients = [...recipe.ingredients];
            updatedIngredients[index][field] = value;
            setRecipe(prev => ({
            ...prev,
            ingredients: updatedIngredients
            }));
        };

        // Add new ingredient field
        const addIngredient = () => {
            setRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { ingredient: '', measure: '' }]
            }));
        };

        // Remove ingredient field
        const removeIngredient = (index) => {
            const updatedIngredients = [...recipe.ingredients];
            updatedIngredients.splice(index, 1);
            setRecipe(prev => ({
            ...prev,
            ingredients: updatedIngredients
            }));
        };

        // Handle form submission
        const handleSubmit =  async  () => {
            // Transform the recipe data back to the API structure format
            const formattedRecipe = {
            idMeal: Math.floor(Math.random() * 100000).toString(),
            Name: recipe.Name,
            Category: recipe.Category,
            Area: recipe.Area,
            Instructions: recipe.Instructions,
            Image: recipe.Image || '/api/placeholder/400/320',
            Tags: null,
            Youtube: recipe.Youtube,
            };

            // Add ingredient and measure properties
            recipe.ingredients.forEach((item, index) => {
            const ingredientNum = index + 1;
            formattedRecipe[`Ingredient${ingredientNum}`] = item.ingredient;
            formattedRecipe[`Measure${ingredientNum}`] = item.measure;
            });

            // Fill remaining ingredient slots with empty strings (up to 20)
            for (let i = recipe.ingredients.length + 1; i <= 20; i++) {
            formattedRecipe[`Ingredient${i}`] = '';
            formattedRecipe[`Measure${i}`] = '';
            }

            try {
                const response = await fetch('https://saucy-chef-backend.onrender.com/api/create-recipe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formattedRecipe),
                });

                const result =  await response.json();
                if (response.ok) {
                    setShowSuccess(true);
                    setTimeout(() => {
                        setShowSuccess(false);
                        router.push('/explore');
                    }, 2000);
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error submitting recipe:', error);
                alert('An error occurred while saving the recipe.');
            }
        };


    return (
        <>
        {showSuccess && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000b4]">
                <div className="bg-[#abd6a7] text-white px-8 py-6 rounded-lg shadow-xl text-center animate-fadeIn max-w-sm w-full">
                    <div className="text-4xl mb-2">😊</div>
                    <h2 className="text-lg font-semibold mb-1">Recipe saved successfully!</h2>
                    <p className="text-sm text-white/80">Redirecting you to explore...</p>
                    </div>
                </div>
                )}
        <div className="bg-[#D96F63] min-h-screen px-4 sm:px-6 md:px-10 lg:px-20 py-6 font-sans">
            <div className="max-w-8xl mx-auto bg-[#DFBC94] rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
                <header className="flex flex-col sm:flex-row items-center justify-between mb-6 border-b-2 border-amber-800 pb-4 gap-4">
                <div className="flex items-center">
                    <a href="/explore">
                    <button className="text-amber-800 cursor-pointer mr-4 hover:text-amber-700">
                    <ChevronLeft size={28} />
                    </button>
                    </a>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-amber-800">Create New Recipe</h1>
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full cursor-pointer sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[#B53325] text-white rounded-md shadow-md hover:bg-[#912b20] transition-colors flex items-center justify-center"
                >
                    <Save size={18} className="mr-2" />
                    Save Recipe
                </button>
                </header>

                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Left Column - Recipe Details */}
                <div className="w-full lg:w-2/3 space-y-6">
                    {/* Recipe Basics */}
                    <div className="bg-[#F4E2CE] rounded-lg p-4 sm:p-6 shadow-sm border border-[#DFBC94]">
                    <h2 className="text-lg sm:text-xl font-medium text-amber-800 mb-4 border-b-2 border-[#DFBC94] pb-2">Recipe Details</h2>
                    <div className="space-y-4">
                        <div>
                        <label htmlFor="Name" className="block text-amber-800 font-medium mb-1">Recipe Name</label>
                        <input
                            type="text"
                            id="Name"
                            name="Name"
                            value={recipe.Name}
                            onChange={handleChange}
                            className="w-full p-2 sm:p-3 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325]"
                        />
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="Category" className="block text-amber-800 font-medium mb-1">Category</label>
                            <select
                            id="Category"
                            name="Category"
                            value={recipe.Category}
                            onChange={handleChange}
                            className="text-[#953306ad] cursor-pointer w-full p-2 sm:p-3 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325]"
                            >
                            <option value="">Select Category</option>
                            <option value="Appetizer">Appetizer</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Side Dish">Side Dish</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Snack">Snack</option>
                            <option value="Soup">Soup</option>
                            <option value="Salad">Salad</option>
                            <option value="High Protein">High Protein</option>
                            <option value="Low Carb">Low Carb</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Gluten-Free">Gluten-Free</option>
                            <option value="Comfort Food">Comfort Food</option>
                            <option value="Street Food">Street Food</option>
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="Area" className="block text-[#953306] font-medium mb-1">Cuisine</label>
                            <select
                            id="Area"
                            name="Area"
                            value={recipe.Area}
                            onChange={handleChange}
                            className="text-[#953306ad] w-full cursor-pointer p-2 sm:p-3 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325]"
                            >
                            <option value="">Select Cuisine</option>
                            <option value="Afghan">Afghan</option>
                            <option value="Algerian">Algerian</option>
                            <option value="American">American</option>
                            <option value="Argentinian">Argentinian</option>
                            <option value="Austrian">Austrian</option>
                            <option value="Bangladeshi">Bangladeshi</option>
                            <option value="Belgian">Belgian</option>
                            <option value="Brazilian">Brazilian</option>
                            <option value="British">British</option>
                            <option value="Burmese">Burmese</option>
                            <option value="Cajun">Cajun</option>
                            <option value="Canadian">Canadian</option>
                            <option value="Chechen">Chechen</option>
                            <option value="Chilean">Chilean</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Colombian">Colombian</option>
                            <option value="Croatian">Croatian</option>
                            <option value="Cuban">Cuban</option>
                            <option value="Dutch">Dutch</option>
                            <option value="Egyptian">Egyptian</option>
                            <option value="Ethiopian">Ethiopian</option>
                            <option value="Filipino">Filipino</option>
                            <option value="French">French</option>
                            <option value="Georgian">Georgian</option>
                            <option value="German">German</option>
                            <option value="Ghanaian">Ghanaian</option>
                            <option value="Greek">Greek</option>
                            <option value="Haitian">Haitian</option>
                            <option value="Hawaiian">Hawaiian</option>
                            <option value="Hungarian">Hungarian</option>
                            <option value="Indian">Indian</option>
                            <option value="Indonesian">Indonesian</option>
                            <option value="Iranian">Iranian</option>
                            <option value="Irish">Irish</option>
                            <option value="Italian">Italian</option>
                            <option value="Jamaican">Jamaican</option>
                            <option value="Japanese">Japanese</option>
                            <option value="Kazakh">Kazakh</option>
                            <option value="Kenyan">Kenyan</option>
                            <option value="Korean">Korean</option>
                            <option value="Laotian">Laotian</option>
                            <option value="Lebanese">Lebanese</option>
                            <option value="Malaysian">Malaysian</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Mongolian">Mongolian</option>
                            <option value="Moroccan">Moroccan</option>
                            <option value="Nepali">Nepali</option>
                            <option value="Nigerian">Nigerian</option>
                            <option value="Pakistani">Pakistani</option>
                            <option value="Palestinian">Palestinian</option>
                            <option value="Peruvian">Peruvian</option>
                            <option value="Polish">Polish</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Romanian">Romanian</option>
                            <option value="Russian">Russian</option>
                            <option value="Serbian">Serbian</option>
                            <option value="Singaporean">Singaporean</option>
                            <option value="South African">South African</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Sri Lankan">Sri Lankan</option>
                            <option value="Swedish">Swedish</option>
                            <option value="Syrian">Syrian</option>
                            <option value="Thai">Thai</option>
                            <option value="Tibetan">Tibetan</option>
                            <option value="Tunisian">Tunisian</option>
                            <option value="Turkish">Turkish</option>
                            <option value="Ukrainian">Ukrainian</option>
                            <option value="Uruguayan">Uruguayan</option>
                            <option value="Uzbek">Uzbek</option>
                            <option value="Venezuelan">Venezuelan</option>
                            <option value="Vietnamese">Vietnamese</option>
                            <option value="Unknown">Other</option>
                            </select>
                        </div>
                        </div>
                        
                        <div>
                        <label htmlFor="Youtube" className="block text-amber-800 font-medium mb-1">YouTube Video URL</label>
                        <input
                            type="text"
                            id="Youtube"
                            name="Youtube"
                            value={recipe.Youtube}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="placeholder-[#953306ad] w-full p-2 sm:p-3 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325]"
                        />
                        </div>
                    </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-[#F4E2CE] rounded-lg p-4 sm:p-6 shadow-sm border-2 border-[#DFBC94]">
                    <h2 className="text-lg sm:text-xl font-medium text-amber-800 mb-4 border-b-2 border-[#DFBC94] pb-2">Cooking Instructions</h2>
                    <textarea
                        id="Instructions"
                        name="Instructions"
                        value={recipe.Instructions}
                        onChange={handleChange}
                        rows="8"
                        className="placeholder-[#953306ad] w-full p-2 sm:p-3 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325]"
                        placeholder="Step-by-step cooking instructions..."
                    ></textarea>
                    </div>
                </div>

                {/* Right Column - Image and Ingredients */}
                <div className="w-full lg:w-1/3 space-y-6">
                    {/* Image Upload */}
                    <div className="bg-[#F4E2CE] rounded-lg p-4 sm:p-6 shadow-sm border border-[#DFBC94]">
                    <h2 className="text-lg sm:text-xl font-medium text-amber-800 mb-4 border-b-2 border-[#DFBC94] pb-2">Recipe Image</h2>
                    <div className="flex flex-col items-center">
                        <div className="w-full h-48 sm:h-64 bg-[#E38B82] rounded-md flex items-center justify-center mb-4">
                        {recipe.Image ? (
                            <img 
                                src={recipe.Image} 
                                alt="Recipe thumbnail" 
                                className="w-full h-full object-cover rounded-md"
                            />
                            ) : (
                            <Camera size={48} className="text-[#af554b]" />
                            )}
                            
                            
                        </div>
                        <button
                            type="button"
                            onClick={() => document.getElementById('imageUpload').click()}
                            className="w-full sm:w-auto mb-2 px-4 py-2 bg-[#B53325] text-white text-sm rounded hover:bg-[#953306]"
                        >
                            Upload Image
                        </button>
                        <input
                            type="file"
                            id="imageUpload"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <input
                        type="text"
                        id="Image"
                        name="Image"
                        value={recipe.Image}
                        onChange={handleChange}
                        placeholder="Or enter image URL"
                        className="placeholder-[#953306ad] w-full p-2 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325] text-sm"
                        />
                    </div>
                    </div>

                    {/* Ingredients */}
                    <div className="bg-[#F4E2CE] rounded-lg p-4 sm:p-6 shadow-sm border border-[#DFBC94]">
                    <div className="flex justify-between items-center mb-4 border-b-2 border-[#DFBC94] pb-2">
                        <h2 className="text-lg sm:text-xl font-medium text-amber-800">Ingredients</h2>
                        <button
                        type="button"
                        onClick={addIngredient}
                        className="flex items-center cursor-pointer px-2 sm:px-3 py-1 bg-[#B53325] text-white rounded-md hover:bg-[#912b20] transition-colors"
                        >
                        <Plus size={16} className="mr-1" />
                        Add
                        </button>
                    </div>
                    
                    <div className="space-y-3 max-h-64 sm:max-h-96 overflow-y-auto pr-2">
                        {recipe.ingredients.map((item, index) => (
                        <div key={index} className="flex items-center gap-1 sm:gap-2 mb-2">
                            <div className="flex-grow">
                            <input
                                type="text"
                                value={item.ingredient}
                                onChange={(e) => handleIngredientChange(index, 'ingredient', e.target.value)}
                                placeholder="Ingredient"
                                className="placeholder-[#953306ad] w-full p-2 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325] text-xs sm:text-sm"
                            />
                            </div>
                            
                            <div className="w-16 sm:w-24">
                            <input
                                type="text"
                                value={item.measure}
                                onChange={(e) => handleIngredientChange(index, 'measure', e.target.value)}
                                placeholder="Amount"
                                className="placeholder-[#953306ad] w-full p-2 border-2 border-[#DFBC94] rounded-md bg-[#f7eadb] focus:outline-none focus:ring-2 focus:ring-[#B53325] text-xs sm:text-sm"
                            />
                            </div>
                            
                            <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="p-1 text-amber-700 cursor-pointer hover:text-red-600 transition-colors"
                            disabled={recipe.ingredients.length === 1}
                            >
                            <Trash2 size={16} />
                            </button>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </>
    )
}

export default CreationPage