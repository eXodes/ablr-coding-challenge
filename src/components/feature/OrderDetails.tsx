import { FC, useCallback } from "react";
import { useCartContext } from "@/context/cart";
import { Link } from "react-router-dom";
import { useCurrencyContext } from "@/context/currency";
import { currencyFormatter } from "@/utils";
import { BadgeCheckIcon } from "@heroicons/react/solid";

interface OrderDetailsProps {
    status?: string | null;
    amount?: string | null;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ status, amount }) => {
    const [cart] = useCartContext();
    const [currency] = useCurrencyContext();
    const format = useCallback((price: number) => currencyFormatter(price, currency), [currency]);

    return (
        <main className="bg-white">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-4xl">
                <section aria-labelledby="order-heading">
                    <h3 className="sr-only">Items</h3>
                    <div className="divide-y">
                        {cart.items.map((product) => (
                            <div key={product.id} className="flex space-x-6 py-10">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                                />
                                <div className="flex flex-auto flex-col">
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            <Link to={`/products/${product.id}`}>
                                                {product.name}
                                            </Link>
                                        </h4>
                                        <p className="mt-2 text-sm text-gray-600">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="mt-6 flex flex-1 items-end">
                                        <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                                            <div className="flex">
                                                <dt className="font-medium text-gray-900">
                                                    Quantity
                                                </dt>
                                                <dd className="ml-2 text-gray-700">
                                                    {product.quantity}
                                                </dd>
                                            </div>
                                            <div className="flex pl-4 sm:pl-6">
                                                <dt className="font-medium text-gray-900">Price</dt>
                                                <dd className="ml-2 text-gray-700">
                                                    {format(product.price)}
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="sm:ml-40 sm:pl-6">
                        <h3 className="sr-only">Your information</h3>

                        <h4 className="sr-only">Payment</h4>
                        <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
                            <div>
                                <dt className="font-medium text-gray-900">Payment method</dt>
                                <dd className="mt-2 text-gray-700">
                                    <p>
                                        Checkout with Ablr
                                        {status === "approved" ? (
                                            <BadgeCheckIcon className="ml-1 inline-block h-5 w-5 text-green-500" />
                                        ) : null}
                                        {status === "fully_repaid" ? (
                                            <span className="ml-1 inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                                                Repaid
                                            </span>
                                        ) : null}
                                    </p>
                                </dd>
                            </div>
                        </dl>

                        <h3 className="sr-only">Summary</h3>

                        <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                            <div className="flex justify-between">
                                <dt className="font-medium text-gray-900">Total</dt>
                                <dd className="text-gray-900">
                                    {amount ? format(parseInt(amount)) : null}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </section>
            </div>
        </main>
    );
};
