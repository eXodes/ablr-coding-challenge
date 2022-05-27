import { FC, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { classNames } from "@/utils";
import { CurrencyData, useCurrencyContext } from "@/context/currency";

type CurrencySelectorProps = {
    className?: string;
    placeholder?: string;
    onSelect?: (option: CurrencyData) => void;
};

export const CurrencySelector: FC<CurrencySelectorProps> = ({ className, onSelect }) => {
    const { currencies, defaultCurrency, setDefaultCurrency } = useCurrencyContext();

    const handleSelect = (option: CurrencyData) => {
        setDefaultCurrency(option);
        onSelect?.(option);
    };

    return (
        <div className={className}>
            <Listbox value={defaultCurrency} onChange={handleSelect}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="sr-only">Change currency</Listbox.Label>
                        <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
                                <span className="flex items-center">
                                    <span className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
                                        <span
                                            className={classNames(
                                                "h-6 w-8",
                                                defaultCurrency.iconClass
                                            )}
                                        ></span>
                                    </span>

                                    <span className="ml-3 block truncate">
                                        {defaultCurrency.id}
                                    </span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                    <SelectorIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100 translate-y-0 scale-100"
                                leaveTo="opacity-0 -translate-y-4 scale-90"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {currencies.map((currency) => (
                                        <Listbox.Option
                                            key={currency.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active
                                                        ? "bg-indigo-600 text-white"
                                                        : "text-gray-900",
                                                    "relative cursor-default select-none py-2 pl-3 pr-9"
                                                )
                                            }
                                            value={currency}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full">
                                                            <span
                                                                className={classNames(
                                                                    "h-6 w-8",
                                                                    currency.iconClass
                                                                )}
                                                            ></span>
                                                        </span>
                                                        <span
                                                            className={classNames(
                                                                selected
                                                                    ? "font-semibold"
                                                                    : "font-normal",
                                                                "ml-3 block truncate"
                                                            )}
                                                        >
                                                            {currency.id}
                                                        </span>
                                                    </div>

                                                    {selected ? (
                                                        <span
                                                            className={classNames(
                                                                active
                                                                    ? "text-white"
                                                                    : "text-indigo-600",
                                                                "absolute inset-y-0 right-0 flex items-center pr-4"
                                                            )}
                                                        >
                                                            <CheckIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
};
