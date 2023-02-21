const global = require('@testing-library/jest-dom');
const { ConsoleReporter } = require('jasmine');
const fs = require('fs');
const data = fs.readFileSync('html/popup.html', {encoding: 'utf8', flag: 'r'});
import React from 'react';
import { render, screen } from '@testing-library/react';
import Popup from 'html/popup.html';
//import { makeElement } from './popup';
test('webpage contents is same as html', () => {
  expect(document.documentElement.innerHTML).toBeTruthy();
  expect(data.toString()).toBeTruthy();
  expect(document.documentElement.innerHTML == data.toString());
});
  // Test that the Chrome extension loads successfully.
// test('Chrome extension loads successfully', () => {
//   expect(startExtension()).toBe(true);
// });

// Test that the toggle switch for the dark mode functionality appears on the webpage.
describe('Popup', () => {
  test('Toggle switch for dark mode appears', () => {
    render(<Popup />);
    const sliderElement = screen.getByLabelText('slider');
    expect(sliderElement).toBeVisible();
  });
});

// Test that the default mode is light mode.
test('Default mode is light mode', () => {
  expect(document.documentElement.classList.contains('dark_mode')).toBe(false);
});

// Test that the toggle switch for the dark mode functionality is set to off by default.
test('Dark mode toggle is off by default', () => {
  expect(document.documentElement.classList.contains('#dark_mode > #on').checked).toBe(false);
});


test('Dark mode HTML and CSS files loaded correctly', () => {
  expect(document.querySelector('#dark-mode-stylesheet')).not.toBeNull();
});

// Test that the JavaScript code for the dark mode functionality is loaded correctly.
test('Dark mode JavaScript code loaded correctly', () => {
  expect(typeof toggleDarkMode).toBe('function');
});

// Test that the toggle switch for the dark mode functionality changes to on when clicked.
test('Dark mode toggle changes to on when clicked', () => {
  const toggle = document.querySelector('#dark_mode > #on');
  expect(toggle.checked).toBe(true);
});

// Test that the toggle switch for the dark mode functionality changes to off when clicked again.
test('Dark mode toggle changes to off when clicked again', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(toggle.checked).toBe(false);
});

