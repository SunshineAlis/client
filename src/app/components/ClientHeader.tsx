import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

type HeaderProps = {
  toggleSidebar: () => void;
  orderedFoodsCount: number;
};

const ClientHeader: React.FC<HeaderProps> = ({ toggleSidebar, orderedFoodsCount }) => {
  return (
    <header className="bg-black shadow-md p-4 flex justify-around items-center ">
      <div className="flex items-center justify-start ml-4">
        <img src="foodDeliver.webp"
          className="w-[8%] rounded" />
        <div>
          <h1 className="ml-2 text-xl font-bold text-white  italic">Nom<span className="text-red-500">Nom</span></h1>
          <p className="text-white ml-2">Swift Delivery</p>
        </div>
      </div>
      <div className="relative flex items-center bg-white w-[35%] h-10 rounded-2xl px-4 mr-4 shadow-md border border-gray-200">
        <MdOutlineLocationOn className="text-red-500 text-xl" />
        <p className="text-l text-red-500 font-medium">Delivery location</p>

        <input
          type="text"
          placeholder="Add Location"
          className="ml-3 w-[32%] bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />

        <IoIosArrowForward className="text-gray-500 text-xl ml-2" />
      </div>


      <button onClick={toggleSidebar} className="relative bg-gray-200 p-2 m-2 rounded-2xl cursor-pointer">
        <SlBasket className="text-2xl" />
        {orderedFoodsCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {orderedFoodsCount}
          </span>
        )}
      </button>
      <div className="bg-red-500 rounded-full h-10 p-3 flex items-center justify-center cursor-pointer">
        <IoPersonOutline className="text-white text-2xl" />
      </div>
    </header >
  );
};

export default ClientHeader;
