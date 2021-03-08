export class OutOfSaleError extends Error {
  constructor() {
    super("You can't sell items that never leaved stock!");
  }
}
