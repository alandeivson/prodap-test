import app from "../../src/app";
import { Data } from "../../src/services/ice-cream-withdrawal/ice-cream-withdrawal.class";
import { OutOfStockError } from "../../src/services/ice-cream-withdrawal/ice-cream-withdrawal.errors";
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
      expect(errors.quantityInSale.message).toBe(
        '"quantity" must be a positive number'
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
        id: savedIceCreamEntry1._id,
        quantity: 2,
      },
      {
        id: savedIceCreamEntry2._id,
        quantity: 3,
      },
    ];

    await iceCreamWithdrawalService.create(iceCreamWithdrawal);

    const updatedEntry1 = (await stockService.find({
      _id: savedIceCreamEntry1._id,
    })) as Data[];
    const updatedEntry2 = (await stockService.find({
      _id: savedIceCreamEntry2._id,
    })) as Data[];

    expect({
      quantity1: updatedEntry1[0].stockQuantity,
      quantity2: updatedEntry2[0].stockQuantity,
    }).toBe({
      quantity1: 11,
      quantity2: 0,
    });
  });

  it("should return an error when trying to withdraw more icecream than the stocked", async () => {
    expect.assertions(1);

    const iceCreamWithdrawalService = app.service("ice-cream-withdrawal");
    const stockService = app.service("ice-cream-stock");
    const savedIceCreamEntry1 = await stockService.create(iceCreamEntry1);
    const savedIceCreamEntry2 = await stockService.create(iceCreamEntry2);

    const iceCreamWithdrawal = [
      {
        id: savedIceCreamEntry1._id,
        quantity: 2,
      },
      {
        id: savedIceCreamEntry2._id,
        quantity: 9,
      },
    ];

    try {
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
