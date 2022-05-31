import { ProductData } from "@/hooks/useProducts";
import { CartState } from "@/context/cart";

export enum ActionTypes {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    CLEAR_CART = "CLEAR_CART",
    SHOW_CART = "SHOW_CART",
}

export type Action =
    | { type: ActionTypes.ADD_TO_CART; payload: ProductData }
    | { type: ActionTypes.REMOVE_FROM_CART; payload: number }
    | { type: ActionTypes.CLEAR_CART }
    | { type: ActionTypes.SHOW_CART; payload: boolean };

export const cartReducer = (state: CartState, action: Action) => {
    const exist =
        action.type === ActionTypes.ADD_TO_CART &&
        state.items.find((item) => item.id === action?.payload?.id);
    const removed =
        action.type === ActionTypes.REMOVE_FROM_CART &&
        state.items.find((item) => item.id === action?.payload);

    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            if (exist) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.id === action?.payload?.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    total: state.total + action?.payload?.price,
                };
            }

            return {
                ...state,
                items: [...state.items, { ...action?.payload, quantity: 1 }],
                total: state.total + action?.payload?.price,
            };
        case ActionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload),
                total: state.total - (removed ? removed?.price * removed?.quantity : 0),
            };
        case ActionTypes.CLEAR_CART:
            return {
                ...state,
                items: [],
                total: 0,
            };
        case ActionTypes.SHOW_CART:
            return {
                ...state,
                isOpen: action.payload,
            };
        default:
            return state;
    }
};
