import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    ReducerWithoutAction,
    useContext,
    useReducer,
} from "react";
import { Action, cartReducer } from "@/context/cart/cartReducer";
import { ProductData } from "@/hooks/products";

export type CartProductData = ProductData & {
    quantity: number;
};

export interface CartState {
    items: CartProductData[];
    total: number;
    isOpen: boolean;
}

const initialState: CartState = {
    items: [],
    total: 0,
    isOpen: false,
};

const CartContext = createContext([initialState, () => {}] as [CartState, Dispatch<Action>]);

type CartProviderProps = {
    children: ReactNode;
};

const CartProvider: FC<CartProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(
        cartReducer as ReducerWithoutAction<CartState>,
        initialState
    );

    return <CartContext.Provider value={[state, dispatch]}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);

export default CartProvider;
