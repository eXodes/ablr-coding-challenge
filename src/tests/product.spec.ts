import { expect, test } from "@playwright/test";

test.describe("Product Details", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/products/1");
    });

    test("should have expected h1", async ({ page }) => {
        expect(await page.textContent("h1")).toBe("Product Details");
    });

    test("should have a list of products", async ({ page }) => {
        const product = await page.locator('h3[data-testid="product-name"]').textContent();

        expect(product).toBeDefined();
    });

    test("should be able to checkout", async ({ page }) => {
        await page.locator('button:has-text("Checkout")').click();

        await expect(page).toHaveURL(/.*checkout/);
    });

    test("should be able to add to bag", async ({ page }) => {
        await page.locator('button:has-text("Add to bag")').click();

        expect(await page.locator('span[data-testid="cart-count"]').textContent()).toBe("1");
    });
});
