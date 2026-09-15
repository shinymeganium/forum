import { expect, test } from "@playwright/test";

const title = `Test thread ${Date.now()}`;
const content = "This is a test thread created by Playwright";

test.skip("delete thread", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/SoftForum/i);

  await page.getByRole("banner").getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Login to continue")).toBeVisible();

  await page.getByLabel(/username/i).fill("susu");

  await page.getByLabel(/password/i).fill("123");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("banner").getByRole("button", { name: /susu/ })).toBeVisible();

  await page.getByRole("navigation").getByRole("link", { name: /create a thread/i }).click();

  await expect(page.getByText(/create a new thread/i)).toBeVisible();

  await page.getByPlaceholder(/thread title/i).fill(title);

  await page.getByPlaceholder(/write your post/i).fill(content);

  await page.getByRole("button", { name: /post/i }).click();

  await expect(page.getByText(content)).toBeVisible();

  await page.getByRole("button", { name: /delete/i }).click();

  await expect(page.getByText(/my threads/i)).toBeVisible();

  await expect(page.getByText(title)).toBeHidden();
});