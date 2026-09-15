import { expect, test } from "@playwright/test";

const username =  "susu";
const password = "123";
const title = `Test thread ${Date.now()}`;
const content = "Test created by Playwright.";
const editedContent = "This thread was edited by Playwright.";

test.skip("edit thread", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page).toHaveTitle(/softforum/i);

  await page.getByRole("navigation").getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/login to continue/i)).toBeVisible();

  await page.getByLabel(/username/i).fill(username);

  await page.getByLabel(/password/i).fill(password);

  await page.getByRole("button", { name: /login/i }).click();

  await expect(page.getByRole("banner").getByRole("button", { name: username })).toBeVisible();

  await page.getByRole("link", { name: /create a thread/i }).click();

  await expect(page.getByText(/create a new thread/i)).toBeVisible();

  await page.getByPlaceholder(/thread title/i).fill(title);

  await page.getByPlaceholder(/write your post/i).fill(content);

  await page.getByRole("button", { name: /post/i }).click();

  await expect(page.getByText(title)).toBeVisible();

  await page.getByRole("button", { name: /edit/i }).click();

  await expect(page.getByRole("button", { name: /save/i })).toBeVisible();

  await page.getByRole("textbox", { name: /write your post/i }).fill(editedContent);

  await page.getByRole("button", { name: /save/i }).click();

  await expect(page.getByText(editedContent)).toBeVisible();
});