import { vi } from "vitest";
import { act } from "@testing-library/react";
import { render, screen, userEvent } from "@/test/utils";
import { ProductList } from "@/components/feature/ProductList";

describe("ProductList features", () => {
    const handleClick = vi.fn();

    it.concurrent("should render the component", () => {
        render(<ProductList />);

        expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });

    it.concurrent("should render the products", () => {
        render(<ProductList />);

        expect(screen.getByTestId("product-list").children.length).toBeGreaterThanOrEqual(1);
    });

    it.concurrent("should be able to view products overview", () => {
        render(<ProductList />);

        const button = screen.getAllByRole("button", { name: /view/i });

        act(() => {
            button.forEach(async (element) => {
                await userEvent.click(element);

                expect(screen.getByTestId("product-overview")).toBeVisible();
            });
        });
    });

    it.concurrent("should be able to checkout", () => {
        render(<ProductList />);

        const button = screen.getAllByRole("button", { name: /view/i });

        act(() => {
            button.forEach(async (element) => {
                await userEvent.click(element);

                const checkoutButton = screen.getByRole("button", { name: /checkout with ablr/i });

                await userEvent.click(checkoutButton);

                checkoutButton.onclick = handleClick;

                await userEvent.click(checkoutButton);

                expect(handleClick).toHaveBeenCalled();
            });
        });
    });

    it.concurrent("should be able to view product overview", () => {
        render(<ProductList />);

        const button = screen.getAllByRole("button", { name: /view/i });

        act(() => {
            button.forEach(async (element) => {
                await userEvent.click(element);

                const viewButton = screen.getByRole("button", { name: /view details/i });

                await userEvent.click(viewButton);

                viewButton.onclick = handleClick;

                await userEvent.click(viewButton);

                expect(handleClick).toHaveBeenCalled();
            });
        });
    });
});
