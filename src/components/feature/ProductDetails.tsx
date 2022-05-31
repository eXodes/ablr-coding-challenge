import { FC, useCallback, useEffect, useState } from "react";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { checkout, currencyFormatter } from "@/utils";
import { ProductData, useProducts } from "@/hooks/useProducts";
import { useCurrencyContext } from "@/context/currency";
import { useCartContext } from "@/context/cart";
import { ActionTypes } from "@/context/cart/cartReducer";

interface ProductDetailsProps {
    id: string;
}

export const ProductDetails: FC<ProductDetailsProps> = ({ id }) => {
    const [, { getById }] = useProducts();
    const [product, setProduct] = useState<ProductData | undefined>(undefined);
    const [currency] = useCurrencyContext();
    const format = useCallback((price: number) => currencyFormatter(price, currency), [currency]);
    const [, dispatch] = useCartContext();

    const handleCheckout = async () => {
        const data = await checkout({
            price: product?.price,
            currency,
        });

        window.location.href = data ? data?.checkout_url : "";
    };

    useEffect(() => {
        if (id) setProduct(getById(parseInt(id)));
    }, [id, getById]);

    return (
        <div className="bg-white">
            {product ? (
                <div
                    className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-7xl"
                    data-testid="product-details"
                >
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* Image gallery */}
                        <div className="aspect-square w-full">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center sm:rounded-lg"
                            />
                        </div>

                        {/* Product info */}
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            <h1
                                className="text-3xl font-extrabold tracking-tight text-gray-900"
                                data-testid="product-name"
                            >
                                {product.name}
                            </h1>

                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl text-gray-900">{format(product.price)}</p>
                            </div>

                            <div className="mt-6">
                                <h3 className="sr-only">Description</h3>

                                <div
                                    className="space-y-6 text-base text-gray-700"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            </div>

                            <div className="mt-6">
                                <div className="mt-10 flex flex-row gap-2">
                                    <button
                                        type="button"
                                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                        onClick={handleCheckout}
                                    >
                                        <LightningBoltIcon className="mr-2 h-5 w-5" />
                                        Checkout with Ablr
                                    </button>

                                    <button
                                        type="button"
                                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                                        onClick={() =>
                                            dispatch({
                                                type: ActionTypes.ADD_TO_CART,
                                                payload: product,
                                            })
                                        }
                                    >
                                        Add to bag
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Product doesn&apos;t exist.</div>
            )}
        </div>
    );
};
