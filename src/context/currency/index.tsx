import { createContext, Dispatch, FC, ReactNode, useContext, useEffect, useReducer } from "react";
import { Action, ActionTypes, currencyReducer } from "@/context/currency/currencyReducer";
import { useSearchParams } from "react-router-dom";

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

const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(currencyReducer, currencies[0]);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const currencyId = searchParams.get("currency");

        if (currencyId) {
            const currency = currencies.find((currency) => currency.id === currencyId);

            if (currency) {
                dispatch({
                    type: ActionTypes.SET_CURRENCY,
                    payload: currency,
                });
            }
        }
    });

    return (
        <CurrencyContext.Provider value={[state, dispatch]}>{children}</CurrencyContext.Provider>
    );
};

export const useCurrencyContext = () => useContext(CurrencyContext);

export default CurrencyProvider;
