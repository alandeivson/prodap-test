import app from "../../src/app";
import services from "../../src/services";
import {
  invalidIceCreamEntry,
  validIceCreamEntry,
} from "../mockedData/ice-cream-stock";

describe("'IceCreamStock' service", () => {
  it("registered the service", () => {
    const service = app.service("ice-cream-stock");
    expect(service).toBeTruthy();
  });
  it("should return errors when creating an invalid stock registry ", async () => {
    expect.assertions(1);

    const service = app.service("ice-cream-stock");

    try {
      await service.create(invalidIceCreamEntry);
    } catch (e) {
      const { errors } = e;
      expect(errors.quantityInSale.message).toBe(
        '"quantityInSale" must be a positive number'
      );
    }
  });
  it("should create sucessfully a valid stock registry ", async () => {
    const service = app.service("ice-cream-stock");
    const {
      description,
      quantityInSale,
      stockQuantity,
      shelfLife,
    } = await service.create(validIceCreamEntry);

    expect({ description, quantityInSale, stockQuantity, shelfLife }).toStrictEqual(
      validIceCreamEntry
    );
  });

  afterEach(async () => {
    const service = app.service("ice-cream-stock");
    await service._remove(null, {});
  });
});
