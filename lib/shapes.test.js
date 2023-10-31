const { Triangle, Circle, Square } = require('./shapes');

describe('Shapes', () => {
  test('Triangle should render correctly', () => {
    const triangle = new Triangle();
    triangle.setColor('blue');
    expect(triangle.render()).toBe('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
  });

  test('Circle should render correctly', () => {
    const circle = new Circle();
    circle.setColor('red');
    expect(circle.render()).toBe('<circle cx="150" cy="100" r="50" fill="red" />');
  });

  test('Square should render correctly', () => {
    const square = new Square();
    square.setColor('green');
    expect(square.render()).toBe('<rect x="100" y="50" width="100" height="100" fill="green" />');
  });
});