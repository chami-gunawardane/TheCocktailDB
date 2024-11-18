import React from "react";
import { useSearch } from "../../context/SearchContext"; 
import Logo from "../../assets/images/logo.jpeg";
import Button from "../../components/Button";
import CartIcon from "../../assets/images/cart.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch(); 
  const cartItems = useSelector((state) => state.cart.items || []); 
  const cartCount = cartItems.length;

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
    <header className="flex flex-col lg:flex-row items-center justify-between p-4 bg-black text-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 ml-40 mr-4">
  <img
    src={Logo}
    alt="Cocktail Icon"
    className="w-[260px] h-[100px] sm:w-[270px] sm:h-[100px] object-contain"
  />
</div>


      {/* Navigation Section */}
      <nav className="flex flex-col lg:flex-row items-center lg:justify-between w-full lg:w-auto mt-4 lg:mt-0">
        {/* Links */}
        <div className="flex flex-col lg:flex-row lg:mr-[400px] lg:space-x-56 text-[18px] lg:text-[22px] font-serif space-y-2 lg:space-y-0">
          <a href="/" className="text-white hover:text-[#F1C376]">
            Home
          </a>
          <a href="#" className="text-white hover:text-[#F1C376]">
            About
          </a>
          <a href="#" className="text-white hover:text-[#F1C376] whitespace-nowrap">
            Contact Us
          </a>
        </div>

        {/* Cart and Search */}
        <div className="flex items-center space-x-4 lg:space-x-6 mt-4 lg:mt-0">
          <Link to="/cart">
            <Button
              customClass="bg-white text-black hover:bg-[#F1C376] relative"
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

          {/* Search Input */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="py-1 px-2 rounded-md text-black focus:outline-none font-tinos text-[14px] lg:text-[18px]"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
