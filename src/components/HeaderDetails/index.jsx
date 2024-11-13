import React, { useEffect, useState } from "react";

const HeaderDetails = ({ onSearchChange }) => {
  const [drinksCount, setDrinksCount] = useState(0);
  const [ingredientsCount, setIngredientsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data when the searchQuery changes
  useEffect(() => {
    if (searchQuery === "") {
      fetchData("a"); // Default query if searchQuery is empty
    } else {
      fetchData(searchQuery);
    }
  }, [searchQuery]);

  const fetchData = (query) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks) {
          setDrinksCount(data.drinks.length);
          const ingredientsSet = new Set();
          data.drinks.forEach((drink) => {
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);  // Lift the state up to the parent component
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
