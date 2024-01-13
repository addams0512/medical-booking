import { test, expect } from "@playwright/test";

// TODO: - click Login button
//  - expect Login button toBeVisible
//  - fill email password
//  - click Login button
//  - exprect "Log in succesfully"
//  - expect "Sign out button visible"

const URL_FRONTEND = "http://localhost:5173";

test("Should allow user to login", async ({ page }) => {
  await page.goto(URL_FRONTEND);
  // click button Login
  await page.getByRole("link", { name: "Log in" }).click();

  // expect Login button visible
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  // fill email password
  await page.locator("[name=email]").fill("minh123@gmail.com");
  await page.locator("[name=password]").fill("minh123");

  // click button login
  await page.getByRole("button", { name: "Login" }).click();

  // expect Login succesfully
  await expect(page.getByText("Login successfully")).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});

test("Should allow user to register", async ({ page }) => {
  await page.goto(URL_FRONTEND);

  // click button Signup
  await page.getByRole("link", { name: "Sign up" }).click();

  // expect Sign up button visible
  await expect(page.getByRole("button", { name: "Sign Up" })).toBeVisible();

  //fill field
  await page.locator("[name=username]").fill("minhminh0512");
  await page.locator("[name=email]").fill("minh123@gmail.com");
  await page.locator("[name=password]").fill("minh123");
  await page.locator("[name=confirmPassword]").fill("minh123");

  // click Sign Up button
  await page.getByRole("button", { name: "Sign Up" }).click();

  // expect Sign up succesfully
  await expect(page.getByText("Registration Success!")).toBeVisible();

  // expect navigate to login form
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});
