const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

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

describe('My extension', () => {
  it('should have the expected properties', () => {
    if (window.chrome) {
      assert.isObject(window.chrome.runtime);
      if (window.chrome.runtime) {
        assert.isFunction(window.chrome.runtime.onInstalled);
      }
      assert.isObject(window.chrome.storage);
      assert.isObject(window.chrome.storage.local);
    }
  });
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
