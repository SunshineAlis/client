"use client";


const OrderStatus: React.FC<OrderStatusProps> = ({ status, onClose }) => {
    if (!status) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">
                    {status === "success" ? "Order Successful!" : "Order Failed"}
                </h2>
                <p className="text-gray-700 mb-6">
                    {status === "success"
                        ? "Thank you for your order. Redirecting to home..."
                        : "There was an issue with your order. Please try again."}
                </p>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Go Home Now
                </button>
            </div>
        </div>
    );
};

export default OrderStatus;