import { FC, Fragment, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { LightningBoltIcon, XCircleIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { useCartContext } from "@/context/cart";
import { ActionTypes } from "@/context/cart/cartReducer";
import { useCurrencyContext } from "@/context/currency";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { checkout, classNames, currencyFormatter } from "@/utils";

export const ShoppingCart: FC = () => {
    const [{ items, total, isOpen }, dispatch] = useCartContext();
    const [currency] = useCurrencyContext();

    const navigate = useNavigate();
    const [error, setError] = useState<Error | undefined>(undefined);

    const format = useCallback((price: number) => currencyFormatter(price, currency), [currency]);

    const hideCart = useCallback(
        () => dispatch({ type: ActionTypes.SHOW_CART, payload: false }),
        [dispatch]
    );

    const handleCheckout = useCallback(async () => {
        try {
            const data = await checkout({
                price: total,
                currency,
            });

            data && navigate(data.checkout_url);
        } catch (error) {
            setError(error as Error);
        }
    }, [currency, navigate, total]);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={hideCart}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">
                                                {" "}
                                                Shopping cart{" "}
                                            </Dialog.Title>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={hideCart}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul
                                                    role="list"
                                                    className="-my-6 divide-y divide-gray-200"
                                                >
                                                    {items.length === 0 ? (
                                                        <li className="flex justify-center py-32">
                                                            <p className="text-center text-gray-400">
                                                                Your cart is empty.{" "}
                                                            </p>
                                                        </li>
                                                    ) : (
                                                        items.map((product) => (
                                                            <li
                                                                key={product.id}
                                                                className="flex py-6"
                                                            >
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={product.imageSrc}
                                                                        alt={product.imageAlt}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a
                                                                                    href={`/products/${product.id}`}
                                                                                >
                                                                                    {" "}
                                                                                    {
                                                                                        product.name
                                                                                    }{" "}
                                                                                </a>
                                                                            </h3>
                                                                            <p className="ml-4">
                                                                                {format(
                                                                                    product.price
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">
                                                                            {product.color}
                                                                        </p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">
                                                                            Qty {product.quantity}
                                                                        </p>

                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                onClick={() =>
                                                                                    dispatch({
                                                                                        type: ActionTypes.REMOVE_FROM_CART,
                                                                                        payload:
                                                                                            product.id,
                                                                                    })
                                                                                }
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>{format(total)}</p>
                                        </div>

                                        {error && (
                                            <div className="mt-6">
                                                <ErrorAlert
                                                    icon={
                                                        <XCircleIcon
                                                            className="h-5 w-5 text-red-400"
                                                            aria-hidden="true"
                                                        />
                                                    }
                                                >
                                                    {error.message}
                                                </ErrorAlert>
                                            </div>
                                        )}

                                        <div className="mt-6">
                                            <button
                                                className={classNames(
                                                    "flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm",
                                                    items.length !== 0
                                                        ? "hover:bg-indigo-700"
                                                        : "cursor-not-allowed"
                                                )}
                                                onClick={handleCheckout}
                                                disabled={items.length === 0}
                                            >
                                                <LightningBoltIcon className="mr-2 h-5 w-5" />
                                                Checkout with Ablr
                                            </button>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{" "}
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={hideCart}
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};
