# E-Commerce E2E Automation Framework

[![E2E Tests with Playwright & Allure](https://github.com/imfDana/ecommerce-framework/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/imfDana/ecommerce-framework/actions/workflows/e2e-tests.yml)

Comprehensive End-to-End testing framework for [Automation Exercise](https://automationexercise.com/), covering UI and API test cases using **Playwright, TypeScript, Faker.js, and Allure Reports** within a CI/CD pipeline.

---

## Table of Contents

- [Overview](#overview)
- [Test Plan](#-test-plan)
- [Test Strategy](#-test-strategy)
- [Site Architecture](#-site-architecture)
- [Test Coverage](#-test-coverage)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [CI/CD Integration](#-cicd-integration)

---

## Overview

This project validates the functionality of automationexercise.com — a multi-page e-commerce application — through automated UI and API tests. The framework follows the **Page Object Model (POM)** pattern, uses **dynamic test data generation** with Faker.js, and integrates **Allure Reports** for test execution visibility.

---

## 🎯 Test Plan

### Scope

- **Target Application:** automationexercise.com (E-commerce MPA)
- **Test Types:** UI (End-to-End) and API (Backend Validation)
- **Total Test Cases Automated:** 40 (26 UI + 14 API)

### Test Items

| Category  | Count | Description                                           |
| --------- | ----- | ----------------------------------------------------- |
| UI Tests  | 26    | Manual test cases from the site's official test suite |
| API Tests | 14    | REST API endpoints from `/api_list`                   |

**UI Test Cases Covered:**

- User registration and login flows
- Negative testing (incorrect credentials, existing email)
- Cart operations (add, remove, quantity)
- Checkout and order placement
- Product search and filtering
- Category and brand navigation
- Contact form submission
- Subscription flows
- Scroll functionality

**API Test Cases Covered:**

- Product and brand listing (GET/POST/PUT)
- User account CRUD operations (POST/DELETE/PUT)
- Login verification endpoints
- Search functionality

### Entry Criteria

- All required dependencies are installed (`npm install`)
- Playwright browsers are available (`npx playwright install`)
- Application under test is accessible and running
- CI environment variables are configured (when applicable)

### Exit Criteria

- All automated test cases pass successfully
- No critical or high-severity defects open
- Allure report generated with zero missing attachments
- CI pipeline completes without errors

### Test Environment

| Component  | Details                          |
| ---------- | -------------------------------- |
| Browser    | Google Chrome (Desktop)          |
| Viewport   | 1280 x 720                       |
| Base URL   | `https://automationexercise.com` |
| OS Support | Windows, macOS, Linux            |

---

## 📊 Test Strategy

### Testing Levels

| Level    | Focus              | Approach                                               |
| -------- | ------------------ | ------------------------------------------------------ |
| UI (E2E) | User workflows     | Playwright with POM — simulates real user interactions |
| API      | Backend validation | Direct HTTP requests via `request` fixture             |

### Testing Types

- **Functional Testing:** Validates user workflows (register, login, checkout)
- **Negative Testing:** Validates error handling (incorrect credentials, duplicate email)
- **Data-Driven Testing:** Uses Faker.js for unique, non-colliding test data per run
- **Hybrid Testing:** API for fast setup/teardown + UI for user-facing validation

### Test Data Strategy

- **Generation:** Faker.js (`data/dataGenerator.ts`) produces unique user data on every run
- **Setup:** API calls create pre-conditions (e.g., registered users) without UI overhead
- **Cleanup:** All created data is deleted after each test via API or UI deletion flow
- **No Hardcoded Data:** Email addresses, passwords, and addresses are never static

### Locators Strategy

Locator priority (highest to lowest):

| Priority | Strategy                                        | Example                                      |
| -------- | ----------------------------------------------- | -------------------------------------------- |
| 1        | `data-qa` attributes via `getByTestId()`        | `page.getByTestId('login-email')`            |
| 2        | Semantic roles via `getByRole()`                | `page.getByRole('heading', { name: '...' })` |
| 3        | Text filtering via `filter({ hasText: '...' })` | Nav items, product lists                     |
| 4        | CSS selectors via `locator()`                   | Last resort                                  |

> **Note:** The application provides `data-qa` attributes for most interactive elements. These are preferred because they are stable and not tied to visual or structural changes.

### Ad Blocking Strategy

- Global Playwright fixture (`fixtures/base.ts`) blocks Google Ad domains at the network level
- Prevents flaky tests caused by Vignette ads and floating iframes
- Eliminates the need for `force: true` clicks or manual URL bypasses

### Reporting Strategy

| Report       | Tool                | Purpose                                          |
| ------------ | ------------------- | ------------------------------------------------ |
| HTML         | Playwright built-in | Quick local debugging                            |
| Allure       | `allure-playwright` | Detailed CI/CD reporting with history and trends |
| GitHub Pages | GitHub Actions      | Public access to the latest report               |

---

## 🌐 Site Architecture

### Pages & Routes

| Route                    | Page              | Test Coverage                |
| ------------------------ | ----------------- | ---------------------------- |
| `/`                      | Home              | TC7, TC10, TC25, TC26        |
| `/login`                 | Login / Signup    | TC2, TC3, TC4, TC5           |
| `/products`              | Products List     | TC8, TC9, TC19, TC21         |
| `/product_details/:id`   | Product Detail    | TC8, TC21                    |
| `/view_cart`             | Cart              | TC12, TC13, TC17, TC20, TC22 |
| `/checkout`              | Checkout          | TC14, TC15, TC16, TC23       |
| `/contact_us`            | Contact Us        | TC6                          |
| `/test_cases`            | Test Cases        | TC7                          |
| `/category_products/:id` | Category Products | TC18                         |
| `/brand_products/:brand` | Brand Products    | TC19                         |

### API Endpoints

| #   | Method | Endpoint                    | Response Code            |
| --- | ------ | --------------------------- | ------------------------ |
| 1   | GET    | `/productsList`             | 200                      |
| 2   | POST   | `/productsList`             | 405 (Method Not Allowed) |
| 3   | GET    | `/brandsList`               | 200                      |
| 4   | PUT    | `/brandsList`               | 405 (Method Not Allowed) |
| 5   | POST   | `/searchProduct`            | 200                      |
| 6   | POST   | `/searchProduct` (no param) | 400 (Bad Request)        |
| 7   | POST   | `/verifyLogin` (valid)      | 200                      |
| 8   | POST   | `/verifyLogin` (no email)   | 400 (Bad Request)        |
| 9   | DELETE | `/verifyLogin`              | 405 (Method Not Allowed) |
| 10  | POST   | `/verifyLogin` (invalid)    | 404 (User Not Found)     |
| 11  | POST   | `/createAccount`            | 201 (Created)            |
| 12  | DELETE | `/deleteAccount`            | 200                      |
| 13  | PUT    | `/updateAccount`            | 200                      |
| 14  | GET    | `/getUserDetailByEmail`     | 200                      |

> **API Response Pattern:** All endpoints return HTTP 200 with a JSON body containing `responseCode` (e.g., `201`, `400`, `404`) and a `message` field.

### Known Issues & Quirks

| Issue                            | Impact                                         | Workaround                                  |
| -------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Google Vignette Ads              | Intercept pointer events, cause click timeouts | Global ad-blocking fixture                  |
| Floating Ad Iframes (`aswift_*`) | Block interaction with overlay elements        | Global ad-blocking fixture                  |
| Duplicate Header Links           | `a[href="/login"]` matches 2 elements          | Scoped to `header` locator                  |
| Brand URLs with `&`              | `/brand_products/H&M` contains literal `&`     | Regex URL assertions                        |
| API Always Returns 200           | `responseCode` is embedded in JSON body        | Assert `body.responseCode`, not HTTP status |

---

## 📈 Test Coverage

| Category      | Automated | Total Available | Coverage |
| ------------- | --------- | --------------- | -------- |
| UI Test Cases | 26        | 26              | **100%** |
| API Endpoints | 14        | 14              | **100%** |

> All manual test cases listed at `automationexercise.com/test_cases` are fully automated.

---

## 🏗 Architecture

```
e2e-ecommerce/
├── pages/                 # Page Object Model
│   ├── basePage.ts        # Shared locators and helpers
│   ├── homePage.ts
│   ├── loginPage.ts
│   ├── signupPage.ts
│   ├── productsPage.ts
│   ├── cartPage.ts
│   ├── checkoutPage.ts
│   └── contactUsPage.ts
├── tests/
│   ├── ui/               # UI test specifications
│   │   ├── register.spec.ts
│   │   ├── login.spec.ts
│   │   ├── incorrectLogin.spec.ts
│   │   └── ... (15 spec files)
│   ├── api/              # API test specifications
│   │   ├── products.api.spec.ts
│   │   ├── auth.api.spec.ts
│   │   └── account.api.spec.ts
│   └── auth.setup.ts      # Session persistence setup
├── data/
│   └── dataGenerator.ts  # Faker.js test data factory
├── utils/
│   └── apiUtils.ts       # API helper (account CRUD)
├── fixtures/
│   └── base.ts           # Global ad-blocking fixture
├── .github/
│   └── workflows/
│       └── e2e-tests.yml # CI/CD pipeline
└── playwright.config.ts  # Test configuration
```

### Key Design Decisions

| Decision                                 | Rationale                                                     |
| ---------------------------------------- | ------------------------------------------------------------- |
| Separate `LoginPage` and `SignupPage`    | Single Responsibility Principle — each class handles one flow |
| `data-qa` attributes as primary locators | Stable against CSS/styling changes                            |
| API for setup/teardown                   | Faster execution, reduced UI flakiness                        |
| Global ad-blocking fixture               | Single source of truth for ad handling                        |

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npx playwright install --with-deps
```

### 3. Run Tests

**UI Tests Only:**

```bash
npx playwright test --project=ui
```

**API Tests Only:**

```bash
npx playwright test --project=api
```

**All Tests:**

```bash
npm run test
```

**Interactive Mode (with Playwright UI):**

```bash
npx playwright test --ui
```

### 4. View Allure Report

```bash
npm run report
```

---

## 🌐 CI/CD Integration

GitHub Actions pipeline (`e2e-tests.yml`) runs on every push to `main`:

1. **Setup** — Node.js environment, dependency installation
2. **Test Execution** — Full Playwright suite (UI + API)
3. **Report Generation** — Allure HTML report from test results
4. **Deployment** — Report published to GitHub Pages (`gh-pages` branch)

**Public Allure Report:** Available at `https://[username].github.io/e2e-ecommerce/`

---

## License

MIT
