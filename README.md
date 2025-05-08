# CoverGo Assignment – Playwright Automation Framework

This repository contains an end-to-end UI automation framework built using **Playwright** and **JavaScript**, targeting [SauceDemo](https://www.saucedemo.com/).

---

## 🧰 Tech Stack

- **Playwright** (JavaScript)
- **Node.js**
- **.env** for secure credential handling
- **HTML reporter** for visual test results
- Page Object Model architecture

---

## 📁 Project Structure

COVERGOASSIGNMENT/
│
├── support/
│ ├── pages/ # Page Object Model classes
│ │ ├── loginPage.js
│ │ ├── inventoryPage.js
│ │ └── cartPage.js
│ └── Utils/
│ ├── testData.js # Credential loader from .env
│ └── commonUIHelper.js (if any UI utilities are needed)
│
├── tests/ # Test specs
│ ├── loginPage.spec.js
│ ├── cart.spec.js
│ └── checkout.spec.js
│
├── .env # Secured credentials
├── playwright.config.js # Framework configuration
├── package.json
├── README.md
└── test-results/ # Artifacts and reports


---

## ⚙️ playwright.config.js

```js
import { defineConfig } from '@playwright/test'
require('dotenv').config()

export default defineConfig({
  testDir: './tests',
  timeout: 0, // Global test timeout
  retries: 0,
  expect: {
    timeout: 30000
  },
  reporter: [['html']], // Generates HTML test report
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.saucedemo.com',
  },
})
```

## Installation

git clone https://github.com/ladheshubham15/covergo-playwright-assignment.git
cd covergo-playwright-assignment
npm install

## Execution

``Run all tests in headless mode:``
npx playwright test

``Run a specific test file:``
npx playwright test tests/loginPage.spec.js

``Run tests in headed (UI) mode:``
npx playwright test --headed

``HTML Report``
npx playwright show-report

## Sample Test Case Coverage

```Valid login```
```Invalid login (wrong password)```
```Locked-out user```
```Add item to cart```
```Remove item from cart```
```Verify cart badge count```
```Reset app state```
```Sorting products by price```
```Checkout with incomplete form```
```Successful checkout with valid info```

## Best Practices Followed 
```Reusable page object methods```
```Config-driven environment setup```
```Tests are independent & idempotent```
```Error handling and assertions added```
