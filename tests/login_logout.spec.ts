import { expect, test } from "@playwright/test";

const username = "susu";
const password = "123";

test("logout", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/softforum/i);

  await page.getByRole("navigation").getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/login to continue/i)).toBeVisible();

  await page.getByLabel(/username/i).fill(username);

  await page.getByLabel(/password/i).fill(password);

  await page.getByRole("button", { name: /login/i }).click();

  await expect(page.getByRole("banner").getByRole("button", { name: username })).toBeVisible();

  await page.getByRole("navigation").getByRole("button", { name: /logout/i }).click();

  await expect(page.getByText(/login to continue/i)).toBeVisible();

  await page.getByRole("button", { name: /return/i }).click();

  await expect(page.getByRole("navigation").getByRole("button", { name: /register/i })).toBeVisible();
});