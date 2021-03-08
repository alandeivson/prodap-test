import { Application } from "../../declarations";
import { OutOfStockError } from "./ice-cream-withdrawal.errors";

export interface Data {
  _id: string;
  quantity: number;
}

interface ServiceOptions {}

interface IIceCreamWithdrawal<T> {
  create: (data: T[]) => any;
}

export class IceCreamWithdrawal implements IIceCreamWithdrawal<Data> {
  app: Application;
  options: ServiceOptions;

  constructor(options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async create(data: Data[]): Promise<any> {
    const iceCreamStockService = this.app.service("ice-cream-stock");
    const updatePromises = data.map((item) => {
      return iceCreamStockService.Model.startSession().then(async (session) => {
        session.startTransaction();
        const opts = { session };
        const stockRegistry = await iceCreamStockService.Model.findById(
          item._id
        );
        if (stockRegistry.stockQuantity - item.quantity < 0) {
          await session.abortTransaction();
          session.endSession();
          throw new OutOfStockError();
        }
        await iceCreamStockService.Model.updateOne(
          { _id: item._id },
          {
            $inc: {
              //@ts-ignore
              stockQuantity: -1 * item.quantity,
              //@ts-ignore
              quantityInSale: item.quantity,
            },
          },
          opts
        );
        await session.commitTransaction();
        return await session.endSession();
      });
    });
    return Promise.all(updatePromises);
  }
}
