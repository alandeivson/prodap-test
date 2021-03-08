// Initializes the `sellEvent` service on path `/sell-event`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { SellEvent } from './sell-event.class';
import createModel from '../../models/sell-event.model';
import hooks from './sell-event.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'sell-event': SellEvent & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sell-event', new SellEvent(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sell-event');

  service.hooks(hooks);
}
