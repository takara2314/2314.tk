const loadMemo = (memoName: string): Promise<Response> => {
  return fetch(`http://localhost:2314/api/memo/${memoName}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Authorization': 'Bearer wktk!TKrN:2314'
    }
  });
  // .then(res => res.text())
  // .then(
  //   (result: string) => {
  //     console.log(result);
  //     returnResult = result;
  //   },
  //   (error: Error) => {
  //     returnResult = 'エラー';
  //     returnError = error;
  //   }
  // );
}

export default loadMemo;