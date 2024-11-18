import {
  COCKTAIL_API_BASE_URL,
  SEARCH_DRINKS_BY_NAME,
  SEARCH_DRINKS_BY_FIRST_LETTER,
  RANDOM_DRINK,
  INGREDIENTS_LIST,
  INGREDIENT_IMAGE_BASE_URL,
  BASE_API_URL,
} from "../config/const";

// Function to fetch cocktails by search query
export const fetchCocktailsByQuery = async (query) => {
  try {
    const response = await fetch(
      `${COCKTAIL_API_BASE_URL}/search.php?s=${query}`
    );
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    return [];
  }
};

// Fetch drinks by name or query
export const fetchDrinks = async (query = "") => {
  const url = query
    ? `${SEARCH_DRINKS_BY_NAME}${query}`
    : `${SEARCH_DRINKS_BY_FIRST_LETTER}a`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error fetching drinks:", error);
    return [];
  }
};

// Fetch a random drink
export const fetchRandomDrink = async () => {
  try {
    const response = await fetch(RANDOM_DRINK);
    const data = await response.json();
    return data.drinks[0] || null;
  } catch (error) {
    console.error("Error fetching random drink:", error);
    return null;
  }
};

// Fetch the list of ingredients
export const fetchIngredientsList = async () => {
  try {
    const response = await fetch(INGREDIENTS_LIST);
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error fetching ingredients list:", error);
    return [];
  }
};

export const getIngredientImageUrl = (ingredientName, size = "Medium") => {
  return `${INGREDIENT_IMAGE_BASE_URL}${ingredientName}-${size}.png`;
};

// Fetch cocktails by the first letter
export const fetchCocktailsByLetter = async (letter) => {
  try {
    const response = await fetch(`${BASE_API_URL}search.php?f=${letter}`);
    const data = await response.json();
    return data.drinks || []; // Return drinks or an empty array
  } catch (error) {
    console.error("Error fetching cocktails by letter:", error);
    throw error;
  }
};