type Food = {
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image?: string | null | File;
    categoryId?: string;
    imageUrl?: string;
};
type Category = {
    _id: string;
    categoryName: string;
    foods?: Food[];
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


type CategoryProps = {
    categories: Category[];
    foodCountByCategory: { [key: string]: number };
    // setSelectedCategory: (id: string) => void;
    // openAddFoodModal: (catId: string) => void;
    // handleDelete?: (id: string) => void;
};
type BasketProps = {
    orderedFoods: { food: any; quantity: number }[];
    toggleSidebar: () => void;
    isOpen: boolean;
    updateQuantity: (foodId: string, newQuantity: number) => void;
    removeItem: (index: number) => void;
    setOrderedFoods: (foods: { food: any; quantity: number }[]) => void;
    setOrderStatus: (status: "" | "success" | "error") => void;
};
type LoginMenuProps = {
    logout: () => void;
    setMenuOpen: (open: boolean) => void;
};
type HeaderProps = {
    toggleSidebar: () => void;
    orderedFoodsCount: number;
};
type FoodProps = {
    food: Food;
    addToOrder: (food: Food, quantity: number) => void;
};
