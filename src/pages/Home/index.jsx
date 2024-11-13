import React, { useEffect, useState } from "react";
import BannerCarousel from "../../components/BannerCarousel";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import HeaderDetails from "../../components/HeaderDetails";
import PopularDrinks from "../../components/PopularDrinks";
import MixAndSipSection from "../../components/MixAndSipSection";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrinks, setFilteredDrinks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  // Fetch popular drinks data
  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a");
        const data = await response.json();
        if (Array.isArray(data.drinks)) {
          setDrinks(data.drinks);
          setFilteredDrinks(data.drinks);
        }
      } catch (error) {
        console.error("Error fetching drinks:", error);
      }
    };

    fetchDrinks();
  }, []);

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);

    // Filter drinks based on the search query
    const filtered = drinks.filter((drink) =>
      drink.strDrink.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDrinks(filtered);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve({
              data: [
                { id: 1, image: banner1, altText: "Logo Banner" },
                { id: 2, image: banner2, altText: "Cocktail Banner" },
              ],
            });
          }, 1000)
        );

        setBanners(response?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-black">
      <BannerCarousel banners={banners} />
      <div className="min-h-screen">
        <MixAndSipSection />
        <HeaderDetails onSearchChange={handleSearchChange} />
        <hr className="border-gray-700 my-8" />
        <PopularDrinks searchQuery={searchQuery} />      </div>
    </div>
  );
};

export default Home;
