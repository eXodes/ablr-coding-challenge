import { Outlet } from "react-router-dom";
import { CurrencyProvider } from "@/context/currency";
import CartProvider from "@/context/cart";
import { Layout } from "@/components/shared/Layout";
import { ShoppingCart } from "@/components/feature/ShoppingCart";

const App = () => {
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
