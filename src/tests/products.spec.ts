import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should have expected h1", async ({ page }) => {
        expect(await page.textContent("h1")).toBe("Products");
    });

    test("should have a list of products", async ({ page }) => {
        const products = await page.locator('h3[data-testid="product-name"]').count();

        expect(products).toBeGreaterThan(0);
    });

    test("should be able to view details page", async ({ page }) => {
        await page
            .locator('button[data-testid="view-product-overview"]:has-text("View")')
            .first()
            .click();

        await page.locator('a:has-text("View details")').click();

        expect(await page.textContent("h1")).toBe("Product Details");
        await expect(page).toHaveURL("/products/1");
    });

    test("should be able to checkout", async ({ page }) => {
        await page
            .locator('button[data-testid="view-product-overview"]:has-text("View")')
            .first()
            .click();

        await page.locator('button:has-text("Checkout")').click();

        await expect(page).toHaveURL(/.*checkout/);
    });
});
