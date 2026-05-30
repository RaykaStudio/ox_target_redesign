const resource = GetParentResourceName();

export async function fetchNui(eventName, data) {
  const resp = await fetch(`https://${resource}/${eventName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });

  const text = await resp.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    return text;
  }
}