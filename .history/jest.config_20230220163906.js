module.exports = {
    testEnvironment: 'jsdom',
    testTimeout: 5000,
    //setupFilesAfterEnv: ['./test-setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    verbose:true,
    presets:[
      "@babel/plugin-syntax-jsx",
      "@babel/preset-react"
    ]
  };

