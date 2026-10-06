export async function postData<T, U>(url: string, token: string, body: T) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error();
  }
  const data = await response.json();
  return data as U;
}
