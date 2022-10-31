import { registerAs } from '@nestjs/config';

export default registerAs('template-api', () => ({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  URL_MONGO_CONNECTION_STRING: process.env.URL_MONGO_CONNECTION_STRING,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  ERRORS_LOG_ENABLE: process.env.ERRORS_LOG_ENABLE,
}));
