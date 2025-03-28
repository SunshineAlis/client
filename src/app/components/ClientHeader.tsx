import React from "react";
import { MdOutlineLocationOn } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

type HeaderProps = {
  toggleSidebar: () => void;
  orderedFoodsCount: number;
};

const ClientHeader: React.FC<HeaderProps> = ({
  toggleSidebar,
  orderedFoodsCount,
}) => {
  const router = useRouter();
  return (
    <header className="bg-black shadow-md p-4 flex justify-between items-center ">
      <div className="flex items-center justify-start ml-20 pl-10">
        <img src="foodDeliver.webp" className="w-[8%] rounded" />
        <div>
          <h1 className="ml-2 text-xl font-bold text-white  italic">
            Nom<span className="text-red-500">Nom</span>
          </h1>
          <p className="text-white ml-2">Swift Delivery</p>
        </div>
      </div>


      <div className="relative flex items-center bg-white w-[50%] h-10 rounded-2xl px-4 shadow-md border border-gray-200">
        <MdOutlineLocationOn className="text-red-500 text-xl" />
        <p className="text-l text-red-500 font-medium">Delivery location</p>

        <input
          type="text"
          placeholder="Add Location"
          className="ml-3 w-[34%] bg-transparent outline-none text-gray-700 placeholder-gray-400"
        />

        <IoIosArrowForward className="text-gray-500 text-xl ml-2" />
      </div>

      <button
        onClick={toggleSidebar}
        className="relative bg-gray-200 p-2 mx-2 rounded-2xl cursor-pointer"
      >
        <SlBasket className="text-2xl" />
        {orderedFoodsCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {orderedFoodsCount}
          </span>
        )}
      </button>
      <div className="bg-red-500 rounded-full h-10 p-3 flex items-center justify-center cursor-pointer mr-[120px]">
        <IoPersonOutline
          className="text-white text-2xl"
          onClick={() => router.push("/sign-up")}
        />
      </div>
    </header>
  );
};

export default ClientHeader;
