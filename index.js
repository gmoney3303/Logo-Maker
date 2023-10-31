const inquirer = require('inquirer');
const SVG = require('svg.js');
const fs = require('fs');

async function getUserInput() {
  const userInput = await inquirer.prompt([
    {
      name: 'text',
      message: 'Enter up to three characters:',
      validate: input => input.length <= 3,
    },
    {
      name: 'textColor',
      message: 'Enter text color (keyword or hex):',
    },
    {
      name: 'shape',
      message: 'Choose a shape (circle, triangle, square):',
      type: 'list',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hex):',
    },
  ]);

  return userInput;
}

function generateSVG(userInput) {
  const width = 300;
  const height = 200;

  const draw = SVG()
    .size(width, height)
    .addTo('#svg-container');

  let shapeElement;

  if (userInput.shape === 'circle') {
    shapeElement = draw.circle(100).center(width / 2, height / 2);
  } else if (userInput.shape === 'triangle') {
    shapeElement = draw.polygon('0,100 50,0 100,100').center(width / 2, height / 2);
  } else if (userInput.shape === 'square') {
    shapeElement = draw.rect(100, 100).center(width / 2, height / 2);
  }

  shapeElement.fill(userInput.shapeColor);

  draw.text(userInput.text)
    .fill(userInput.textColor)
    .center(width / 2, height / 2)
    .font({ size: 20, anchor: 'middle' });

  const svgString = draw.svg();
  fs.writeFileSync('logo.svg', svgString);

  console.log('Generated logo.svg');
}

async function main() {
  const userInput = await getUserInput();
  generateSVG(userInput);
}

main();