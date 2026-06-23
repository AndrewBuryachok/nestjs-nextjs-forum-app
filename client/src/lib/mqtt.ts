import mqtt from 'mqtt';

const BASE_URL = process.env.NEXT_PUBLIC_MQTT_URL!;

const BASE_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC!;

export function getMainUsersTopic() {
  return `${BASE_TOPIC}/users/+`;
}

export function getMyUsersTopic(userId: number) {
  return `${BASE_TOPIC}/users/${userId}`;
}

export function getPublicNotificationsTopic() {
  return `${BASE_TOPIC}/notifications/0/+/+/+/+`;
}

export function getMyNotificationsTopic(userId: number) {
  return `${BASE_TOPIC}/notifications/${userId}/+/+/+/+`;
}

export function getMyUnnotificationsTopic(userId: number) {
  return `${BASE_TOPIC}/unnotifications/${userId}/+/+/+/+`;
}

export function createClient(userId?: number) {
  const will = userId
    ? { topic: getMyUsersTopic(userId), payload: '', retain: true }
    : undefined;
  return mqtt.connect(BASE_URL, { protocolVersion: 5, will });
}

export function publish(
  client: mqtt.MqttClient,
  topic: string,
  payload: string,
) {
  const properties = payload
    ? { messageExpiryInterval: 3 * 24 * 60 * 60 }
    : undefined;
  client.publish(topic, payload, { retain: true, properties });
}

export function publishUser(
  client: mqtt.MqttClient,
  userId: number,
  status: boolean,
) {
  publish(
    client,
    getMyUsersTopic(userId),
    status ? new Date().toISOString() : '',
  );
}

export function publishNotification(client: mqtt.MqttClient, key: string) {
  publish(client, `${BASE_TOPIC}/notifications/${key}`, '');
}

export function publishUnnotification(client: mqtt.MqttClient, key: string) {
  publish(
    client,
    `${BASE_TOPIC}/unnotifications/${key}`,
    new Date().toISOString(),
  );
}
