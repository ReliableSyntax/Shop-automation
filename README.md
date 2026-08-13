# E-commerce Test Automation Framework

A beginner-friendly software testing portfolio project built with **TypeScript, Vitest, Playwright, Node.js, npm, Git, and GitHub**.

The project demonstrates unit testing, integration testing, mocking, stubbing, assertions, test isolation, negative/edge-case testing, and end-to-end browser automation against the public [SauceDemo](https://www.saucedemo.com/) application.

> **Portfolio note:** This project is designed to be easy to explain in a software testing internship interview. The code favors clarity over unnecessary framework complexity.

## Objective

The framework demonstrates how different levels of automated testing fit together:

- **Unit tests** validate small TypeScript utilities.
- **Integration tests** verify service/dependency interactions using controlled test doubles.
- **E2E tests** validate realistic user journeys in SauceDemo.
- **Page Objects** keep browser selectors and actions reusable.
- **Fixtures** provide clean test setup.
- **Negative and edge cases** verify behavior when inputs are missing, invalid, or at boundaries.

## Tech stack

| Technology | Purpose |
| --- | --- |
| TypeScript | Application and test code |
| Node.js | JavaScript runtime |
| npm | Dependency and script management |
| Vitest | Unit and integration testing |
| Playwright | Browser E2E testing |
| Git | Version control |
| GitHub | Portfolio repository |

## Project structure

```text
ecommerce-test-automation/
├── fixtures/
│   └── test-fixtures.ts
├── mocks/
│   ├── external-user.mock.ts
│   └── order-gateway.mock.ts
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── LoginPage.ts
│   └── ProductsPage.ts
├── src/
│   ├── services/
│   │   ├── checkout.service.ts
│   │   └── external-user.service.ts
│   ├── types/
│   │   ├── product.ts
│   │   └── user.ts
│   └── utils/
│       ├── pricing.ts
│       └── validation.ts
├── test-data/
│   ├── checkout.ts
│   ├── products.ts
│   └── users.ts
├── tests/
│   ├── e2e/
│   │   └── saucedemo.spec.ts
│   ├── integration/
│   │   ├── checkout.service.test.ts
│   │   └── external-user.service.test.ts
│   └── unit/
│       ├── pricing.test.ts
│       └── validation.test.ts
├── .gitignore
├── INTERVIEW_NOTES.md
├── README.md
├── TEST_CASES.md
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── vitest.config.ts
```

## Testing strategy

### Unit testing

Unit tests isolate small pieces of logic. The pricing and validation utilities are deterministic and have no network/browser dependencies.

Examples:

- valid input
- invalid input
- empty input
- boundary values
- unexpected values
- expected errors

### Integration testing

Integration tests verify interactions between services and their dependencies. External dependencies are replaced by mocks/stubs so tests stay deterministic.

Examples:

- successful dependency response
- dependency failure
- inactive user response
- successful order gateway interaction
- invalid checkout input
- invalid total
- dependency error propagation

### End-to-end testing

Playwright tests SauceDemo as a user would:

1. Login
2. Products
3. Cart
4. Checkout
5. Logout

The suite covers positive, negative, and edge-case scenarios.

## Assertions

Assertions make the expected behavior explicit.

Vitest example:

```ts
expect(calculateLineTotal(10, 3)).toBe(30);
```

Playwright example:

```ts
await expect(productsPage.title).toBeVisible();
await expect(productsPage.inventoryItems).toHaveCount(6);
```

## Mocking and stubbing

The service layer uses simple test doubles:

- `MockExternalUserClient` controls an external user response or failure.
- `StubOrderGateway` returns a predictable order and records calls.

This avoids relying on a real external service during unit/integration tests.

## Test isolation

Each test creates or receives the state it needs. E2E tests perform their own login setup, while service tests create their own dependencies and data.

This means tests should not depend on execution order.

## Page Object Model

The POM classes are:

- `LoginPage`
- `ProductsPage`
- `CartPage`
- `CheckoutPage`

Instead of duplicating selectors throughout every test, tests call readable actions such as:

```ts
await productsPage.addProduct("Sauce Labs Backpack");
await productsPage.openCart();
await cartPage.checkout();
```

This makes tests easier to read and reduces maintenance when selectors change.

## Negative testing

Negative tests are intentionally included because a useful automation portfolio should demonstrate more than the happy path.

Examples:

- invalid login
- empty login
- locked-out user
- missing checkout data
- negative price
- fractional quantity
- dependency failure
- inactive external user

## Reporting and failure debugging

Playwright is configured with:

- HTML reporting
- screenshots on failure
- traces retained on failure
- CI retries
- useful list output

Open the latest report with:

```bash
npm run test:report
```

The report is generated in `playwright-report/`, which is ignored by Git.

## Installation

Requirements:

- Node.js 18+ recommended
- npm
- Git

Clone the repository and install dependencies:

```bash
git clone https://github.com/ReliableSyntax/Shop-automation.git
cd Shop-automation
npm install
npx playwright install chromium
```

## Run all tests

```bash
npm test
```

This runs unit, integration, and E2E tests in sequence.

## Run individual suites

Unit:

```bash
npm run test:unit
```

Integration:

```bash
npm run test:integration
```

E2E:

```bash
npm run test:e2e
```

Headed E2E:

```bash
npm run test:headed
```

Open Playwright report:

```bash
npm run test:report
```

## Example scenarios

- A valid SauceDemo user reaches the products page.
- An invalid password produces a login error.
- An empty login form is rejected.
- A product can be added to the cart.
- A product can be removed.
- Checkout requires first name, last name, and postal code.
- A valid checkout completes successfully.
- Logout returns the user to the login page.

See [TEST_CASES.md](./TEST_CASES.md) for the full test-case inventory.

## What I learned

This project is intended to demonstrate practical understanding of:

- writing readable automated tests
- choosing the right testing level
- assertions
- test doubles
- isolation
- browser automation
- Page Object Model
- fixtures
- negative testing
- boundary testing
- debugging failed E2E tests
- Git/GitHub workflow

## Future improvements

Possible next steps:

1. Add API tests against a dedicated test API.
2. Add GitHub Actions CI.
3. Add cross-browser Playwright projects.
4. Add test tags and selective execution.
5. Add schema validation for API responses.
6. Add accessibility checks.
7. Publish the HTML report as a CI artifact.
8. Add environment-based configuration for different test targets.

## Important portfolio limitations

This is a portfolio automation framework, not a production test platform. SauceDemo is a public practice application, so external availability can affect E2E results.

Do not claim that this project tests a private production e-commerce system, performs load testing, or provides full API coverage. Be accurate about what is actually implemented.

For interview preparation, see [INTERVIEW_NOTES.md](./INTERVIEW_NOTES.md).
