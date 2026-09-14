import { expect, test } from "@playwright/test";

test("post a comment", async ({ page }) => {
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

  const title = `Test thread ${Date.now()}`;
  await page.getByPlaceholder(/thread title/i).fill(title);

  const content = "This is a test thread created by Playwright";
  await page.getByPlaceholder(/write your post/i).fill(content);

  await page.getByRole("button", { name: /post/i }).click();
  
  await expect(page.getByText(content)).toBeVisible();
  
  await expect(page.getByPlaceholder(/write a comment/i)).toBeVisible();
  
  const comment = `Test comment ${Date.now()}`;
  await page.getByPlaceholder(/write a comment/i).fill(comment);

  await page.getByRole("button", { name: /send comment/i }).click();

  await expect(page.getByText(comment)).toBeVisible();
});