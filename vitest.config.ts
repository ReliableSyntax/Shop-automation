import { defineConfig } from "vitest";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    clearMocks: true,
    restoreMocks: true,
    passWithNoTests: false,
    include: ["tests/unit/**/*.test.ts", "tests/integration/**/*.test.ts"],
  },
});
