import { expect, test } from "@playwright/test";

test.skip("login wrong password", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/SoftForum/i);

  await page.getByRole("banner").getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login to continue")).toBeVisible();

  await page.getByLabel(/username/i).fill("susu");

  await page.getByLabel(/password/i).fill("1233");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Wrong username or password")).toBeVisible();
});