import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8 ">
      <div className="container mx-auto px-4 text-center space-y-4">
        
        <div className="border-t border-gray-500 w-full mb-4"></div>
        
        <div className="text-lg font-medium tracking-wider">
          <p>Browse By Name</p>
          <div className="mt-2 text-gray-400 space-x-2">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
              <Link key={letter} to={`/cocktails/${letter}`} className="hover:text-white">
                {letter} /
              </Link>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-500 w-full mt-4"></div>
        
        <div className="flex flex-col md:flex-row md:justify-between items-center mt-6">
          <div className="text-sm text-gray-400">
            © 2024 TheCocktailDB. <span className="block md:inline">Proudly built in the UK 🇬🇧</span>
          </div>
          <div className="space-x-4 text-sm mt-4 md:mt-0">
            <a href="#missing" className="hover:text-white">Missing</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#faq" className="hover:text-white">Faq</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <div className="space-x-2 mt-4 md:mt-0">
            <a href="#facebook" className="text-blue-600 hover:text-white">FB</a>
            <a href="#twitter" className="text-blue-400 hover:text-white">TW</a>
            <a href="#discord" className="text-indigo-500 hover:text-white">DC</a>
          </div>
        </div>
        
        <div className="flex justify-center space-x-6 mt-6 text-lg">
          <span className="text-green-500 font-bold">TheSportsDB</span>
          <span className="text-red-500 font-bold">TheAudioDB</span>
          <span className="text-yellow-500 font-bold">TheMealDB</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
