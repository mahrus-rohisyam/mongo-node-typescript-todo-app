import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test'),
    PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().required().description('Mongo DB url'),
    JWT_ACCESS_SECRET: Joi.string().required().description('JWT access secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.string().default(60).description('minutes after which access token expire'),
    JWT_REFRESH_SECRET: Joi.string().required().description('JWT refresh secret key'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(7).description('days after which refresh token expire'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    url: envVars.DATABASE_URL,
  },
  jwt: {
    access: {
      secret: envVars.JWT_ACCESS_SECRET,
      expires: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    },
    refresh: {
      secret: envVars.JWT_REFRESH_SECRET,
      expires: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    },
  },
};
