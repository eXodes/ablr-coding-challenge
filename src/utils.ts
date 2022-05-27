import { CurrencyData } from "@/context/currency";

export const classNames = (...classes: (string | number | boolean | undefined)[]): string => {
    return classes.filter(Boolean).join(" ");
};

export const currencyFormatter =
    (currency: CurrencyData) =>
    (value: number): string => {
        const convertedValue = value * currency.rate;

        return new Intl.NumberFormat(navigator.language, {
            style: "currency",
            currency: currency.id,
            currencyDisplay: "narrowSymbol",
            minimumFractionDigits: currency.decimal,
        }).format(convertedValue);
    };
