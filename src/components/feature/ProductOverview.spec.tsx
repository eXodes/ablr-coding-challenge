import { act } from "@testing-library/react";
import { render, screen, userEvent } from "@/tests/utils";
import { ProductOverview } from "@/components/feature/ProductOverview";
import { vi } from "vitest";

describe("ProductOverview features", () => {
    const handleClick = vi.fn();

    it.concurrent("should render the component", () => {
        render(<ProductOverview id={1} />);

        expect(screen.getByTestId("product-overview")).toBeInTheDocument();
    });

    it.concurrent("should render the product detail", () => {
        render(<ProductOverview id={1} />);

        expect(screen.getByTestId("product-name")).toBeVisible();
    });

    it.concurrent("should be able to checkout", async () => {
        render(<ProductOverview id={1} />);

        const button = screen.getByRole("button", { name: /checkout with ablr/i });

        await act(async () => {
            await userEvent.click(button);

            button.onclick = handleClick;

            await userEvent.click(button);

            expect(handleClick).toHaveBeenCalled();
        });
    });

    it.concurrent("should have product details link", () => {
        render(<ProductOverview id={1} />);

        const link = screen.getByRole("link", { name: /view details/i });

        expect(link).toHaveAttribute("href", "/products/1");
    });
});
