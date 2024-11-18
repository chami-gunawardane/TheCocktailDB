import { COCKTAIL_API_BASE_URL } from "../config/const";

// Function to fetch cocktails by search query
export const fetchCocktailsByQuery = async (query) => {
  try {
    const response = await fetch(`${COCKTAIL_API_BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    return [];
  }
};
