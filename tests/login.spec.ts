import { expect, test } from "@playwright/test";

test.skip("user login", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/SoftForum/i);

  await page.getByRole("banner").getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();

  await page.getByLabel(/username/i).fill("susu");

  await page.getByLabel(/password/i).fill("123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("banner").getByRole("button", { name: /susu/ })).toBeVisible();
});