import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartActions";
import { useSearch } from "../../context/SearchContext";
import Button from "../../components/Button";
import CartIcon from "../../assets/images/cart.jpg";
import "../../App.css";

const ingredientImages = {
  "Light rum":
    "https://www.thecocktaildb.com/images/ingredients/Light%20rum.png",
  Lime: "https://www.thecocktaildb.com/images/ingredients/Lime.png",
  Sugar: "https://www.thecocktaildb.com/images/ingredients/Sugar.png",
  Mint: "https://www.thecocktaildb.com/images/ingredients/Mint.png",
  "Soda water":
    "https://www.thecocktaildb.com/images/ingredients/Soda%20water.png",
};

const DrinkDetails = () => {
  const { idDrink } = useParams();
  const { searchQuery } = useSearch();
  const [drink, setDrink] = useState(null);
  const dispatch = useDispatch();

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
    return <p className="text-white text-center">Loading...</p>;
  }

  const handleAddToCart = () => {
    const item = {
      id: idDrink,
      name: drink.strDrink,
      description: drink.strInstructions,
      image: drink.strDrinkThumb,
    };
    dispatch(addToCart(item));
  };

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
    <div className="bg-gradient-to-r from-black via-red-950 to-black text-white p-4 sm:p-8">
      {/* Header Section */}
      <header className="text-center mb-6 sm:mb-12">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-4">
          {highlightText(drink.strDrink)}
        </h1>
      </header>

      {/* Main Content */}
<main className="flex flex-col lg:flex-row lg:gap-12 items-center lg:items-start">
  {/* Left: Drink Image */}
  <div className="relative flex flex-col items-center lg:items-start w-full lg:w-1/3 mb-8 lg:mb-0 ml-4">
    <img
      src={drink.strDrinkThumb}
      alt={drink.strDrink}
      className="w-full max-w-md h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    />
    <p className="text-sm text-gray-400 mt-2">
      Image Source: Creative Commons Pixabay
    </p>
  </div>

  {/* Right: Drink Details */}
  <div className="flex-1 w-full">
    {/* Ingredients Section */}
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Ingredients</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 15 }).map((_, index) => {
          const ingredient = drink[`strIngredient${index + 1}`];
          const measure = drink[`strMeasure${index + 1}`];
          return (
            ingredient && (
              <div
                key={index}
                className="bg-[#3E1E28] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
              >
                <img
                  src={
                    ingredientImages[ingredient] ||
                    `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`
                  }
                  alt={ingredient}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain mb-3"
                />
                <p className="text-center text-sm sm:text-lg">
                  {highlightText(`${measure || ""} ${ingredient}`)}
                </p>
              </div>
            )
          );
        })}
      </div>
    </section>

    {/* Instructions Section */}
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Instructions</h2>
      <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-lg text-gray-200">
        {drink.strInstructions.split(". ").map((step, idx) => (
          <li key={idx}>{highlightText(step.trim())}</li>
        ))}
      </ol>
    </section>

    {/* Glass Section */}
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Glass</h2>
      <p className="text-sm sm:text-lg">
        Serve: {highlightText(drink.strGlass)}
      </p>
    </section>

    {/* Add to Cart Button positioned at the bottom */}
    <div className="flex justify-center sm:justify-start mt-8 sm:mt-12 lg:mt-16">
      <Button
        text="Add to Cart"
        customClass="bg-white text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-300 font-bold inline-flex items-center gap-2 transition-transform duration-300 hover:scale-105 whitespace-nowrap"
        image={
          <img
            src={CartIcon}
            alt="Cart"
            className="h-4 sm:h-5 w-4 sm:w-5"
          />
        }
        onClick={handleAddToCart}
      />
    </div>
  </div>
</main>

    </div>
  );
};

export default DrinkDetails;
