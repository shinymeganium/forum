import { test } from "@playwright/test";
import { postComment } from "./helpers/post_comment";

const title = `Test thread ${Date.now()}`;
const content = "This is a test thread created by Playwright";
const comment = `Test comment ${Date.now()}`;

test("post a comment", async ({ page }) => {
  await postComment(page, title, content, comment);
});