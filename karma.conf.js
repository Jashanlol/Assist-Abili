// karma.conf.js
module.exports = function (config) {
  config.set({
    // frameworks to use
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      'js/*.js',
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: {},

    // test results reporter to use
    reporters: ['progress'],

    // start these browsers
    browsers: ['Chrome'],

    // Continuous Integration mode
    singleRun: false,
  });
};
