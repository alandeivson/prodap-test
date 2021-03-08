import app from "../../src/app";
import {
  iceCreamEntry1,
  iceCreamEntry2,
  invalidWithdrawal,
} from "../mockedData/ice-cream-withdrawal";

describe("'iceCreamWithdrawal' service", () => {
  it("registered the service", () => {
    const service = app.service("ice-cream-withdrawal");
    expect(service).toBeTruthy();
  });
  it("should invalidate requests with invalid withdrawing data", async () => {
    expect.assertions(1);
    const service = app.service("ice-cream-withdrawal");
    try {
      await service.create(invalidWithdrawal);
    } catch (e) {
      const { errors } = e;
      expect(errors["0,quantity"].message).toBe(
        '"[0].quantity" must be a positive number'
      );
    }
  });
  it("should decrement icecream stock when withdrawing icecreams", async () => {
    const iceCreamWithdrawalService = app.service("ice-cream-withdrawal");
    const stockService = app.service("ice-cream-stock");
    const savedIceCreamEntry1 = await stockService.create(iceCreamEntry1);
    const savedIceCreamEntry2 = await stockService.create(iceCreamEntry2);

    const iceCreamWithdrawal = [
      {
        _id: savedIceCreamEntry1._id + "",
        quantity: 2,
      },
      {
        _id: savedIceCreamEntry2._id + "",
        quantity: 3,
      },
    ];
    await iceCreamWithdrawalService.create(iceCreamWithdrawal);
    const updatedEntry1 = await stockService.get(savedIceCreamEntry1._id + "");
    const updatedEntry2 = await stockService.get(savedIceCreamEntry2._id + "");
    expect({
      quantity1: updatedEntry1.stockQuantity,
      quantity2: updatedEntry2.stockQuantity,
    }).toStrictEqual({
      quantity1: 11,
      quantity2: 0,
    });
  });

  it("should return an error when trying to withdraw more icecream than stocked", async () => {
    expect.assertions(1);

    try {
      const iceCreamWithdrawalService = app.service("ice-cream-withdrawal");
      const stockService = app.service("ice-cream-stock");
      const savedIceCreamEntry1 = await stockService.create(iceCreamEntry1);
      const savedIceCreamEntry2 = await stockService.create(iceCreamEntry2);
      const iceCreamWithdrawal = [
        {
          _id: savedIceCreamEntry1._id + "",
          quantity: 2,
        },
        {
          _id: savedIceCreamEntry2._id + "",
          quantity: 9,
        },
      ];
      await iceCreamWithdrawalService.create(iceCreamWithdrawal);
    } catch (error) {
      expect(error.message).toBe(
        "You can't withdral this ammount, check the stock!"
      );
    }
  });

  afterEach(async () => {
    const service = app.service("ice-cream-stock");
    await service._remove(null, {});
  });
});
