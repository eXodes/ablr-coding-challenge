import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import CurrencyProvider, { currencies, useCurrencyContext } from "@/context/currency";
import CartProvider from "@/context/cart";
import { ActionTypes } from "@/context/currency/currencyReducer";
import { Layout } from "@/components/shared/Layout";
import { ShoppingCart } from "@/components/feature/ShoppingCart";

const App = () => {
    const [searchParams] = useSearchParams();
    const [, dispatch] = useCurrencyContext();

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
        <CurrencyProvider>
            <CartProvider>
                <ShoppingCart />

                <Layout>
                    <Outlet />
                </Layout>
            </CartProvider>
        </CurrencyProvider>
    );
};

export default App;
