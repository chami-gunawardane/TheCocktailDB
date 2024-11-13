import React from "react";
import { useSearch } from "../../context/SearchContext"; // Import the useSearch hook
import Logo from "../../assets/images/logo.jpeg";
import Button from "../../components/Button";

const Header = () => {
  const { searchQuery, setSearchQuery } = useSearch(); // Get the global search state

  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search term");
      return;
    }
    console.log("Searching for:", searchQuery);
    // Optionally, you can redirect to a search results page
    // window.location.href = `/search?query=${searchQuery}`;
  };

  // Handle Enter key press in the search input
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
