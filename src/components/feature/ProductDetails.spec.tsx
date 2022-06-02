import { vi } from "vitest";
import { act } from "@testing-library/react";
import { render, screen, userEvent } from "@/tests/utils";
import { ProductDetails } from "@/components/feature/ProductDetails";

describe("ProductDetails features", () => {
    const handleClick = vi.fn();

    it.concurrent("should render the component", () => {
        render(<ProductDetails id="1" />);

        expect(screen.getByTestId("product-details")).toBeInTheDocument();
    });

    it.concurrent("should render the product detail", () => {
        render(<ProductDetails id="1" />);

        expect(screen.getByTestId("product-name")).toBeVisible();
    });

    it.concurrent("should be able to checkout", async () => {
        render(<ProductDetails id="1" />);

        const button = screen.getByRole("button", { name: /checkout with ablr/i });

        await act(async () => {
            button.onclick = handleClick;

            await userEvent.click(button);

            expect(handleClick).toHaveBeenCalled();
        });
    });

    it.concurrent("should be able to add to cart", async () => {
        render(<ProductDetails id="1" />);

        const button = screen.getByRole("button", { name: /add to bag/i });

        await act(async () => {
            button.onclick = handleClick;

            await userEvent.click(button);

            expect(handleClick).toHaveBeenCalled();
        });
    });
});
