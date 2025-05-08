import { defineConfig } from '@playwright/test'
require('dotenv').config()

export default defineConfig({
  testDir: './tests',
  timeout: 0, //test timeout
  retries: 0,
  expect:{
    timeout:30000
  },
  reporter : [['html']],
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.saucedemo.com',
  },
})