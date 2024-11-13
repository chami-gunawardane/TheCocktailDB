import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import DrinkDetails from "../pages/DrinkDetails";
import CocktailsByLetter from "../pages/CocktailsByLetter";
import IngredientDrinks from "../pages/IngredientDrinks";
import { useSearch } from "../context/SearchContext";

const Routers = ({ ingredients }) => {
  const { searchQuery } = useSearch(); // Get the search query from context

  return (
    <Routes>
      <Route path="/" element={<Home searchQuery={searchQuery} />} />
      <Route path="/drink/:idDrink" element={<DrinkDetails searchQuery={searchQuery} />} />
      <Route path="/cocktails/:letter" element={<CocktailsByLetter searchQuery={searchQuery} />} />
      <Route
        path="/ingredient/:ingredientName"
        element={<IngredientDrinks searchQuery={searchQuery} ingredients={ingredients} />}
      />
    </Routes>
  );
};

export default Routers;
