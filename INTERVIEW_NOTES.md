# Interview Notes

This document is a quick revision guide for discussing the project.

## 1. What is software testing?
**Definition:** Software testing checks whether software behaves as expected and helps find defects before users do.

**In this project:** The same e-commerce behavior is tested at unit, integration, and E2E levels.

**Example:** `expect(calculateLineTotal(10, 2)).toBe(20)`

**Interview question:** Why do we test software?
**Short answer:** To find defects early, verify requirements, reduce risk, and give confidence that changes did not break existing behavior.

## 2. Unit testing
**Definition:** Testing one small unit of logic in isolation.

**In this project:** `tests/unit/validation.test.ts` and `pricing.test.ts`.

**Example:** `expect(calculateTax(100, 0.08)).toBe(8)`

**Question:** What makes a good unit test?
**Answer:** It is fast, deterministic, isolated, focused, and has a clear expected result.

## 3. Integration testing
**Definition:** Testing how two or more components work together.

**In this project:** `CheckoutService` works with a stubbed `OrderGateway`; `ExternalUserService` works with a mocked client.

**Example:** `await expect(service.getActiveUser("standard_user")).resolves.toEqual(...)`

**Question:** Unit vs integration?
**Answer:** A unit test isolates one component; an integration test verifies interaction between components.

## 4. E2E testing
**Definition:** Testing a complete user journey through the application.

**In this project:** Playwright tests SauceDemo login, products, cart, checkout, and logout.

**Example:** `await expect(productsPage.title).toBeVisible()`

**Question:** Why not use only E2E tests?
**Answer:** E2E tests are slower and more fragile. Unit and integration tests give faster, more focused feedback.

## 5. Assertions
**Definition:** Statements that verify an actual result matches an expected result.

**In this project:** Playwright and Vitest `expect` assertions are used throughout.

**Example:** `expect(result).toBe(20)`

**Question:** What makes an assertion useful?
**Answer:** It should clearly express the behavior being verified and fail with useful information.

## 6. Mocking
**Definition:** Replacing a real dependency with controlled test behavior.

**In this project:** `MockExternalUserClient` provides success or failure responses without a real external API.

**Example:** `new MockExternalUserClient(undefined, new Error("Service unavailable"))`

**Question:** Why mock external services?
**Answer:** To make tests deterministic, fast, independent of network availability, and safe from real side effects.

## 7. Stubbing
**Definition:** Providing predetermined behavior for a dependency.

**In this project:** `StubOrderGateway` returns a predictable order ID and records calls.

**Example:** `new StubOrderGateway({ orderId: "ORDER-123" })`

**Question:** Mock vs stub?
**Answer:** The terms overlap in practice. A stub primarily supplies controlled behavior; a mock often also verifies interactions.

## 8. Test isolation
**Definition:** Each test should work independently and should not rely on another test's state.

**In this project:** E2E tests log in in their own setup and unit/integration tests construct their own inputs and dependencies.

**Question:** Why is isolation important?
**Answer:** It prevents order-dependent failures and makes tests easier to debug and parallelize.

## 9. Page Object Model
**Definition:** A pattern that stores page selectors and user actions in reusable classes.

**In this project:** `LoginPage`, `ProductsPage`, `CartPage`, and `CheckoutPage`.

**Example:** `await productsPage.addProduct("Sauce Labs Backpack")`

**Question:** Why use POM?
**Answer:** It reduces duplicated selectors and keeps tests focused on user behavior.

## 10. Fixtures
**Definition:** Reusable test setup or objects supplied to tests.

**In this project:** `fixtures/test-fixtures.ts` creates page objects for each test.

**Example:** `test("...", async ({ loginPage }) => { ... })`

**Question:** Why fixtures?
**Answer:** They centralize setup and make tests cleaner and consistent.

## 11. Positive testing
**Definition:** Checking expected valid behavior.

**In this project:** Successful login and successful checkout.

**Example:** Valid SauceDemo credentials lead to the products page.

