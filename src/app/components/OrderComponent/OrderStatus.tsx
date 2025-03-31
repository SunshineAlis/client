"use client"

type orderStatusProps = {
    status: "success" | "error" | "";
    onClose: () => void;
};

const OrderStatus: React.FC<orderStatusProps> = ({ status, onClose }) => {
    if (!status) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
                {status === "success" ? (
                    <p className="text-green-500 font-bold">Order Created Successfully! ✅</p>
                ) : (
                    <p className="text-red-500 font-bold">Error creating order. </p>
                )}
                <button onClick={onClose} className="mt-4 bg-gray-300 px-4 py-2 rounded-md">
                    Close
                </button>
            </div>
        </div>
    );
};
export default OrderStatus;  