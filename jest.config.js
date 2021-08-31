module.exports = {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  coverageDirectory: "coverage",
  coverageReporters: ["html", "lcov", "text"],
  collectCoverageFrom: ["src/**/*.ts"],
  watchPathIgnorePatterns: ["/node_modules/", "/dist/", "/.git/"],
  moduleFileExtensions: ["ts", "tsx", "js", "json"],
  rootDir: __dirname,
  testMatch: ["<rootDir>/__tests__/**/*.spec.ts"],
  setupFiles: ["<rootDir>/jest.setup.ts"],
}
