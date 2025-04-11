"use client";
import QuantityControl from "../OrderComponent/QuantityControl";
import React from "react";
import SubmitOrder from "../OrderComponent/SubmitOrder";
import { useUser } from "../provider/UserProvider";
import OrderStatus from "../OrderComponent/OrderStatus";
import { CgClose } from "react-icons/cg";
import { useCart } from "../provider/CartProvider";

const Basket: React.FC<BasketProps> = ({
  toggleSidebar,
  isOpen,
  orderStatus,
  setOrderStatus,
}) => {
  const { isAuthenticated } = useUser();
  const { orderedFoods, updateQuantity, removeItem, clearCart } = useCart();
  if (!isAuthenticated) return null;
  const totalPrice = orderedFoods.reduce(
    (total, order) => total + order.food.price * order.quantity,
    0
  );
  return (
    <div>
      <button
        className="absolute top-2 right-3 text-gray-600 text-xl"
        onClick={toggleSidebar}
      >
        ✖
      </button>
      <div className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">My Order List</h2>
        {orderedFoods.length === 0 ? (
          <p className="text-gray-600">Your basket is empty.</p>
        ) : (
          <div>
            {orderedFoods.map((order, index) => {
              const imageSrc = order.food.image || order.food.imageUrl;

              return (
                <div
                  key={`${order.food._id}-${index}`}
                  className="border p-3 sm:p-4 mb-3 rounded-md flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  {imageSrc && typeof imageSrc === "string" && imageSrc.startsWith("http") && (
                    <img
                      src={imageSrc}
                      alt={order.food.foodName}
                      className="w-full sm:w-24 h-24 object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.png";
                      }}
                    />
                  )}
                  <div className="flex-1 relative w-full">
                    <h3 className="text-sm sm:text-base font-bold text-red-600">
                      {order.food.foodName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {order.food.ingredients}
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <QuantityControl
                        quantity={order.quantity}
                        onQuantityChange={(newQuantity) =>
                          updateQuantity(order.food._id, newQuantity)
                        }
                      />
                      <p className="text-gray-700 text-sm sm:text-base">
                        Price: {order.food.price}₮
                      </p>
                    </div>

                    <button
                      className="text-red-500 border-2 rounded-full p-1 absolute top-0 right-0"
                      onClick={() => removeItem(index)}
                      title="Remove item"
                    >
                      <CgClose />
                    </button>
                  </div>
                </div>
              );
            })}

            <p className="text-right text-lg sm:text-xl font-bold text-red-600 mt-4">
              Total: {totalPrice.toLocaleString()}₮
            </p>
          </div>
        )}

        {orderedFoods.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md"
              onClick={toggleSidebar}
            >
              Close
            </button>
            <SubmitOrder
              setOrderStatus={setOrderStatus}
              orderStatus={orderStatus}
            />
            {orderStatus && (
              <OrderStatus
                status={orderStatus}
                onClose={() => setOrderStatus("")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
