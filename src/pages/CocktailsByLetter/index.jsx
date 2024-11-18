import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext";
import { fetchCocktailsByLetter } from "../../services/cocktailService";

function CocktailsByLetter() {
  const { letter } = useParams();
  const { searchQuery } = useSearch();
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCocktailsByLetter(letter); // Use service function
        setCocktails(data);
      } catch (error) {
        console.error("Error fetching cocktails:", error);
      }
    };

    fetchData();
  }, [letter]);

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

  // Filter cocktails based on the search query
  const filteredCocktails = searchQuery
    ? cocktails.filter((cocktail) =>
        cocktail.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cocktails;

  return (
    <div className="text-left p-8 bg-gradient-to-r from-black via-red-950 to-black min-h-screen">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-white font-serif">
          Cocktails Starting with "{letter}"
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {filteredCocktails.length > 0 ? (
            filteredCocktails.map((cocktail) => (
              <Link to={`/drink/${cocktail.idDrink}`} key={cocktail.idDrink}>
                <div className="bg-black rounded-lg hover:bg-yellow-950 hover:cursor-pointer transition duration-300 w-[300px]">
                  <img
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    className="w-[300px] h-[300px] object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg text-center text-white font-serif">
                    {highlightText(cocktail.strDrink)}
                  </h3>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center font-serif text-white">
              No cocktails found for this letter or search query.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CocktailsByLetter;
