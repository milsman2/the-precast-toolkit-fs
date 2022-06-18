import http from 'k6/http';
import { Rate } from 'k6/metrics';
import { check, sleep } from 'k6';

export const errorRate = new Rate('errors');

export default function () {
  const url = 'https://fastapi.precasttoolkit.com/api/v1/cast_iron/all-cast-iron/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  check(http.get(url, params), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);

  sleep(1);
}