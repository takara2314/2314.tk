import SendMailPost from '../models/SendMailPost';
import sendMailToken from './sendMailToken';

// メールを送る関数
const sendMail = (data: SendMailPost): Promise<Response> => {
  // POSTで内容を送る
  return fetch('/api/sendmail', {
    method: 'POST',
    mode:   'cors',
    cache:  'no-cache',
    headers: {
      "Content-Type": "application/json",
      // ここのトークンは公開できないんだ！ごめんね！
      "Authorization": `Bearer ${sendMailToken}`
    },
    body:   JSON.stringify(data),
  });
}

export default sendMail;