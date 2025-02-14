// 🛍️ E-Commerce Cart System
// 🛒 Create a shopping cart system that manages products and their quantities.
//
// 1. Implement a class `ShoppingCart<T>` to handle products in a cart.
// 2. Implement a method `addToCart` that adds a product to the cart and updates the quantity if it already exists.
// 3. Implement a method `removeFromCart` that removes a product from the cart completely.
// 4. Implement a method `updateQuantity` that updates the quantity of a product in the cart.
// 5. Implement a method `getProductsOfCategory` that accepts a string and returns an array of items from the cart that match that category.
// 6. Implement a method `getTotalPrice` that returns the total cost of all items in the cart.

enum Category {
  Fruit = "Fruit",
  Vegetable = "Vegetable",
  Electronics = "Electronics",
  Pastry = "Pastry",
  Cereal = "Cereal"
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: Category;
}

class ShoppingCart<T extends CartItem> {
  cart: T[] = []

  addToCart(product: T): string {
    this.cart.push(product);

    return `${product.name} added to cart.`
  }

  updateQuantity(id: number, qty: number): string{
    const targetCartItem: T = this.cart.find((cartItem: CartItem) => cartItem.id === id)

    targetCartItem.quantity = qty;

    return `Updated quantity of ${targetCartItem.name} to ${qty}.`
  }

  getTotalPrice(): number {
    return this.cart.reduce(
      (result: number, prevValue: CartItem) => prevValue.price + result, 
      0
    )
  }

  getProductsOfCategory(category: Category): CartItem[] {
    return this.cart.filter((cartItem: CartItem) => cartItem.category === category)
  }

  removeFromCart(id: number): string {
    const targetCartItem: T = this.cart.find((cartItem: CartItem) => cartItem.id === id)

    return `${targetCartItem.name} removed from cart.`
  }
}

// Test cases
const cart = new ShoppingCart();

console.log(cart.addToCart({ id: 1, name: "Headphones", price: 50, quantity: 1, category: Category.Electronics })); // "Headphones added to cart."
console.log(cart.addToCart({ id: 2, name: "Keyboard", price: 100, quantity: 1, category: Category.Electronics })); // "Keyboard added to cart."
console.log(cart.updateQuantity(1, 3)); // "Updated quantity of Headphones to 3."
console.log(cart.getProductsOfCategory(Category.Electronics)) // Should return all electronics
console.log(cart.getTotalPrice()); // Should return the total cost of items
console.log(cart.removeFromCart(2)); // "Keyboard removed from cart."