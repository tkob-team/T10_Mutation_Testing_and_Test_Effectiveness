module.exports = {
  "rootDir": __dirname,
  "projects": [
    {
      "rootDir": __dirname,
      "displayName": "cart-coupons",
      "testEnvironment": "node",
      "testMatch": [
        "<rootDir>/test/defects/cart-orders.defects.js",
        "<rootDir>/test/defects/coupons.defects.js"
      ],
      "setupFiles": [
        "<rootDir>/test/helpers/isolate.js"
      ],
      "setupFilesAfterEnv": [
        "<rootDir>/test/cleanup.cjs"
      ],
      "modulePathIgnorePatterns": [
        "<rootDir>/stryker-tmp/"
      ]
    },
    {
      "rootDir": __dirname,
      "displayName": "auth",
      "testEnvironment": "node",
      "testMatch": [
        "<rootDir>/test/auth.defects.test.js"
      ],
      "setupFilesAfterEnv": [
        "<rootDir>/test/cleanup.cjs"
      ],
      "modulePathIgnorePatterns": [
        "<rootDir>/stryker-tmp/"
      ]
    }
  ]
};
