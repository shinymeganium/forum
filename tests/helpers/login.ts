import { expect, Page } from "@playwright/test";

export const login = async (page: Page) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/softforum/i);

  await page.getByRole("navigation").getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/login to continue/i)).toBeVisible();

  await page.getByLabel(/username/i).fill("test");

  await page.getByLabel(/password/i).fill("123");

  await page.getByRole("button", { name: /login/i }).click();

  await expect(page.getByRole("banner").getByRole("button", { name: /test/i })).toBeVisible();
};