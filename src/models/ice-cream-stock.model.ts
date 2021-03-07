// IceCreamStock-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";

export default function (app: Application) {
  const modelName = "iceCreamStock";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      description: { type: String, required: true },
      stockQuantity: { type: Number, min: 0, default: 0 },
      quantityInSale: { type: Number, min: 0, default: 0 },
      shelfLife: { type: Number, required: true, min: 0 },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
}
