export const NOTIFICATION_TABS_MAP = {
  applications: {
    accept: 'sent',
    create: 'received',
    delete: 'received',
    reject: 'sent',
  },
  cards: {
    add: 'my',
    remove: 'my',
  },
  complaints: {
    create: 'my',
  },
  fines: {
    create: 'my',
    pay: 'paid',
    remind: 'my',
    expire: 'my',
  },
  invitations: {
    accept: 'sent',
    create: 'received',
    delete: 'received',
    reject: 'sent',
  },
  landmarks: {
    create: 'main',
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
  },
  rents: {
    create: 'my',
    continue: 'my',
    complete: 'completed',
    remind: 'my',
    expire: 'completed',
  },
  residents: {
    leave: 'my',
    delete: 'my',
  },
  shops: {
    create: 'main',
  },
  towns: {
    create: 'main',
  },
  transactions: {
    create: 'my',
    transfer: 'my',
  },
} as Record<string, Record<string, string>>;
