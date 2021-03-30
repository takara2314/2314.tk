// ブラウザとデバイス情報を取得するために、サーバーにGET
const getClientData = (width: number, height: number, touchable: boolean): Promise<Response> => {
  // 表示域の横・縦の長さ、主な操作はタッチかどうかを送る
  return fetch(
    `./api/client?width=${width}&height=${height}&touchable=${touchable ? 'yes' : 'no'}`,
  {
    method: 'GET',
    mode:   'cors',
    cache:  'no-cache'
  });
}

export default getClientData;