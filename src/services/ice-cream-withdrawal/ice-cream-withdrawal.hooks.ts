import * as authentication from "@feathersjs/authentication";
// Don't remove this comment. It's needed to format import lines nicely.
import validate from "./ice-cream-withdrawal.validation";
const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate("jwt")],
    find: [],
    get: [],
    create: [validate],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
