import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center space-y-6">
        {/* Divider */}
        <div className="border-t border-gray-500 w-full"></div>

        {/* Browse By Name */}
        <div className="text-lg font-medium tracking-wider">
          <p>Browse By Name</p>
          <div className="mt-2 text-gray-400 space-x-2 flex flex-wrap justify-center">
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
              <Link
                key={letter}
                to={`/cocktails/${letter}`}
                className="hover:text-white"
              >
                {letter} /
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 w-full"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mt-6 space-y-4 sm:space-y-0">
          {/* Copyright Section */}
          <div className="text-sm text-gray-400 text-center sm:text-left">
            © 2024 TheCocktailDB.{" "}
            <span className="block sm:inline">Proudly built in the UK 🇬🇧</span>
          </div>

          {/* Navigation Links */}
          <div className="space-x-4 text-sm">
            <a href="#missing" className="hover:text-white">Missing</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#faq" className="hover:text-white">Faq</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>

          {/* Social Links */}
          <div className="flex space-x-2">
            <a href="#facebook" className="text-blue-600 hover:text-white">FB</a>
            <a href="#twitter" className="text-blue-400 hover:text-white">TW</a>
            <a href="#discord" className="text-indigo-500 hover:text-white">DC</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
