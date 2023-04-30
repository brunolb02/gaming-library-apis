import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const configValidationSchema = {
  PORT: Joi.number(),
  ENVIRONMENT: Joi.string(),
  SWAGGER_USER: Joi.string(),
  SWAGGER_PASSWORD: Joi.string(),
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USERNAME: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DB: Joi.string().default('gamingLibrary'),
  JWT_SECRET_KEY: Joi.string(),
  JWT_EXPIRATION_TIME: Joi.string(),
  HTTP_TIMEOUT: Joi.number(),
  HTTP_MAX_REDIRECTS: Joi.number(),
  GAMESPOT_API_BASE_URL: Joi.string(),
  GAMESPOT_API_KEY: Joi.string(),
  RAWG_API_BASE_URL: Joi.string(),
  RAWG_API_KEY: Joi.string(),
};

export default ConfigModule.forRoot({
  ignoreEnvFile: true,
  isGlobal: true,
  validationSchema: Joi.object(configValidationSchema),
});
