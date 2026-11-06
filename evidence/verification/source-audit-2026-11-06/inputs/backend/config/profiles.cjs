const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const conditions = ['baseline', 'manual', 'ai'];
const domains = ['cart-orders', 'coupons', 'auth', 'overall'];
const baselineFiles = {
  'cart-orders': ['test/cart-orders.test.js'],
  coupons: ['test/coupons.test.js', 'test/coupons-flow.test.js'],
  auth: ['test/auth.spec.test.js'],
};
const additions = {
  'cart-orders': { manual: 'test/manual/cart-orders.manual.js', ai: 'test/ai/cart-orders.ai.js' },
  coupons: { manual: 'test/manual/coupons.manual.js', ai: 'test/ai/coupons.ai.js' },
  auth: { manual: 'test/auth.manual.test.js', ai: 'test/auth.ai.test.js' },
};
const scopes = {
  'cart-orders': ['server.js:280-349', 'server.js:510-568'],
  coupons: ['server.js:355-492'],
  auth: ['server.js:20-135'],
};
const counts = {
  'cart-orders': { baseline: 36, manual: 44, ai: 41 },
  coupons: { baseline: 26, manual: 35, ai: 40 },
  auth: { baseline: 26, manual: 39, ai: 37 },
  overall: { baseline: 88, manual: 118, ai: 118 },
};

function assertProfile(domain, condition) {
  if (!domains.includes(domain) || !conditions.includes(condition)) {
    throw new Error(`Unknown profile: ${domain}/${condition}`);
  }
}

function testFiles(domain, condition) {
  assertProfile(domain, condition);
  if (domain === 'overall') return domains.slice(0, 3).flatMap(d => testFiles(d, condition));
  return [...baselineFiles[domain], ...(condition === 'baseline' ? [] : [additions[domain][condition]])];
}

function project(files, auth, mutation) {
  return {
    rootDir,
    displayName: auth ? 'auth' : 'cart-coupons',
    testEnvironment: mutation ? '@stryker-mutator/jest-runner/jest-env/node' : 'node',
    testMatch: files.map(file => `<rootDir>/${file}`),
    ...(auth ? {} : { setupFiles: ['<rootDir>/test/helpers/isolate.js'] }),
    setupFilesAfterEnv: ['<rootDir>/test/cleanup.cjs'],
    modulePathIgnorePatterns: ['<rootDir>/stryker-tmp/'],
  };
}

function jestProfile(domain, condition = 'baseline', mutation = false) {
  assertProfile(domain, condition);
  if (domain === 'overall') {
    return {
      rootDir,
      projects: [
        project([...testFiles('cart-orders', condition), ...testFiles('coupons', condition)], false, mutation),
        project(testFiles('auth', condition), true, mutation),
      ],
    };
  }
  // An explicit empty list prevents a file-based multi-project config from
  // adding another copy of these tests when Stryker merges Jest options.
  return { ...project(testFiles(domain, condition), domain === 'auth', mutation), projects: [] };
}

function strykerProfile(domain, condition = 'baseline') {
  assertProfile(domain, condition);
  const suffix = condition === 'baseline' ? '' : `.${condition}`;
  const report = `${domain}${condition === 'baseline' ? '' : `-${condition}`}`;
  return {
    $schema: './node_modules/@stryker-mutator/core/schema/stryker-schema.json',
    testRunner: 'jest',
    coverageAnalysis: 'perTest',
    mutate: domain === 'overall' ? ['auth', 'cart-orders', 'coupons'].flatMap(d => scopes[d]) : scopes[domain],
    tempDirName: 'stryker-tmp',
    // A serial policy limits native SQLite contention. It is a new experimental
    // condition, not a retroactive correction of historical concurrency=2 runs.
    concurrency: 1,
    timeoutMS: 5000,
    timeoutFactor: 1.5,
    reporters: ['clear-text', 'html', 'json'],
    htmlReporter: { fileName: `reports/${report}/mutation.html` },
    jsonReporter: { fileName: `reports/${report}/mutation.json` },
    jest: {
      configFile: `jest.${domain}${suffix}${domain === 'overall' ? '.mutation' : ''}.config.cjs`,
    },
  };
}

module.exports = { rootDir, domains, conditions, counts, testFiles, jestProfile, strykerProfile };
