import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Application } from "../../declarations";
import { OutOfSaleError } from "./sell-event.errors";

export interface SellEventData {
  productId: string;
  soldTime: Date;
  quantitySold: number;
}

export class SellEvent extends Service<SellEventData> {
  app: Application;

  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
    this.app = app;
  }

  async create(
    data: Partial<SellEventData> | Partial<SellEventData>[]
  ): Promise<SellEventData | SellEventData[]> {
    const sellEventData = data as SellEventData[];
    const iceCreamStockService = this.app.service("ice-cream-stock");

    const updatePromises = sellEventData.map((item) => {
      return iceCreamStockService.Model.startSession().then(async (session) => {
        session.startTransaction();
        const opts = { session };
        const stockRegistry = await iceCreamStockService.Model.findById(
          item.productId
        );
        if (stockRegistry.quantityInSale - item.quantitySold < 0) {
          await session.abortTransaction();
          session.endSession();
          throw new OutOfSaleError();
        }
        await iceCreamStockService.Model.updateOne(
          { _id: item.productId },
          {
            $inc: {
              //@ts-ignore
              quantityInSale: -1 * item.quantitySold,
            },
          },
          opts
        );
        const sale = await super.create(item);
        await session.commitTransaction();
        await session.endSession();
        return sale;
      });
    });
    return ((await Promise.all(updatePromises)) as unknown) as Promise<
      SellEventData[]
    >;
  }
}
