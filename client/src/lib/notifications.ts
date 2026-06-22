import { NOTIFICATION_TABS_MAP } from '@/config/notification';

export function parseNotification(key: string, date: Date) {
  const [toUserId, page, id, action, fromUserId] = key.split('/');
  const tab = NOTIFICATION_TABS_MAP[page][action];
  return {
    key,
    fromUserId: Number(fromUserId),
    toUserId: Number(toUserId),
    id: Number(id),
    page,
    action,
    link: `/${page}/${tab}?id=${id}`.replace('/main', ''),
    date,
  };
}
