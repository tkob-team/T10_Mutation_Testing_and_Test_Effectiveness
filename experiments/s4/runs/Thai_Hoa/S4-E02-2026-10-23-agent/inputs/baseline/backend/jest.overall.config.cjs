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
        "<rootDir>/test/coupons-flow.test.js"
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
        "<rootDir>/test/auth.spec.test.js"
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
