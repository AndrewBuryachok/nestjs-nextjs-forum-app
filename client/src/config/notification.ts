export const NOTIFICATION_TABS_MAP = {
  cards: {
    add: 'my',
    remove: 'my',
  },
  orders: {
    cancel: 'my',
    complete: 'taken',
    execute: 'my',
    take: 'my',
  },
  products: {
    end: 'my',
  },
  purchases: {
    create: 'my',
  },
  transactions: {
    create: 'my',
    transfer: 'my',
  },
} as Record<string, Record<string, string>>;
