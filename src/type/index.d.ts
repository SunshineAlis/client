type Food = {
    category: {
        _id: string;
        categoryName: string;
    };
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image?: string | null | File;
    categoryId?: string;
    imageUrl?: string;
    image?: string;
    imageUrl?: string;
};
type Category = {
    _id: string;
    categoryName: string;
    foods?: Food[];
};
type FoodOrderItem = {
    food: {
        _id: string;
        foodName: string;
        price: number;
    };
    quantity: number;
};
type OrderedFood = {
    food: Food;
    quantity: number;
};
type SubmitOrderProps = {
    orderedFoods: OrderedFood[];
    setOrderedFoods: (foods: OrderedFood[]) => void;
    setOrderStatus: (status: "" | "success" | "error") => void;
};
type User = {
    token: any;
    _id: string;
    email: string;
    phone?: string;
    address?: string;
    role?: string;
};
type OrderFoodProps = {
    food: Food;

};
type UserContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isConfirmed: boolean;
    setUser: (user: User | null) => void;
    setIsConfirmed: (isConfirmed: boolean) => void;
    logout: () => void;
    updateUser: (updatedUser: Partial<User>) => void;
};
type CategoryProps = {
    categories: Category[];
    foodCountByCategory: { [key: string]: number };
};
type LoginMenuProps = {
    logout: () => void;
    setMenuOpen: (open: boolean) => void;
};
type FoodProps = {
    food: Food;
    addToOrder: (food: Food, quantity: number) => void;
    quantity?: number;
}
type BasketProps = {
    toggleSidebar: () => void;
    isOpen: boolean;
    setOrderStatus: (status: "" | "success" | "error") => void;
    orderStatus: "" | "success" | "error";
};
type HeaderProps = {
    orderedFoodsCount: number;
}
type OrderedFood = {
    food: Food;
    quantity: number;
};
type orderStatusProps = {
    status: "success" | "error" | "";
    onClose: () => void;
};

type BasketOrderCardProps = {
    setViewType: (view: "basket" | "orders") => void;
    fetchBasketData: () => void;
    fetchOrderData: () => void;
};
type AddModalProps = {
    food: Food;
    isOpen: boolean;
    onClose: () => void;
    addToOrder: (food: Food, quantity: number) => void;
};
type OrderSidebarProps = {
    orderedFoods?: OrderedFood[];
    setOrderedFoods?: React.Dispatch<React.SetStateAction<OrderedFood[]>>;
    orderStatus?: "" | "success" | "error";
    setOrderStatus?: React.Dispatch<React.SetStateAction<"" | "success" | "error">>;
};
type ViewType = "basket" | "orderHistory" | null;

type OrderSidebarContextType = {
    isOpen: boolean;
    currentView: ViewType;
    toggleSidebar: (view: ViewType) => void;
    closeSidebar: () => void;
}
type CartContextType = {
    orderedFoods: OrderedFood[];
    addToOrder: (food: Food, quantity: number) => void;
    updateQuantity: (foodId: string, newQuantity: number) => void;
    removeItem: (index: number) => void;
    clearCart: () => void;
    refetch: () => void;
    setOrderedFoods: React.Dispatch<React.SetStateAction<OrderedFood[]>>;
};