import faker from "faker";

export const invalidIceCreamEntry = {
  description: faker.lorem.lines(),
  stockQuantity: Math.floor(faker.random.number()),
  quantityInSale: -4,
  shelfLife: 12,
};

export const validIceCreamEntry = {
  description: faker.lorem.lines(),
  stockQuantity: Math.floor(faker.random.number()),
  quantityInSale: 5,
  shelfLife: 12,
};
