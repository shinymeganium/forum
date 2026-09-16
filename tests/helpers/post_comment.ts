import { expect, Page } from "@playwright/test";
import { createThread } from "./create_thread";

export const postComment = async (
  page: Page,
  title: string,
  content: string,
  comment: string,
  errorMsg: string = ""
) => {
  await createThread(page, title, content);

  await expect(page.getByPlaceholder(/write a comment/i)).toBeVisible();
  
  await page.getByPlaceholder(/write a comment/i).fill(comment);

  await page.getByRole("button", { name: /send comment/i }).click();

  if (!comment) {
    await expect(page.getByText(errorMsg)).toBeVisible();
    return;
  }
  
  await expect(page.getByText(comment)).toBeVisible();
};