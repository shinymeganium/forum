import { expect, test } from "@playwright/test";

const username = "susu";
const password = "1233";

test("login wrong password", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/softforum/i);

  await page.getByRole("banner").getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/login to continue/i)).toBeVisible();

  await page.getByLabel(/username/i).fill(username);

  await page.getByLabel(/password/i).fill(password);

  await page.getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/wrong username or password/i)).toBeVisible();
});