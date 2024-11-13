import React from "react";
import background from "../../assets/images/b 1.jpg";

const MixAndSipSection = () => {
  return (
    <div
      className="relative text-center py-20 bg-cover bg-center h-[550px] mt-10"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black opacity-25"></div>

      <div className="relative z-8 mx-auto text-white  mt-5">
        <h2 className="text-4xl text-black font-bold mb-4 font-serif">
          Mix & Sip
        </h2>
        <p className="text-white text-[20px] font-serif mt-10 mb-5">
          Cocktails • Mocktails • Signature Creations • Seasonal Specials • DIY
          Kits
        </p>
        <p className="text-black mx-auto max-w-[1100px] mt-10 font-serif text-[24px] leading-relaxed text-justify">
          Discover the art of mixology with a curated selection of cocktails,
          crafted to suit any occasion. Whether you're looking to unwind,
          impress your guests, or try something new, our menu offers a unique
          blend of flavors and inspiration. From classic favorites to inventive
          new mixes, every drink is crafted with care and creativity. Let us
          elevate your experience and make every sip memorable.
        </p>
      </div>
    </div>
  );
};

export default MixAndSipSection;
