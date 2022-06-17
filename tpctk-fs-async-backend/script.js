import http from 'k6/http';

export default function () {
  const url = 'https://fastapi.precasttoolkit.com/api/v1/cast_iron/all-cast-iron/';

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.get(url, params);
}
