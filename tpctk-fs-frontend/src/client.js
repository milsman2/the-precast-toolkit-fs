import config from './config';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

const axios = require('axios');


class FastAPIClient {
  constructor(overrides) {
    this.config = {
      ...config,
      ...overrides,
    };
    this.authToken = config.authToken;

    this.login = this.login.bind(this);
    this.apiClient = this.getApiClient(this.config);
  }

  /* ----- Authentication & User Operations ----- */

  /* Authenticate the user with the backend services.
	 * The same JWT should be valid for both the api and cms */
  login(username, password) {
    delete this.apiClient.defaults.headers['Authorization'];

    // HACK: This is a hack for scenario where there is no login form
    const form_data = new FormData();
    const grant_type = 'password';
    const item = {grant_type, username, password};
    for (const key in item) {
      form_data.append(key, item[key]);
    }

    return this.apiClient
        .post('/auth/login', form_data)
        .then((resp) => {
          localStorage.setItem('token', JSON.stringify(resp.data));
          return this.fetchUser();
        });
  }

  fetchUser() {
    return this.apiClient.get('/auth/me').then(({data}) => {
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    });
  }

  register(email, password, fullName) {
    const loginData = {
      email,
      password,
      full_name: fullName,
      is_active: true,
    };

    return this.apiClient.post('/auth/signup', loginData).then(
        (resp) => {
          return resp.data;
        });
  }

  // Logging out is just deleting the jwt.
  logout() {
    // Add here any other data that needs to be deleted from local storage
    // on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /* ----- Client Configuration ----- */

  /* Create Axios client instance pointing at the REST api backend */
  getApiClient(config) {
    const initialConfig = {
      baseURL: `${config.apiBasePath}/api/v1`,
    };
    const client = axios.create(initialConfig);
    client.interceptors.request.use(localStorageTokenInterceptor);
    return client;
  }

  getCastIron(castIronId) {
    return this.apiClient.get(`/cast_iron/${castIronId}`);
  }

  getCastIrons(keyword) {
    return this.apiClient.get(`/cast_iron/search/?keyword=${keyword}`).then(({data}) => {
      return data;
    });
  }

  getAllCastIron() {
    return this.apiClient.get(`/cast_iron/all-cast-iron/`).then(({data}) => {
      return data;
    });
  }

  createCastIron(label, Vulcan_style_code, Accucast_code, EJ_code, SIP_code, description, submitter_id) {
    const castIronData = {
      label,
      Vulcan_style_code,
      Accucast_code,
      EJ_code,
      SIP_code,
      description,
      submitter_id: submitter_id,
    };
    return this.apiClient.post(`/cast_iron/`, castIronData);
  }


  deleteCastIron(castIronId) {
    return this.apiClient.delete(`/cast_iron/${castIronId}`);
  }
}


// every request is intercepted and has auth header injected.
function localStorageTokenInterceptor(config) {
  const headers = {};
  const tokenString = localStorage.getItem('token');

  if (tokenString) {
    const token = JSON.parse(tokenString);
    const decodedAccessToken = jwtDecode(token.access_token);
    const isAccessTokenValid =
			moment.unix(decodedAccessToken.exp).toDate() > new Date();
    if (isAccessTokenValid) {
      headers['Authorization'] = `Bearer ${token.access_token}`;
    } else {
      alert('Your login session has expired');
    }
  }
  config['headers'] = headers;
  return config;
}

export default FastAPIClient;