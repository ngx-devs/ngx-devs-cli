module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@ngxd/cli-test-setup': '<rootDir>/cli-test-setup.ts'
  },
  testPathIgnorePatterns: ['/build/', '/templates/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json'
    }
  }
};
