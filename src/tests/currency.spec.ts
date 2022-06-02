import { expect, test } from "@playwright/test";

test.describe("Currency", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should be able to change currency", async ({ page }) => {
        const sgPrice = await page.locator('p:has-text("$")').first().textContent();

        expect(sgPrice?.at(0)).toBe("$");

        await page.locator('button:has-text("SGD")').click();

        await page.locator('li[role="option"]:has-text("MYR")').click();

        const myPrice = await page.locator('p:has-text("RM")').first().textContent();

        expect(myPrice?.slice(0, 2)).toBe("RM");
    });

    test("should update the currency value", async ({ page }) => {
        const sgPrice = await page.locator('p:has-text("$")').first().textContent();

        expect(sgPrice).toBe("$3,123.00");

        await page.locator('button:has-text("SGD")').click();

        await page.locator('li[role="option"]:has-text("MYR")').click();

        const myPrice = await page.locator('p:has-text("RM")').first().textContent();

        expect(myPrice).toBe("RM 9,681.30");
    });
});
