module.exports = {
    testEnvironment: 'jsdom',
    testTimeout: 5000,
    //setupFilesAfterEnv: ['./test-setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    verbose:true,
    modulePaths: ["<rootDir>"],
    moduleNameMapper: {
      '\\.html$': 'raw-loader',
    },
  };

