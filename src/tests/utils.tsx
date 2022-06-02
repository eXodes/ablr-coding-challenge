import { createMemoryHistory } from "history";
import { FC, ReactElement, ReactNode } from "react";
import { Router } from "react-router-dom";
import { afterEach } from "vitest";
import { cleanup, render, RenderOptions } from "@testing-library/react";
import CartProvider from "@/context/cart";
import CurrencyProvider from "@/context/currency";

afterEach(() => {
    cleanup();
});

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
    const history = createMemoryHistory();

    return (
        <Router location={history.location} navigator={history}>
            <CurrencyProvider>
                <CartProvider>{children}</CartProvider>
            </CurrencyProvider>
        </Router>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
    render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

export { customRender as render };
