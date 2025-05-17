import React from 'react'
import meals from '../../../../backend/data/recipes.json';

export default function RecipeDisplay({ params }) {
    const meal = meals.find((dish) => dish.idMeal === params.id);

    if (!meal) {
        return <p>Meal not found</p>;
    }

    return (
        <div>
        <h1>{meal.name}</h1>
        <img src={meal.Image} alt={meal.Name} />
        <p>{meal.Instructions}</p>

        </div>
    );
}