import faker from "faker";

export const invalidSell = {
  productId: faker.random.uuid(),
  soldTime: faker.date.past(),
  quantitySold: -3,
};

