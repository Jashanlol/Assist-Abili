const global = require('@testing-library/jest-dom');
const { ConsoleReporter } = require('jasmine');
const fs = require('fs');
const data = fs.readFileSync('html/popup.html', {encoding: 'utf8', flag: 'r'});
//import { makeElement } from './popup';
test('webpage contents is same as html', () => {
  expect(document.documentElement.innerHTML).toBeTruthy();
  expect(data.toString()).toBeTruthy();
  expect(document.documentElement.innerHTML == data.toString());
});
  


