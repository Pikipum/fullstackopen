const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'John User',
        username: 'juser1337',
        password: 'password123'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible()
    await expect(page.locator('input[name="username"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })
  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[name="username"]').fill('juser1337')
      await page.locator('input[name="password"]').fill('password123')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Login succesful, logged in as John User.')).toBeVisible()
    })
    test('fails with wrong credentials', async ({ page }) => {
      await page.locator('input[name="username"]').fill('juser1337')
      await page.locator('input[name="password"]').fill('wrongpassword')
      await page.getByRole('button', { name: 'Login' }).click()
      await expect(page.getByText('Wrong username or password.')).toBeVisible()
    })
  })
})