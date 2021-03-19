import GetMoviePost from '../models/SendMailPost';
import sendMailToken from './sendMailToken';

const sendMail = (data: GetMoviePost): Promise<Response> => {
  return fetch('/api/sendmail', {
    method: 'POST',
    mode:   'cors',
    cache:  'no-cache',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sendMailToken}`
    },
    body:   JSON.stringify(data),
  });
}

export default sendMail;