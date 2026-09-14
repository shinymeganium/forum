import { expect, test } from "@playwright/test";

test.skip("homepage opens", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/SoftForum/i);
});
