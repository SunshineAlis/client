
const QuantityControl: React.FC<{
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
}> = ({ quantity, onQuantityChange }) => {
    return (
        <div className="flex items-center">
            <button
                className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-l-md"
                onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
            >
                -
            </button>
            <span className="px-4 text-lg font-semibold">{quantity}</span>
            <button
                className="px-3 py-1 bg-gray-200 text-lg font-bold rounded-r-md"
                onClick={() => onQuantityChange(quantity + 1)}
            >
                +
            </button>
        </div>
    );
};

export default QuantityControl;