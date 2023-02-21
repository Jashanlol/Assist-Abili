module.exports = {
    testEnvironment: 'jsdom',
    testTimeout: 5000,
    //setupFilesAfterEnv: ['./test-setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    verbose:true,
    preset:[
      "@babel/plugin-syntax-jsx",
      "@babel/preset-react"
    ]
  };

