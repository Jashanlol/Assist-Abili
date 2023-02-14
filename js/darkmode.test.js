const { window } = require('@testing-library/jest-dom');
const getComputedStyle = window.getComputedStyle;


test('Styles are applied correctly', () => {
  // Load the HTML file into an iframe
  const iframe = document.createElement('iframe');
  iframe.src = 'html/popup.html';
  document.body.appendChild(iframe);

  // Get the elements in the iframe
  const slidern1 = iframe.contentDocument.querySelector('.options input:nth-of-type(1).checked ~ .slider .sliderknob');
  const slidern2 = iframe.contentDocument.querySelector('.options input:nth-of-type(2).checked ~ .slider .sliderknob');

  // Check the styles of the n1 element

  expect(getComputedStyle(slidern1).backgroundColor).toBe('rgb(141, 210, 141)');


  // Check the styles of the n2 element
  expect(getComputedStyle(slidern2).backgroundColor).toBe('rgb(114, 114, 114)');
  expect(getComputedStyle(slidern2).transform).toBe('-30px');
});
