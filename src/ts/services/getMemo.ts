// メモを取得
const getMemo = (memoName: string): Promise<Response> => {
  // メモ名をURLに入れる
  return fetch(`./api/memo/${memoName}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      // GitHubに公開している時点で意味ないと思うけど、
      // 以下の認証文字列でメモAPIにアクセスできるよ！
      'Authorization': 'Bearer wktk!TKrN:2314'
    }
  });
}

export default getMemo;