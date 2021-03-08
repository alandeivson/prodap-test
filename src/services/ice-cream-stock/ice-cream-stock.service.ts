// Initializes the `IceCreamStock` service on path `/ice-cream-stock`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { IceCreamStock } from './ice-cream-stock.class';
import createModel from '../../models/ice-cream-stock.model';
import hooks from './ice-cream-stock.hooks';
import { Data } from '../ice-cream-withdrawal/ice-cream-withdrawal.class';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'ice-cream-stock': IceCreamStock & ServiceAddons<Data>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ice-cream-stock', new IceCreamStock(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ice-cream-stock');

  service.hooks(hooks);
}