**Question:** Why is positive testing insufficient?
**Answer:** Real users provide invalid and unexpected input, so negative and edge cases are essential.

## 12. Negative testing
**Definition:** Checking that invalid behavior is handled safely and correctly.

**In this project:** Invalid credentials, empty login fields, and missing checkout information.

**Example:** Invalid login produces a visible error.

**Question:** What should a negative test verify?
**Answer:** The application rejects bad input predictably and gives the expected error or safe behavior.

## 13. Edge cases
**Definition:** Inputs at or near boundaries or unusual conditions.

**In this project:** Zero quantities, zero prices, minimum username/password lengths, empty values, and dependency failures.

**Example:** `calculateLineTotal(10, 0)` returns `0`.

**Question:** Why test boundaries?
**Answer:** Bugs frequently occur around limits and assumptions.

## 14. API testing
**Definition:** Testing an application's HTTP/API contract directly rather than through the UI.

**In this project:** The service layer is designed to make external dependencies testable, although the portfolio's live E2E target is SauceDemo's UI.

**Question:** What would you add for API testing?
**Answer:** API requests, status-code assertions, schema/body assertions, authentication cases, and negative cases.

## 15. Playwright
**Definition:** A browser automation and end-to-end testing framework.

**In this project:** It drives Chromium against SauceDemo.

**Example:** `await page.goto("/")`

**Question:** Why Playwright?
**Answer:** It provides reliable browser automation, auto-waiting, locators, assertions, tracing, screenshots, and strong TypeScript support.

## 16. Vitest
**Definition:** A fast JavaScript/TypeScript test runner.

**In this project:** Unit and integration tests.

**Example:** `describe`, `it`, and `expect`.

**Question:** Why Vitest here?
**Answer:** It is fast, TypeScript-friendly, and provides a simple API for isolated logic tests.

## 17. TypeScript
**Definition:** JavaScript with static type checking.

**In this project:** Interfaces, service contracts, page objects, and utilities use TypeScript.

**Example:** `interface Product { id: string; name: string; price: number }`

**Question:** How does TypeScript help testing?
**Answer:** It catches many incorrect assumptions during development and makes test data and service contracts easier to understand.

## 18. async/await
**Definition:** Syntax for working with promises in readable sequential code.

**In this project:** Browser actions and service calls are asynchronous.

**Example:** `await productsPage.openCart()`

**Question:** Why do Playwright tests use await?
**Answer:** Browser operations return promises, and awaiting them ensures the operation completes before the next step.

## 19. Selectors and locators
**Definition:** Locators identify elements on a page.

**In this project:** Role, placeholder, text, and stable CSS/data-test selectors are used.

**Example:** `page.getByRole("button", { name: "Login" })`

**Question:** What makes a locator reliable?
**Answer:** Prefer user-facing roles/labels and stable attributes over brittle CSS chains or XPath.

## 20. Retries
**Definition:** Re-running a failed test, normally to reduce the effect of transient infrastructure issues.

**In this project:** CI gets two retries; local runs use zero retries.

**Question:** Are retries a fix for flaky tests?
**Answer:** No. They can help diagnose transient failures, but the underlying flaky behavior should still be investigated.

## 21. Traces
**Definition:** A Playwright recording containing useful debugging information about a test run.

**In this project:** Traces are retained on failure.

**Question:** Why are traces useful?
**Answer:** They help inspect actions, DOM state, network activity, and timing around a failure.

## 22. Screenshots
**Definition:** An image captured at a test failure.

**In this project:** Playwright captures screenshots only when a test fails.

**Question:** Why capture only on failure?
**Answer:** It provides debugging evidence without filling the repository with unnecessary artifacts.

## 23. Flaky tests
**Definition:** Tests that pass and fail without a relevant code change.

**In this project:** The suite avoids arbitrary sleeps and uses Playwright's auto-waiting and reliable locators.

**Question:** How would you reduce flakiness?
**Answer:** Remove timing assumptions, wait for meaningful conditions, use stable locators, isolate data, control external dependencies, and investigate root causes.
