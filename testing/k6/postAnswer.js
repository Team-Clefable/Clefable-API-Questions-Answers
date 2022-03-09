import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

export const requests = new Counter('http_reqs');

// export const options = {
//   vus: 100,
//   duration: '30s',
// }

export const options = {
  stages: [
    { duration: '15s', target: 100 },
    { duration: '30s', target: 100 },
    { duration: '15s', target: 0 },
  ],
};

const randomNum = (max, min) => (
  Math.floor(Math.random() * (max - 1 + min) + min)
);
let count = randomNum(1000000, 1);

export default function () {

  var url = `http://localhost:3000/qa/questions/${count}/answers`;
  const payload = JSON.stringify({
    body: 'this is a mattest test',
    name: 'mattest',
    email: 'mattest@mattest.com',
    photos: []
  });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = http.post(url, payload, params);
  sleep(1);
  check(res, {
    'status was 201': (r) => r.status == 200,
    'transaction time < 200ms' : r => r.timings.duration < 200,
    'transaction time < 500ms' : r => r.timings.duration < 500,
    'transaction time < 1000ms' : r => r.timings.duration < 1000,
    'transaction time < 2000ms' : r => r.timings.duration < 2000,
  });
}