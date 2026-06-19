export function parseNotification(key: string, date: Date) {
  const [toUserId, page, id, action, fromUserId] = key.split('/');
  return {
    key,
    fromUserId: Number(fromUserId),
    toUserId: Number(toUserId),
    id: Number(id),
    page,
    action,
    date,
  };
}
