import React, { useEffect, useState } from "react";
import { fetchCocktailsByQuery } from "../../services/cocktailService";

const HeaderDetails = ({ onSearchChange }) => {
  const [drinksCount, setDrinksCount] = useState(0);
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data when the searchQuery changes
  useEffect(() => {
    if (searchQuery === "") {
      fetchCocktailData("a"); // Default query if searchQuery is empty
    } else {
      fetchCocktailData(searchQuery);
    }
  }, [searchQuery]);

  const fetchCocktailData = async (query) => {
    const drinks = await fetchCocktailsByQuery(query);
    if (drinks.length > 0) {
      setDrinksCount(drinks.length);
      const ingredientsSet = new Set();
      drinks.forEach((drink) => {
        Object.keys(drink).forEach((key) => {
          if (key.startsWith("strIngredient") && drink[key]) {
            ingredientsSet.add(drink[key]);
          }
        });
      });
      setIngredientsCount(ingredientsSet.size);
    } else {
      setDrinksCount(0);
      setIngredientsCount(0);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query); // Lift the state up to the parent component
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchQuery.trim() === "") {
        alert("Please enter a search term");
      }
    }
  };

  return (
    <div className="text-center bg-black text-white py-6 mt-5">
      <input
        type="text"
        placeholder="Search for a Cocktail..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-1/2 p-2 rounded-md border border-gray-300 text-black"
      />
      <div className="flex justify-center mt-4 space-x-6">
        <p className="text-lg font-semibold">🍸 Total Drinks: {drinksCount}</p>
        <p className="text-lg font-semibold">🍃 Total Ingredients: {ingredientsCount}</p>
        <p className="text-lg font-semibold">🍹 Drink Images: {drinksCount} (93cc)</p>
      </div>
    </div>
  );
};

export default HeaderDetails;
