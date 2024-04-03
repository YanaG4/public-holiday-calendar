module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/",
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(png|svg)$': '<rootDir>/__mocks__/assetMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'] 
};
