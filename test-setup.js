// Import the `jsdom-global` package and immediately call it as a function
// to set up a fake `window` object.
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
require('text-encoding').TextEncoder = TextEncoder;
const jsdom = require('jsdom-global')(undefined, {
    url: 'http://localhost'
  });

// Import the `TextEncoder` constructor from the `text-encoding` package.

// Assign the `TextEncoder` constructor to the `TextEncoder` property of the
// global `window` object, which should make it available in your tests.

