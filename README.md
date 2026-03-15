# Automation Exercise - E2E Playwright Framework

This project is an End-to-End testing framework for the [Automation Exercise](https://automationexercise.com/) practice website. It leverages **Playwright, TypeScript, Faker.js, and Allure** to execute robust, dynamic tests within a CI/CD environment.

## 🏗 Architecture
* **`pages/`**: Page Object Model (POM) containing UI interactions.
* **`utils/`**: Utilities like `apiUtils.ts` to interact with backend endpoints (e.g., seeding users for faster tests).
* **`data/`**: Test data management, specifically `dataGenerator.ts` using `Faker.js` to ensure clean/random data on every run.
* **`tests/`**: Individual spec files mapped directly to the official Automation Exercise manual test cases.
* **`.github/workflows/`**: GitHub Actions pipeline for continuous integration and Allure Report generation.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install --with-deps
```

### 3. Run the Tests
To run tests headlessly:
```bash
npm run test
```
To run tests with Playwright UI:
```bash
npx playwright test --ui
```

### 4. View the Allure Report
After running the tests, an Allure report can be generated and served locally:
```bash
npm run report
```

## 🌐 CI/CD Integration
This repository contains a GitHub Actions workflow (`e2e-tests.yml`). 
Upon every push to the `main` branch, it will:
1. Setup Node and install dependencies.
2. Run the full Playwright suite.
3. Generate the Allure HTML report.
4. Deploy the report to `gh-pages` so you can view it via a public GitHub Pages link!
