import mqtt from 'mqtt';

const BASE_URL = process.env.NEXT_PUBLIC_MQTT_URL!;

const BASE_TOPIC = process.env.NEXT_PUBLIC_MQTT_TOPIC!;

export function getMainUsersTopic() {
  return `${BASE_TOPIC}/users/+`;
}

export function getMyUsersTopic(userId: number) {
  return `${BASE_TOPIC}/users/${userId}`;
}

export function createClient(userId?: number) {
  const will = userId
    ? { topic: getMyUsersTopic(userId), payload: '', retain: true }
    : undefined;
  return mqtt.connect(BASE_URL, { will });
}

export function publish(
  client: mqtt.MqttClient,
  topic: string,
  payload: string,
) {
  client.publish(topic, payload, { retain: true });
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
