export class OutOfStockError extends Error {
  constructor() {
    super("You can't withdral this ammount, check the stock!");
  }
}
