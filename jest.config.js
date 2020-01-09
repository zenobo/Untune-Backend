module.exports = {
  verbose: true,
  roots: ['<rootDir>'],
  testMatch: ['<rootDir>/services/*/*.test.js'],
  moduleNameMapper: {},
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/public/']
};
