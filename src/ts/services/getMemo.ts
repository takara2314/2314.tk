const getMemo = (memoName: string): Promise<Response> => {
  return fetch(`./api/memo/${memoName}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Authorization': 'Bearer wktk!TKrN:2314'
    }
  });
}

export default getMemo;