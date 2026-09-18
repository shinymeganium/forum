import { expect, test } from "@playwright/test";
import { createThread } from "./helpers/create_thread";

const title = `Test thread ${Date.now()}`;
const content = "This is a test thread created by Playwright";

test("delete thread", async ({ page }) => {
  await createThread(page, title, content);

  const thread = page.locator("div").filter({ hasText: title });
  await thread.getByRole("button", { name: /delete/i }).click();

  await expect(page.getByText(/my threads/i)).toBeVisible();

  await expect(page.getByText(title)).toBeHidden();
});