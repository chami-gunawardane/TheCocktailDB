import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import background from "../../assets/images/b 1.jpg";
import Button from "../Button";
import {
  fetchDrinks,
  fetchRandomDrink,
  fetchIngredientsList,
  getIngredientImageUrl,
} from "../../services/cocktailService";

const PopularDrinks = ({ searchQuery }) => {
  const [drinks, setDrinks] = useState([]);
  const [randomDrinks, setRandomDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  

  // Fetch drinks based on search query or default to popular drinks
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchDrinks(searchQuery);
        setDrinks(data);
      } catch (err) {
        setError("Failed to fetch drinks.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery]);

  // Update filtered drinks
  useEffect(() => {
    if (searchQuery) {
      const filtered = drinks.filter((drink) =>
        drink.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDrinks(filtered);
    } else {
      setFilteredDrinks(drinks);
    }
  }, [searchQuery, drinks]);

  // Fetch random drinks
  const fetchRandomDrinks = async () => {
    try {
      const drinks = [];
      for (let i = 0; i < 8; i++) {
        const drink = await fetchRandomDrink();
        if (drink) drinks.push(drink);
      }
      setRandomDrinks(drinks);
    } catch (err) {
      console.error("Error fetching random drinks:", err);
    }
  };

  useEffect(() => {
    fetchRandomDrinks();
  }, []);

  // Fetch ingredients list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchIngredientsList();
        setIngredients(data);
      } catch (err) {
        console.error("Error fetching ingredients:", err);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div
      className="text-center text-white py-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Popular Drinks Section */}
      <div className="text-center text-white py-8">
        <h2 className="text-3xl mb-6 font-serif text-black">Popular Drinks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 sm:px-12 md:px-16 lg:px-20">
          {filteredDrinks.length > 0 ? (
            filteredDrinks.map((drink) => (
              <Link to={`/drink/${drink.idDrink}`} key={drink.idDrink}>
                <div className="bg-black rounded-lg hover:bg-yellow-950 hover:cursor-pointer transition duration-300 w-full">
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                    className="w-full h-[250px] sm:h-[300px] object-cover rounded-md mb-4"
                  />
                  <p className="text-lg font-medium">{drink.strDrink}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-lg font-semibold">No drinks found</p>
          )}
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      {/* Latest Drinks Section */}
      <div className="text-white p-6">
        <h3 className="text-3xl mb-6 font-serif text-black">Latest Drinks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:px-8 md:px-12 lg:px-16">
          {randomDrinks.map((drink) => (
            <Link to={`/drink/${drink.idDrink}`} key={drink.idDrink}>
              <div className="bg-black rounded-lg hover:bg-yellow-950 hover:cursor-pointer transition duration-300 w-full">
                <img
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                  className="w-full h-[250px] sm:h-[300px] object-cover rounded-md mb-4"
                />
                <p className="text-lg font-medium">{drink.strDrink}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Refresh Random Drinks Button */}
      <div className="text-center mt-6">
        <Button
          text="Refresh Drinks"
          customClass="bg-yellow-500 text-black hover:bg-yellow-600 transition duration-300 w-[150px] sm:w-[180px] h-[40px] sm:h-[50px] text-md sm:text-lg font-medium border border-gray-400 mx-auto"
          onClick={fetchRandomDrinks}
        />
      </div>

      <hr className="border-gray-700 my-8" />

      {/* Ingredients Section */}
      <div className="text-white p-6">
      <h3 className="text-3xl mb-6 font-serif text-black">Ingredients List</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:px-8 md:px-12 lg:px-16">
        {ingredients.slice(0, 12).map((ingredient, index) => (
          <Link to={`/ingredient/${ingredient.strIngredient1}`} key={index}>
            <div className="bg-black rounded-lg hover:bg-yellow-950 hover:cursor-pointer transition duration-300 w-full">
              <img
                src={getIngredientImageUrl(ingredient.strIngredient1)}
                alt={ingredient.strIngredient1}
                className="w-[150px] sm:w-[180px] h-[150px] sm:h-[180px] object-cover rounded-md mb-4 mx-auto"
              />
              <p className="text-lg font-medium text-center mt-2">
                {ingredient.strIngredient1}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PopularDrinks;
