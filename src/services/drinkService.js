export const fetchDrinksByIngredient = (ingredient) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.drinks)) {
        return data.drinks.slice(0, 15);
      } else {
        throw new Error("Expected data.drinks to be an array");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch drinks:", error);
      throw error; // Re-throw error to handle in the component
    });
};
