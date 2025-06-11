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
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.locator('input[name="username"]').fill('juser1337')
      await page.locator('input[name="password"]').fill('password123')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create blog' }).click()
      await page.locator('input[id="title-input"]').fill('Testing Blogs part 2')
      await page.locator('input[id="author-input"]').fill('John Tester')
      await page.locator('input[id="url-input"]').fill('testing.com')
      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByText('Blog "Testing Blogs part 2" submitted successfully!')).toBeVisible()

      const blogs = page.locator('.blog')
      const count = await blogs.count()
      const lastBlog = blogs.nth(count - 1)
      await expect(lastBlog).toContainText('Testing Blogs part 2')
      await expect(lastBlog).toContainText('John Tester')
    })
    describe('Logged in and one blog created', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'Create blog' }).click()
        await page.locator('input[id="title-input"]').fill('Testing blogs part 3')
        await page.locator('input[id="author-input"]').fill('John Tester')
        await page.locator('input[id="url-input"]').fill('testing.com')
        await page.getByRole('button', { name: 'Create' }).click()
      })
      test('a blog can be liked', async ({ page }) => {
        const blog = page.locator('.blog')
        .filter({ hasText: "Testing blogs part 3"})

        blog.getByRole('button', { name: 'Show'}).click()
        blog.getByRole('button', { name: 'Like'}).click()

        await expect(page.getByText('You liked "Testing blogs part 3"')).toBeVisible()
        await expect(page.getByText('Votes: 1')).toBeVisible()
  
      })
    })
  })
})

