    import React from 'react';
import { CiStar } from "react-icons/ci";

    const DishCard = ({ name, image, location, category }) => {
    return (
        <div className="w-72 p-6 rounded-sm flex flex-col justify-between my-10" style={{ backgroundColor: '#f5e2ce' }}>
        {/* Image container with yellow border */}
        <div className="relative my-4">
            <div className="w-full h-64 -mt-28 overflow-hidden rounded-sm" style={{ borderColor: '#e5a657', borderWidth: '4px' }}>
            {image ? (
                <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
                </div>
            )}
            </div>
        </div>

        {/* Title section */}
        <div className="mb-8">
            <h3 className="text-lg font-medium text-amber-900 mb-2">{name || "Title of Dish"}</h3>
            <p className="text-sm text-amber-700">{category || "Category"}</p>
        </div>

        {/* Footer section with star and location */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#e5a657]">
            <div className="flex items-center">
            <span className="text-3xl text-amber-700"><CiStar /></span>
            </div>
            <div className="text-sm text-amber-700">
            {location || "Area"}
            </div>
        </div>
        </div>
    );
    };

    export default DishCard;
