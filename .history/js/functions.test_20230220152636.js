const global = require('@testing-library/jest-dom');
const { ConsoleReporter } = require('jasmine');
const fs = require('fs');
const { startExtension } = require('./content');
const data = fs.readFileSync('html/popup.html', {encoding: 'utf8', flag: 'r'});
//const extension = require('content.js');
//import { makeElement } from './popup';
test('webpage contents is same as html', () => {
  expect(document.documentElement.innerHTML).toBeTruthy();
  expect(data.toString()).toBeTruthy();
  expect(document.documentElement.innerHTML == data.toString());
});
  // Test that the Chrome extension loads successfully.
test('Chrome extension loads successfully', () => {
  expect(startExtension()).toBe(true);
});

// Test that the toggle switch for the dark mode functionality appears on the webpage.
test('Toggle switch for dark mode appears', () => {
  expect(document.querySelector('dark_mode')).not.toBeNull();
});

// Test that the default mode is light mode.
test('Default mode is light mode', () => {
  expect(document.documentElement.classList.contains('dark_mode')).toBe(false);
});

// Test that the toggle switch for the dark mode functionality is set to off by default.
test('Dark mode toggle is off by default', () => {
  expect(document.querySelector('dark_mode').checked).toBe(false);
});


