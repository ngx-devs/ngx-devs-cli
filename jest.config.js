module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@ngxd/cli-test-setup': '<rootDir>/cli-test-setup.ts'
  },
  testPathIgnorePatterns: ['/build/', '/templates/'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.spec.json'
    }
  }
};
