import { Outlet, useSearchParams } from "react-router-dom";
import { withErrorBoundary, useErrorBoundary } from "react-use-error-boundary";
import { lowerCase, upperFirst } from "lodash-es";
import CartProvider from "@/context/cart";
import CurrencyProvider from "@/context/currency";
import { Layout } from "@/components/shared/Layout";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { ShoppingCart } from "@/components/feature/ShoppingCart";
import { SuccessAlert } from "@/components/shared/SuccessAlert";
import { Container } from "@/components/shared/Container";

const App = withErrorBoundary(() => {
    const [error, resetError] = useErrorBoundary();
    const [searchParams] = useSearchParams();

    const checkoutId = searchParams.get("checkout_id");
    const orderCode = searchParams.get("order_code");
    const orderState = searchParams.get("order_state");

    if (error) {
        return (
            <div className="flex min-h-full flex-col bg-white px-32">
                <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="py-16">
                        <ErrorAlert title={error.name}>
                            <p className="text-sm">{error.message}</p>
                            <div className="mt-4 mr-5 text-sm text-red-500">
                                <pre className="whitespace-pre-wrap rounded-md bg-red-100 p-4 leading-6 shadow-inner shadow-red-200">
                                    {error.stack}
                                </pre>
                            </div>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                                    onClick={resetError}
                                >
                                    Dismiss
                                </button>
                            </div>
                        </ErrorAlert>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <CurrencyProvider>
            <CartProvider>
                <ShoppingCart />

                <Layout>
                    {checkoutId && orderCode && orderState && (
                        <Container>
                            <SuccessAlert
                                title={
                                    <>
                                        Thank you for your order. Your order number is
                                        <strong> {orderCode}</strong>.
                                    </>
                                }
                            >
                                <p>
                                    Your order status:{" "}
                                    <span className="font-semibold">
                                        {upperFirst(lowerCase(orderState))}
                                    </span>
                                </p>
                            </SuccessAlert>
                        </Container>
                    )}

                    <Outlet />
                </Layout>
            </CartProvider>
        </CurrencyProvider>
    );
});

export default App;
