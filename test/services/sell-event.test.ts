import faker from "faker";
import app from "../../src/app";
import { SellEventData } from '../../src/services/sell-event/sell-event.class';
import { validIceCreamEntry } from "../mockedData/ice-cream-stock";
import { invalidSell } from "../mockedData/sell-event";

describe("'sellEvent' service", () => {
  it("registered the service", () => {
    const service = app.service("sell-event");
    expect(service).toBeTruthy();
  });
  it("should return errors when making an invalid sell", async () => {
    expect.assertions(1);
    const service = app.service("sell-event");
    try {
      await service.create([invalidSell]);
    } catch (e) {
      const { errors } = e;
      expect(errors["0,quantitySold"].message).toBe(
        '"[0].quantitySold" must be greater than or equal to 0'
      );
    }
  });
  it("should create a sale entry when made a sale", async () => {
    const stockService = app.service("ice-cream-stock");
    const sellService = app.service("sell-event");
    const productEntry = await stockService.create(validIceCreamEntry);
    const saleRequest = {
      productId: productEntry._id + "",
      soldTime: faker.date.past(),
      quantitySold: 3,
    };
    const sale = (await sellService.create([saleRequest])) as [SellEventData];
    expect({
      productId: sale[0].productId + "",
      soldTime: sale[0].soldTime,
      quantitySold: sale[0].quantitySold,
    }).toStrictEqual(saleRequest);
  });

  it("should decrease quantity retrieved for sale when made a sale", async () => {
    const stockService = app.service("ice-cream-stock");
    const sellService = app.service("sell-event");
    const productEntry = await stockService.create(validIceCreamEntry);
    const sale = {
      productId: productEntry._id + "",
      soldTime: faker.date.past(),
      quantitySold: 3,
    };
    await sellService.create([sale]);
    const updatedProductEntry = await stockService.get(productEntry._id);
    expect(updatedProductEntry.quantityInSale).toBe(2);
  });

  it("should not allow sale creation if item was not registered on stock", async () => {
    expect.assertions(1);

    const stockService = app.service("ice-cream-stock");
    const sellService = app.service("sell-event");

    const stockEntry = {
      description: faker.lorem.lines(),
      stockQuantity: Math.floor(faker.random.number()),
      quantityInSale: 1,
      shelfLife: 12,
    };
    const productEntry = await stockService.create(stockEntry);
    const sale = {
      productId: productEntry._id + "",
      soldTime: faker.date.past(),
      quantitySold: 3,
    };
    try {
      await sellService.create([sale]);
    } catch (error) {
      expect(error.message).toBe(
        "You can't sell items that never leaved stock!"
      );
    }
  });

  afterEach(async () => {
    const sellService = app.service("sell-event");
    const stockService = app.service("ice-cream-stock");

    await Promise.all([
      sellService._remove(null, {}),
      stockService._remove(null, {}),
    ]);
  });
});
