import { Application } from '../declarations';
import users from './users/users.service';
import iceCreamStock from './ice-cream-stock/ice-cream-stock.service';
import iceCreamWithdrawal from './ice-cream-withdrawal/ice-cream-withdrawal.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(iceCreamStock);
  app.configure(iceCreamWithdrawal);
}
