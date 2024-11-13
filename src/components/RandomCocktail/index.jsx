import React, { useEffect, useState } from "react";

const RandomCocktailGrid = () => {
  const [randomDrinks, setRandomDrinks] = useState([]);

  // Function to fetch a random drink
  const fetchRandomDrink = async () => {
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const data = await response.json();
      return data.drinks[0];
    } catch (error) {
      console.error("Failed to fetch random drink:", error);
      return null;
    }
  };

  // Fetch multiple random drinks
  const fetchRandomDrinks = async () => {
    const drinks = [];
    for (let i = 0; i < 8; i++) {  // Adjust the number as needed
      const drink = await fetchRandomDrink();
      if (drink) drinks.push(drink);
    }
    setRandomDrinks(drinks);
  };

  useEffect(() => {
    fetchRandomDrinks();
  }, []);

  return (
    <div className="bg-[#2c001e] text-white p-6">
      <h3 className="text-3xl font-bold mb-6 text-center">Latest Drinks</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {randomDrinks.map((drink) => (
          <div key={drink.idDrink} className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            <img
              src={drink.strDrinkThumb}
              alt={drink.strDrink}
              className="w-full h-[150px] object-cover rounded-md mb-4"
            />
            <p className="text-lg font-medium">{drink.strDrink}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={fetchRandomDrinks}
          className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition duration-300"
        >
          Refresh Drinks
        </button>
      </div>
    </div>
  );
};

export default RandomCocktailGrid;
