const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

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
      validate: input => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^(red|blue|green)$/i.test(input),
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
      validate: input => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^(red|blue|green)$/i.test(input),
    },
  ]);

  return userInput;
}

function generateSVG(userInput) {
  const width = 300;
  const height = 200;
  let shape;

  switch (userInput.shape) {
    case 'circle':
      shape = new Circle();
      break;
    case 'triangle':
      shape = new Triangle();
      break;
    case 'square':
      shape = new Square();
      break;
    default:
      console.log('Invalid shape selection');
      return;
  }

  shape.setColor(userInput.shapeColor);

  const svgString = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="${width / 2}" y="${height / 2}" fill="${userInput.textColor}" text-anchor="middle" font-size="20">${userInput.text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svgString);
  console.log('Generated logo.svg');
}

async function main() {
  const userInput = await getUserInput();
  generateSVG(userInput);
}

main();