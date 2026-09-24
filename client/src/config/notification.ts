export const NOTIFICATION_TABS_MAP = {
  cards: {
    add: 'my',
    remove: 'my',
  },
  fines: {
    create: 'my',
    pay: 'paid',
  },
  lockers: {
    create: 'main',
  },
  orders: {
    cancel: 'my',
    complete: 'completed',
    create: 'main',
    execute: 'my',
    take: 'my',
  },
  plots: {
    create: 'main',
  },
  products: {
    create: 'main',
    end: 'my',
  },
  purchases: {
    create: 'my',
  },
  rents: {
    create: 'my',
  },
  shops: {
    create: 'main',
  },
  transactions: {
    create: 'my',
    transfer: 'my',
  },
} as Record<string, Record<string, string>>;
