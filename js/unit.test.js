// Load the Mocha test adapter
const mocha = require('karma-mocha');

module.exports = function(config) {
  config.set({
    // ... other configuration options ...
    frameworks: ['mocha'],
    plugins: [mocha],
    // ... other configuration options ...
  });
};

var quixote = require("quixote");
var $ = require("jquery");

var frame;

beforeEach(function(done) {
  frame = quixote.createFrame({
    stylesheet: "css/popup.css"
  }, done);
});

afterEach(function() {
  frame.remove();
});

describe("Dark mode toggle", function() {
  it("should switch to dark mode when selected", function() {
    var darkModeToggle = frame.add("<input id='dark-mode-toggle' type='radio' name='mode' value='dark'>");

    darkModeToggle.click();

    var body = frame.body();
    expect(body).to.have.class("dark-mode");
  });

  it("should switch to light mode when deselected", function() {
    var darkModeToggle = frame.add("<input id='dark-mode-toggle' type='radio' name='mode' value='dark'>");

    darkModeToggle.click();
    darkModeToggle.click();

    var body = frame.body();
    expect(body).to.not.have.class("dark-mode");
  });
});



