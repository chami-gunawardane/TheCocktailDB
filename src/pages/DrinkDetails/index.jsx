import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";

const ingredientImages = {
  "Light rum": "https://www.thecocktaildb.com/images/ingredients/Light%20rum.png",
  "Lime": "https://www.thecocktaildb.com/images/ingredients/Lime.png",
  "Sugar": "https://www.thecocktaildb.com/images/ingredients/Sugar.png",
  "Mint": "https://www.thecocktaildb.com/images/ingredients/Mint.png",
  "Soda water": "https://www.thecocktaildb.com/images/ingredients/Soda%20water.png"
};

const DrinkDetails = () => {
  const { idDrink } = useParams();
  const { searchQuery } = useSearch();
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.drinks) && data.drinks.length > 0) {
          setDrink(data.drinks[0]);
        } else {
          console.error("Drink not found");
        }
      })
      .catch((error) => console.error("Failed to fetch drink details:", error));
  }, [idDrink]);

  if (!drink) {
    return <p className="text-white">Loading...</p>;
  }

  // Helper function to highlight search matches
  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 text-black font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="text-left p-8 bg-gradient-to-r from-black via-red-950 to-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-white ml-60 mt-10">
        {highlightText(drink.strDrink)}
      </h1>

      <div className="flex items-start gap-8">
        <div>
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="w-80 h-80 object-cover rounded-lg mb-4 ml-60 mt-10"
          />
          <p className="text-sm text-gray-400 ml-60 mt-5">Image Source: Creative Commons Pixabay</p>
        </div>

        {/* Ingredients */}
        <div className="text-white">
          <h3 className="text-2xl -mt-10 mb-10 ml-40 font-serif">Ingredients</h3>
          <ul className="grid grid-cols-3 gap-10 ml-16">
            {Array.from({ length: 15 }).map((_, index) => {
              const ingredient = drink[`strIngredient${index + 1}`];
              const measure = drink[`strMeasure${index + 1}`];
              return (
                ingredient && (
                  <li key={index} className="grid grid-row gap-2 ">
                    <img
                      src={ingredientImages[ingredient] || `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
                      alt={ingredient}
                      className="w-[300px] h-[300px] object-contain"
                    />
                    <span className="text-lg text-center">
                      {highlightText(`${measure || ""} ${ingredient}`)}
                    </span>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      </div>

      {/* Instructions and Glass Details */}
      <div className="text-white mt-32 mb-20 text-center font-serif">
        <h3 className="text-2xl mb-4">Instructions</h3>
        <p className="mb-8 text-lg">{highlightText(drink.strInstructions)}</p>

        <h3 className="text-2xl mb-4">Glass</h3>
        <p className="text-lg">Serve: {highlightText(drink.strGlass)}</p>
      </div>
    </div>
  );
};

export default DrinkDetails;
