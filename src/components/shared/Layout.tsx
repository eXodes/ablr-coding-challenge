import { FC, Fragment, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from "@heroicons/react/outline";
import { useCartContext } from "@/context/cart";
import { ActionTypes } from "@/context/cart/cartReducer";
import { CurrencySelector } from "@/components/feature/CurrencySelector";

const navigation = {
    pages: [{ name: "Products", href: "/" }],
};

type ContainerProps = {
    children: ReactNode;
};

export const Layout: FC<ContainerProps> = ({ children }) => {
    const [{ items }, dispatch] = useCartContext();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="min-h-full bg-white">
                <Transition.Root show={open} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-40 flex lg:hidden"
                        onClose={setOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 py-5">
                                    <button
                                        type="button"
                                        className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                                    {navigation.pages.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link
                                                to={page.href}
                                                className="-m-2 block p-2 font-medium text-gray-900"
                                            >
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 py-6 px-4">
                                    <CurrencySelector />
                                </div>
                            </div>
                        </Transition.Child>
                    </Dialog>
                </Transition.Root>

                <header className="relative bg-white">
                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex flex-1 items-center lg:hidden">
                                    <button
                                        type="button"
                                        className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                                        onClick={() => setOpen(true)}
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <a
                                        href="#"
                                        className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                                    >
                                        <span className="sr-only">Search</span>
                                        <SearchIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Flyout menus */}
                                <Popover.Group className="hidden lg:block lg:flex-1 lg:self-stretch">
                                    <div className="flex h-full space-x-8">
                                        {navigation.pages.map((page) => (
                                            <Link
                                                key={page.name}
                                                to={page.href}
                                                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            >
                                                {page.name}
                                            </Link>
                                        ))}
                                    </div>
                                </Popover.Group>

                                {/* Logo */}
                                <Link to="/" className="flex">
                                    <span className="sr-only">Workflow</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                                        alt=""
                                    />
                                </Link>

                                <div className="flex flex-1 items-center justify-end">
                                    <span className="hidden text-gray-700 hover:text-gray-800 lg:flex lg:items-center">
                                        <CurrencySelector />
                                    </span>

                                    <div className="ml-4 flow-root lg:ml-8">
                                        <button
                                            onClick={() =>
                                                dispatch({
                                                    type: ActionTypes.SHOW_CART,
                                                    payload: true,
                                                })
                                            }
                                            className="group -m-2 flex items-center p-2"
                                        >
                                            <ShoppingBagIcon
                                                className="h-6 w-6 flex-shrink-0 text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span
                                                className="ml-2 text-sm font-medium text-gray-700"
                                                data-testid="cart-count"
                                            >
                                                {items.length}
                                            </span>
                                            <span className="sr-only">items in cart, view bag</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>

                <main className="mt-16 mb-32">{children}</main>
            </div>
        </>
    );
};
