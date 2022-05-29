import { CurrencyState } from "@/context/currency/index";

export enum ActionTypes {
    SET_CURRENCY = "SET_CURRENCY",
}

export type Action = { type: ActionTypes.SET_CURRENCY; payload: CurrencyState };

export const currencyReducer = (state: CurrencyState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_CURRENCY:
            return action.payload;
        default:
            return state;
    }
};
