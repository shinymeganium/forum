import { test } from "@playwright/test";
import { createThread } from "./helpers/create_thread";

const title = `Test thread ${Date.now()}`;
const content = "This is a test thread created by Playwright";

test("create a new thread", async ({ page }) => {
  await createThread(page, title, content);
});