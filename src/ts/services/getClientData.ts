const getClientData = (width: number, height: number, touchable: boolean): Promise<Response> => {
  return fetch(
    `./api/client?width=${width}&height=${height}&touchable=${touchable ? 'yes' : 'no'}`,
  {
    method: 'GET',
    mode:   'cors',
    cache:  'no-cache'
  });
}

export default getClientData;