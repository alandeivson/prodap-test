// Initializes the `iceCreamWithdrawal` service on path `/ice-cream-withdrawal`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { IceCreamWithdrawal } from "./ice-cream-withdrawal.class";
import hooks from "./ice-cream-withdrawal.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    "ice-cream-withdrawal": IceCreamWithdrawal & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    paginate: app.get("paginate"),
  };

  // Initialize our service with any options it requires
  app.use("/ice-cream-withdrawal", new IceCreamWithdrawal(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("ice-cream-withdrawal");

  service.hooks(hooks);
}
