import { CurrencyState } from "@/context/currency";
import { endpointUrl } from "@/constants";
import { CheckoutData } from "@/libs/types";

export const classNames = (...classes: (string | number | boolean | undefined)[]): string => {
    return classes.filter(Boolean).join(" ");
};

export const currencyFormatter = (value: number, currency: CurrencyState): string => {
    const convertedValue = value * currency.rate;

    return new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: currency.id,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: currency.decimal,
    }).format(convertedValue);
};

export const formattedResponse = (statusCode: number, body: unknown) => {
    return {
        statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
    };
};

export const checkout = async ({
    price,
    currency,
}: {
    price?: number;
    currency: CurrencyState;
}) => {
    const checkoutUrl = `${endpointUrl}/checkout?currency=${currency.id}`;

    const response = await fetch(checkoutUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            amount: price,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message as string);
    }

    return data as CheckoutData;
};
