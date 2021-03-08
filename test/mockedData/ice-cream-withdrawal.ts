import faker from "faker";

export const iceCreamEntry1 = {
  description: faker.lorem.lines(),
  stockQuantity: 13,
  quantityInSale: 2,
  shelfLife: 5,
};

export const invalidWithdrawal = [
  {
    _id: faker.random.uuid(),
    quantity: -2,
  },
];

export const iceCreamEntry2 = {
  description: faker.lorem.lines(),
  stockQuantity: 3,
  quantityInSale: 1,
  shelfLife: 5,
};
