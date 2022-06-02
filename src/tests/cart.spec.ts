import { expect, test } from "@playwright/test";

test.describe("Cart", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/products/1");
    });

    test("should be view cart", async ({ page }) => {
        await page.locator('button:has-text("items in cart")').click();

        expect(await page.textContent('div[role="dialog"]')).toContain("Shopping cart");
    });

    test("should be able to add product", async ({ page }) => {
        await page.locator('button:has-text("Add to bag")').click();

        expect(await page.locator('span[data-testid="cart-count"]').textContent()).toBe("1");
    });

    test("should be able to checkout", async ({ page }) => {
        await page.locator('button:has-text("Add to bag")').click();

        expect(await page.locator('span[data-testid="cart-count"]').textContent()).toBe("1");

        await page.locator('button:has-text("items in cart")').click();

        await page.locator('div[role="dialog"]').locator('button:has-text("Checkout")').click();

        await expect(page).toHaveURL(/.*checkout/);
    });
});
