module.exports = {
  setupFiles: ['<rootDir>test/setup.js'],
  modulePaths: ['<rootDir>'],
  modulePathIgnorePatterns: ['<rootDir>/report-templates/'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.css$': '<rootDir>test/__mocks__/styleMock.js',
  },
};
