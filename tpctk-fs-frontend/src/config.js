import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();
const config = {
  apiBasePath: env.REACT_APP_API_BASE_PATH || 'https://fastapi.precasttoolkit.com',
  reactAppMode: process.env.REACT_APP_MODE || 'production',
};

export default config;