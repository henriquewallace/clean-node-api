module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  watchPathIgnorePatterns: ['globalConfig']
}
