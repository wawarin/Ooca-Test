const expect = await import('chai');
import Calculator from '../food_store.js';
// const Calculator = require('../food_store.cjs');

describe("Calculator", () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });
  console.log("------------------ Unit Test ------------------");
  it("should calculate price without any discounts", () => {
    const orders = { Red: 1, Green: 1 };
    expect.expect(calc.calculatePrice(orders)).to.equal(90);
  });

  it("should apply 10% member discount", () => {
    const orders = { Red: 1, Green: 1 };
    expect.expect(calc.calculatePrice(orders, true)).to.equal(81.0);
  });

  it("should apply 5% bulk discount for eligible items", () => {
    const orders = { Orange: 3 };
    expect.expect(calc.calculatePrice(orders)).to.equal(342.0);
  });

  it("should apply both bulk and member discounts", () => {
    const orders = { Orange: 3 };
    expect.expect(calc.calculatePrice(orders, true)).to.equal(307.8);
  });

  it("should throw an error for invalid items", () => {
    const orders = { InvalidItem: 1 };
    expect.expect(() => calc.calculatePrice(orders)).to.throw("Item 'InvalidItem' is not on the menu.");
  });
});
