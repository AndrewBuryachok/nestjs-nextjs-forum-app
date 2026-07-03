export const NOTIFICATION_TABS_MAP = {
  cards: {
    add: 'my',
    remove: 'my',
  },
  invoices: {
    create: 'my',
  },
  lockers: {
    create: 'main',
  },
  orders: {
    cancel: 'my',
    complete: 'taken',
    create: 'main',
    execute: 'my',
    take: 'my',
  },
  products: {
    create: 'main',
    end: 'my',
  },
  purchases: {
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
