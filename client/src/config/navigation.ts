import { Role } from '@/constants/roles';

export const PAGE_TABS_MAP = {
  cards: {
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
