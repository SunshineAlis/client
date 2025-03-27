import React from "react";
import QuantityControl from "@/OrderComponent/QuantityControl";
import SubmitOrder from "../components/SubmitOrder";

type BasketProps = {
  orderedFoods: { food: any; quantity: number }[];
  toggleSidebar: () => void;
  isOpen: boolean;
  updateQuantity: (foodId: string, newQuantity: number) => void;
  removeItem: (index: number) => void;
  setOrderedFoods: (foods: { food: any; quantity: number }[]) => void;
  setOrderStatus: (status: "" | "success" | "error") => void;
};

const Basket: React.FC<BasketProps> = ({
  orderedFoods,
  toggleSidebar,
  isOpen,
  updateQuantity,
  removeItem,
  setOrderedFoods,
  setOrderStatus,
}) => {
  const totalPrice = orderedFoods.reduce(
    (total, order) => total + order.food.price * order.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg p-6 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } w-80`}
    >
      <button
        className="absolute top-2 right-3 text-gray-600 text-xl"
        onClick={toggleSidebar}
      >
        ✖
      </button>
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
              <div>
                <h3 className="text-lg font-bold">{order.food.foodName}</h3>
                <p className="text-gray-700">Price: {order.food.price}₮</p>
                <QuantityControl
                  quantity={order.quantity}
                  onQuantityChange={(newQuantity) =>
                    updateQuantity(order.food._id, newQuantity)
                  }
                />
              </div>
              <button
                className="text-red-500"
                onClick={() => removeItem(index)}
                title="Remove item"
              >
                🗑
              </button>
            </div>
          ))}
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
  );
};

export default Basket;
