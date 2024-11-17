import React from "react";
import { useSearch } from "../../context/SearchContext"; 
import Logo from "../../assets/images/logo.jpeg";
import Button from "../../components/Button";
import CartIcon from "../../assets/images/cart.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch(); 
  const cartItems = useSelector((state) => state.cart.items || []); // Handle undefined state gracefully
  const cartCount = cartItems.length; // Get the cart count safely

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    console.log("Searching for:", searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-black text-white">
      <div className="flex items-center space-x-2 ml-40">
        <img src={Logo} alt="Cocktail Icon" className="w-[270px] h-[100px]" />
      </div>

      <nav className="flex items-center">
        <div className="mr-[400px] space-x-28 text-[22px] font-serif">
          <a href="/" className="text-white hover:text-[#F1C376]">
            Home
          </a>
          <a href="#" className="text-white hover:text-[#F1C376]">
            About
          </a>
          <a href="#" className="text-white hover:text-[#F1C376]">
            Contact Us
          </a>
        </div>

        <Link to="/cart">
          <Button
            customClass="bg-white text-black mr-10 hover:bg-[#F1C376]"
            image={
              <div className="relative">
                <img src={CartIcon} alt="Cart" className="h-4 w-4" />
                <span className="absolute bottom-3 left-5 text-xs bg-red-500 text-white rounded-full px-1">
                  {cartCount}
                </span>
              </div>
            }
          />
        </Link>

        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mr-[250px] py-1 px-2 rounded-md text-black focus:outline-none font-tinos text-[18px]"
        />
        <Button onClick={handleSearch}>Search</Button>
      </nav>
    </header>
  );
};

export default Header;
