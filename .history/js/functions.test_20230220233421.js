const global = require('@testing-library/jest-dom');
const { ConsoleReporter } = require('jasmine');
const fs = require('fs');
const data = fs.readFileSync('html/popup.html', {encoding: 'utf8', flag: 'r'});
// import * as React from 'react';
// import { render, screen, act } from '@testing-library/react';
// import Popup from '../html/popup.html'; 
// import { expect } from 'chai';
// import sinon from 'sinon';
// import { startExtension } from 'js/content.js';
//import { makeElement } from './popup';
test('webpage contents is same as html', () => {
  expect(document.documentElement.innerHTML).toBeTruthy();
  expect(data.toString()).toBeTruthy();
  expect(document.documentElement.innerHTML == data.toString());
});

// Test that the Chrome extension loads successfully.
test('Chrome extension loads successfully', () => {
  expect(typeof chrome).toBe('object');
});

// Test that the toggle switch for the dark mode functionality appears on the popup.
test('Toggle switch for dark mode appears', () => {
  expect(document.querySelector('dark_mode')).not.toBeNull();
});

// Test that the default mode is light mode.
test('Default mode is light mode', () => {
  expect(document.documentElement.classList.contains('dark_mode')).toBe(false);
});

// Test that the toggle switch for the dark mode functionality is set to off by default.
test('Dark mode toggle is off by default', () => {
  expect(document.querySelector('#dark-mode-toggle').checked).toBe(false);
});

// Test that the HTML and CSS files for the dark mode functionality are loaded correctly.
test('Dark mode HTML and CSS files loaded correctly', () => {
  expect(document.querySelector('#dark-mode-stylesheet')).not.toBeNull();
});

// Test that the JavaScript code for the dark mode functionality is loaded correctly.
test('Dark mode JavaScript code loaded correctly', () => {
  expect(typeof toggleDarkMode).toBe('function');
});

// Test that the toggle switch for the dark mode functionality changes to on when clicked.
test('Dark mode toggle changes to on when clicked', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(toggle.checked).toBe(true);
});

// Test that the toggle switch for the dark mode functionality changes to off when clicked again.
test('Dark mode toggle changes to off when clicked again', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(toggle.checked).toBe(false);
});

// Test that the body background color changes to black when dark mode is activated.
test('Body background color changes to black in dark mode', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(getComputedStyle(document.body).getPropertyValue('background-color')).toBe('rgb(0, 0, 0)');
});

// Test that the body background color changes back to white when dark mode is deactivated.
test('Body background color changes back to white in light mode', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(getComputedStyle(document.body).getPropertyValue('background-color')).toBe('rgb(255, 255, 255)');
});

// Test that the text color changes to white when dark mode is activated.
test('Text color changes to white in dark mode', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(getComputedStyle(document.body).getPropertyValue('color')).toBe('rgb(255, 255, 255)');
});

// Test that the text color changes back to black when dark mode is deactivated.
test('Text color changes back to black in light mode', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(getComputedStyle(document.body).getPropertyValue('color')).toBe('rgb(0, 0, 0)');
});

// Test that the color of hyperlinks changes to light blue when dark mode is activated.
test('Hyperlink color changes to light blue in dark mode', () => {
  const toggle = document.querySelector('#dark-mode-toggle');
  toggle.click();
  expect(getComputedStyle(document.querySelector('a')).getPropertyValue('color')).toBe('rgb(173, 216, 230)');
});