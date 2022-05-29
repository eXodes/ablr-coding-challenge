import { createContext, Dispatch, FC, ReactNode, useContext, useReducer } from "react";
import { Action, currencyReducer } from "@/context/currency/currencyReducer";

export type CurrencyState = {
    id: string;
    name: string;
    symbol: string;
    iconClass: string;
    rate: number;
    decimal: number;
};

export const currencies: CurrencyState[] = [
    {
        id: "SGD",
        name: "Singapore Dollar",
        symbol: "S$",
        iconClass: "fi fi-sg",
        rate: 1,
        decimal: 2,
    },
    {
        id: "MYR",
        name: "Malaysian Ringgit",
        symbol: "RM",
        iconClass: "fi fi-my",
        rate: 3.1,
        decimal: 2,
    },
];

const CurrencyContext = createContext([currencies[0], () => {}] as [
    CurrencyState,
    Dispatch<Action>
]);
type CurrencyProviderProps = {
    children: ReactNode;
};

export const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(currencyReducer, currencies[0]);

    return (
        <CurrencyContext.Provider value={[state, dispatch]}>{children}</CurrencyContext.Provider>
    );
};

export const useCurrencyContext = () => useContext(CurrencyContext);
