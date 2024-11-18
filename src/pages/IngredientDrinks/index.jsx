import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { getIngredientImageUrl } from "../../services/cocktailService"; // Import the image service
import { fetchDrinksByIngredient } from "../../services/drinkService"; // Import the drinks service

const IngredientDrinks = ({ ingredients = [] }) => {
  const { ingredientName } = useParams();
  const { searchQuery } = useSearch();
  const navigate = useNavigate();
  const [drinks, setDrinks] = useState([]);
  
  // Dynamically generate the ingredient image URL using the helper function
  const ingredientImageUrl = getIngredientImageUrl(ingredientName);

  // Find the current ingredient index
  const currentIndex = ingredients?.findIndex(
    (ingredient) => ingredient.strIngredient1 === ingredientName
  );

  // Fetch drinks based on the selected ingredient
  useEffect(() => {
    if (!ingredientName) return;

    fetchDrinksByIngredient(ingredientName)
      .then((data) => {
        setDrinks(data);
      })
      .catch((error) => {
        // Handle any errors that might occur
        console.error("Error fetching drinks:", error);
      });
  }, [ingredientName]);

  // Handler for navigating to the previous ingredient
  const handlePrevious = () => {
    if (ingredients.length === 0 || currentIndex < 0) return;

    const prevIndex = currentIndex > 0 ? currentIndex - 1 : ingredients.length - 1;
    const prevIngredient = ingredients[prevIndex]?.strIngredient1;
    if (prevIngredient) {
      navigate(`/ingredient/${prevIngredient}`);
    }
  };

  // Handler for navigating to the next ingredient
  const handleNext = () => {
    if (ingredients.length === 0 || currentIndex < 0) return;

    const nextIndex = currentIndex < ingredients.length - 1 ? currentIndex + 1 : 0;
    const nextIngredient = ingredients[nextIndex]?.strIngredient1;
    if (nextIngredient) {
      navigate(`/ingredient/${nextIngredient}`);
    }
  };

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

  // Filter drinks based on the search query
  const filteredDrinks = searchQuery
    ? drinks.filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : drinks;

  return (
    <div className="flex bg-gradient-to-r from-black via-red-950 to-black min-h-screen text-white py-8 px-4">
      {/* Ingredient Image on the Left */}
      <div className="w-1/3 flex flex-col items-center">
        <h2 className="text-3xl font-serif text-white mt-4 mb-10">{ingredientName}</h2>
        <img
          src={ingredientImageUrl}
          alt={ingredientName}
          className="w-[200px] h-[400px] object-cover rounded-md mb-4"
        />

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="text-3xl px-4 py-2 rounded-lg bg-yellow-950 hover:bg-yellow-800 transition duration-300 mr-20"
            onClick={handlePrevious}
          >
            &lt;
          </button>
          <button
            className="text-3xl px-4 py-2 rounded-lg bg-yellow-950 hover:bg-yellow-800 transition duration-300"
            onClick={handleNext}
          >
            &gt;
          </button>
        </div>
      </div>

      {/* List of Drinks on the Right */}
      <div className="w-2/3">
        <h2 className="text-3xl font-serif text-white mt-4 mb-10">Drinks</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 -ml-48 mt-24">
          {filteredDrinks.length > 0 ? (
            filteredDrinks.map((drink) => (
              <div
                key={drink.idDrink}
                className="bg-black rounded-lg hover:bg-yellow-950 hover:cursor-pointer transition duration-300 w-[200px] mx-auto"
              >
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-[200px] object-cover rounded-md mb-2"
                />
                <p className="text-lg font-medium text-center mb-4">
                  {highlightText(drink.strDrink)}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center font-serif text-white">
              No drinks found for this ingredient or search query.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientDrinks;
