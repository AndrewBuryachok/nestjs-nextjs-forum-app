import { Role } from '@/constants/roles';

export const PAGE_TABS_MAP = {
  cards: {
    my: {},
    all: { roles: [Role.ADMIN] },
  },
  goods: {
    main: { public: true },
    my: {},
    all: { roles: [Role.ADMIN] },
  },
  lockers: {
    main: { public: true },
    my: {},
    all: { roles: [Role.ADMIN] },
  },
  orders: {
    main: { public: true },
    my: {},
    taken: {},
    all: { roles: [Role.ADMIN] },
  },
  purchases: {
    my: {},
    all: { roles: [Role.ADMIN] },
  },
  shops: {
    main: { public: true },
    my: {},
    all: { roles: [Role.ADMIN] },
  },
  transactions: {
    my: {},
    all: { roles: [Role.ADMIN] },
  },
  users: {
    main: { public: true },
  },
};
