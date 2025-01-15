class Calculator {
  constructor() {
    this.MENU = {
      Red: 50,
      Green: 40,
      Blue: 30,
      Yellow: 50,
      Pink: 80,
      Purple: 90,
      Orange: 120,
    };
  }

  calculatePrice(orders, hasMemberCard = false) {
    let totalPrice = 0;

    // Calculate total price based on menu
    for (const item in orders) {
      if (this.MENU[item]) {
        totalPrice = totalPrice + (this.MENU[item] * orders[item])
      } else {
        throw new Error(`Item '${item}' is not on the menu.`);
      }
    }

    // Discount 5% for special items
    let specialDiscount = 0;
    const specialItems = ["Orange", "Pink", "Green"];
    specialItems.forEach((item) => {

      // Check if the item is ordered more than 2
      if (orders[item] >= 2) {
        specialDiscount = specialDiscount + 0.05 * (this.MENU[item] * orders[item]);
      }
    });

    // Apply special discount
    totalPrice = totalPrice - specialDiscount;

    // Member card discount 10%
    if (hasMemberCard) {
      totalPrice = totalPrice * 0.9; // 10% discount
    }
    // Return total price
    return parseFloat(totalPrice.toFixed(2));
  }
}

// Example Usage
// Import the module and create a new instance of the Calculator class
console.log('------------------ Example Usage ------------------');
if (import.meta.url === `file://${process.argv[1]}`) {
  const calc = new Calculator();

  // Example 1: Red set and Green set, no member card
  console.log(calc.calculatePrice({ Red: 1, Green: 1 })); // Output: 90

  // Example 2: Red set and Green set, with member card
  console.log(calc.calculatePrice({ Red: 1, Green: 1 }, true)); // Output: 81.0

  // Example 3: 3 Orange sets, with member card
  console.log(calc.calculatePrice({ Orange: 3 }, true)); // Output: 307.8
}

export default Calculator;