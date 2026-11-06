module.exports = {
  "projects": [
    {
      "rootDir": "<rootDir>",
      "displayName": "cart-coupons",
      "testEnvironment": "node",
      "setupFiles": [
        "<rootDir>/test/helpers/isolate.js"
      ],
      "testMatch": [
        "<rootDir>/test/cart-orders.test.js",
        "<rootDir>/test/coupons.test.js",
        "<rootDir>/test/coupons-flow.test.js",
        "<rootDir>/test/manual/cart-orders.manual.js",
        "<rootDir>/test/manual/coupons.manual.js"
      ],
      "modulePathIgnorePatterns": [
        "<rootDir>/stryker-tmp/"
      ]
    },
    {
      "rootDir": "<rootDir>",
      "displayName": "auth",
      "testEnvironment": "node",
      "testMatch": [
        "<rootDir>/test/auth.spec.test.js",
        "<rootDir>/test/auth.manual.test.js"
      ],
      "setupFilesAfterEnv": [
        "<rootDir>/test/auth-cleanup.cjs"
      ],
      "modulePathIgnorePatterns": [
        "<rootDir>/stryker-tmp/"
      ]
    }
  ]
};
