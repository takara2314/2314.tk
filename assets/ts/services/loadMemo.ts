const loadMemo = (memoName: string): Promise<Response> => {
  return fetch(`https://2314.tk/api/memo/${memoName}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Authorization': 'Bearer wktk!TKrN:2314'
    }
  });
}

export default loadMemo;