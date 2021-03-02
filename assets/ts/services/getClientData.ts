const getClientData = (): Promise<Response> => {
  return fetch(`./api/client`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache'
  });
}

export default getClientData;