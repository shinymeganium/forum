import { expect, test } from "@playwright/test";
import { createThread } from "./helpers/create_thread";

const title = `Test thread ${Date.now()}`;
const content = "Test created by Playwright.";
const editedContent = "This thread was edited by Playwright.";

test("edit thread", async ({ page }) => {
  await createThread(page, title, content);

  const thread = page.locator("div").filter({ hasText: title });
  await thread.getByRole("button", { name: /edit/i }).click();

  await expect(page.getByRole("button", { name: /save/i })).toBeVisible();

  await page.getByRole("textbox", { name: /write your post/i }).fill(title); // to simulate playwright error

  await page.getByRole("button", { name: /save/i }).click();

  await expect(page.getByText(editedContent)).toBeVisible();
});