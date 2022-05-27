import { createContext, FC, ReactNode, useContext, useMemo, useState } from "react";

export type CurrencyData = {
    id: string;
    name: string;
    symbol: string;
    iconClass: string;
    rate: number;
    decimal: number;
};

type CurrencyContext = {
    currencies: CurrencyData[];
    defaultCurrency: CurrencyData;
    setDefaultCurrency: (currency: CurrencyData) => void;
};

export const currencies: CurrencyData[] = [
    {
        id: "MYR",
        name: "Malaysian Ringgit",
        symbol: "RM",
        iconClass: "fi fi-my",
        rate: 3.1,
        decimal: 2,
    },
    {
        id: "SGD",
        name: "Singapore Dollar",
        symbol: "S$",
        iconClass: "fi fi-sg",
        rate: 1,
        decimal: 2,
    },
];

const CurrencyContext = createContext<CurrencyContext>({} as CurrencyContext);

type CurrencyProviderProps = {
    children: ReactNode;
};

export const CurrencyProvider: FC<CurrencyProviderProps> = ({ children }) => {
    const [currency, setCurrency] = useState(currencies[1]);

    const defaultValue: CurrencyContext = useMemo(
        () => ({
            currencies,
            defaultCurrency: currency,
            setDefaultCurrency: (currency) => setCurrency(currency),
        }),
        [currency, setCurrency]
    );

    return <CurrencyContext.Provider value={defaultValue}>{children}</CurrencyContext.Provider>;
};

export const useCurrencyContext = () => useContext(CurrencyContext);
