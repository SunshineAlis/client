"use client";
import QuantityControl from "../OrderComponent/QuantityControl";
import React, { useState, useEffect } from "react";
import SubmitOrder from "../OrderComponent/SubmitOrder";
import { useUser } from "../provider/UserProvider";
import { ConfirmAddress } from "../OrderComponent/ConfirmAddress";
import { CgClose } from "react-icons/cg";
const Basket: React.FC<BasketProps> = ({
  orderedFoods,
  toggleSidebar,
  isOpen,
  updateQuantity,
  removeItem,
  setOrderedFoods,
  setOrderStatus,
}) => {
  const { isAuthenticated } = useUser();
  const [autoOpen, setAutoOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && orderedFoods.length > 0) {
      setAutoOpen(true);
    }
  }, [isAuthenticated, orderedFoods.length]);
  if (!isAuthenticated) return null;
  const totalPrice = orderedFoods.reduce(
    (total, order) => total + order.food.price * order.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[38%] bg-white shadow-lg transition-transform duration-300 ease-in-out ${isOpen || autoOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col max-h-screen overflow-y-auto`}
    >
      <button
        className="absolute top-2 right-3 text-gray-600 text-xl"
        onClick={toggleSidebar}
      >
        ✖
      </button>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">My Order List</h2>
        {orderedFoods.length === 0 ? (
          <p className="text-gray-600">Your basket is empty.</p>
        ) : (
          <div>
            {orderedFoods.map((order, index) => (
              <div
                key={order.food._id}
                className="border p-4 mb-2 rounded-md flex justify-between items-center"
              >
                <div className="flex relative">
                  {order.food.image && typeof order.food.image === "string" && (
                    <img
                      src={order.food.image}
                      alt={order.food.foodName}
                      className="h-25 w-[30%] object-cover rounded-lg"
                    />
                  )}
                  <div className="flex justify-between p-2 relative">
                    <div>
                      <h3 className="text-[12px] font-bold text-red-600">{order.food.foodName}</h3>
                      <span className="text-sm font-normal block text-gray-600  px-2 py-1 rounded-md">
                        {order.food.ingredients}
                      </span>
                      <div className="flex justify-between mt-6">
                        <QuantityControl
                          quantity={order.quantity}
                          onQuantityChange={(newQuantity) =>
                            updateQuantity(order.food._id, newQuantity)
                          }
                        />
                        <p className="text-gray-700">Price: {order.food.price}₮</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="text-red-500 border-2 rounded-full p-2 absolute top-0 right-0"
                    onClick={() => removeItem(index)}
                    title="Remove item"
                  >
                    <CgClose />
                  </button>
                </div>
              </div>
            ))}
            <ConfirmAddress />
            <p className="text-right text-xl font-bold text-red-600 mt-4">
              Total: {totalPrice.toLocaleString()}₮
            </p>
          </div>
        )}
        {orderedFoods.length > 0 && (
          <div className="flex justify-end mt-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              onClick={toggleSidebar}
            >
              Close
            </button>
            <SubmitOrder
              orderedFoods={orderedFoods}
              setOrderedFoods={setOrderedFoods}
              setOrderStatus={setOrderStatus}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Basket;
