// 🔄 Multi-Type Storage System
// 📦 Create a system that can store and manage different types of data.
//
// 1. Implement a class `Storage<T, U>` that can store multiple types of data.
// 2. Implement a method `addItem` that stores a new item of a generic type.
// 3. Implement a method `removeItem` that removes an item by value.
// 4. Implement a method `getItems` that returns all stored items.
// 5. Implement a method `findItem` that searches for an item by a given property value.
// 6. Implement a method `updateItem` that updates an item by its property value.

class MyStorage<T, U> {
  items: T[] = []

  addItem(item: T): string {
    this.items.push(item)

    const originalName = (item as T & { name?: string }).name;

    return originalName 
      ? `${originalName} updated successfully.` 
      : `${item} updated successfully.`;
  }

  getItems(): T[] {
    return this.items;
  }

  removeItem(id: T): string {
    const index = this.items.findIndex(item => item === id);
    if (index !== -1) {
      this.items.splice(index, 1);

      return `${id} removed from storage.`;
    }

    return `Item not found.`;
  }

  findItem<K extends keyof T>(prop: K, val: T[K]): T | undefined {
    return this.items.find(item => item[prop] === val);
  }

  updateItem<K extends keyof T>(prop: K, id: T[K], update: Partial<T>): string {
    const targetItem = this.findItem(prop, id);
    if (!targetItem) {
      return "Item not found.";
    }

    const originalName = (targetItem as T & { name?: string }).name;
    Object.assign(targetItem, update);

    return originalName 
      ? `${originalName} updated successfully.` 
      : `${id} updated successfully.`;
  }
}

// Test cases
const numberStrStorage = new MyStorage<number, string>();

console.log(numberStrStorage.addItem(10)); // "10 added to storage."
console.log(numberStrStorage.addItem(20)); // "20 added to storage."
console.log(numberStrStorage.getItems()); // [10, 20]
console.log(numberStrStorage.removeItem(10)); // "10 removed from storage."
console.log(numberStrStorage.getItems()); // [20]

const userStorage = new MyStorage<{ id: number; name: string }, string>();

console.log(userStorage.addItem({ id: 1, name: "Alice" })); // "User Alice added."
console.log(userStorage.addItem({ id: 2, name: "Bob" })); // "User Bob added."
console.log(userStorage.getItems()); // [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]
console.log(userStorage.findItem("name", "Alice")); // { id: 1, name: "Alice" }
console.log(userStorage.updateItem("id", 1, { id: 1, name: "Alice Updated" })); // "Alice updated successfully."
console.log(userStorage.getItems()); // [{ id: 1, name: "Alice Updated" }, { id: 2, name: "Bob" }]