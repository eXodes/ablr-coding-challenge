import { FC, useCallback, useEffect, useState } from "react";
import { ProductData, useProducts } from "@/hooks/useProducts";
import { useCurrencyContext } from "@/context/currency";
import { checkout, currencyFormatter } from "@/utils";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

interface ProductDetailsProps {
    id?: number;
}

export const ProductOverview: FC<ProductDetailsProps> = ({ id }) => {
    const [, { getById }] = useProducts();
    const [product, setProduct] = useState<ProductData | undefined>(undefined);

    const [currency] = useCurrencyContext();
    const format = useCallback((price: number) => currencyFormatter(price, currency), [currency]);

    useEffect(() => {
        if (id) setProduct(getById(id));
    }, [id, getById]);

    const handleCheckout = async () => {
        const data = await checkout({
            price: product?.price,
            currency,
        });

        window.location.href = data ? data?.checkout_url : "";
    };

    return (
        <>
            {product ? (
                <div
                    className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8"
                    data-testid="product-overview"
                >
                    <div className="sm:col-span-4 lg:col-span-5">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                            <img
                                src={product?.imageSrc}
                                alt={product?.imageAlt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                            {product?.name}
                        </h2>

                        <section aria-labelledby="information-heading" className="mt-3">
                            <h3 id="information-heading" className="sr-only">
                                Product information
                            </h3>

                            <p className="text-2xl text-gray-900">{format(product?.price)}</p>

                            <div className="mt-6">
                                <h4 className="sr-only">Description</h4>

                                <p className="text-sm text-gray-700">{product?.description}</p>
                            </div>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-6">
                            <h3 id="options-heading" className="sr-only">
                                Product options
                            </h3>

                            <div>
                                <div className="mt-6">
                                    <button
                                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        onClick={handleCheckout}
                                    >
                                        <LightningBoltIcon className="mr-2 h-5 w-5" />
                                        Checkout with Ablr
                                    </button>
                                </div>

                                <p className="absolute top-4 left-4 text-center sm:static sm:mt-6">
                                    <Link
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        to={`/products/${product.id}`}
                                    >
                                        View details
                                        <span className="sr-only">, {product.name}</span>
                                    </Link>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            ) : null}
        </>
    );
};
