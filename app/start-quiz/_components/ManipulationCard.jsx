// components/ManipulationCard.js
import React from "react";

const ManipulationCard = ({ manipulation, isSelected, onClick }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 cursor-pointer p-4 hover:shadow relative overflow-hidden group bg-cover bg-center h-[45vh] w-[20vw] rounded-sm ${
        isSelected ? "ring-2 ring-blue-500 " : ""
      }`}
      style={{
        backgroundImage: `url(${manipulation.image_link})`,
      }}
      onClick={() => onClick(manipulation.name)}
    >
      <div
        className={`absolute inset-0 bg-black group-hover:opacity-80 transition-opacity duration-300 ${
          isSelected ? "opacity-90" : "opacity-60"
        }`}
      ></div>
      <div className="relative z-10 text-center h-[30vh]">
        <h1 className="text-white font-bold text-lg mb-2">
          {manipulation.name}
        </h1>
        <p className="text-white font-light w-[25ch] text-xs">
          {manipulation.desc}
        </p>
      </div>
    </div>
  );
};

export default ManipulationCard;
