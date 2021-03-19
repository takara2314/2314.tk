import GetMoviePost from '../models/SendMailPost';

const sendMail = (data: GetMoviePost): Promise<Response> => {
  return fetch('/api/sendmail', {
    method: 'POST',
    mode:   'cors',
    cache:  'no-cache',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.SENDMAIL_TOKEN}`
    },
    body:   JSON.stringify(data),
  });
}

export default sendMail;