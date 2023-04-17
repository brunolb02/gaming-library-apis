import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

const configValidationSchema = {
  SERVICE_PORT: Joi.number().default(3000),
  ENVIRONMENT: Joi.string(),
  SWAGGER_USER: Joi.string(),
  SWAGGER_PASSWORD: Joi.string(),
  POSTGRES_HOST: Joi.string(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USERNAME: Joi.string(),
  POSTGRES_PASSWORD: Joi.string(),
  POSTGRES_DB: Joi.string().default('gamingLibrary'),
};

export default ConfigModule.forRoot({
  ignoreEnvFile: true,
  isGlobal: true,
  validationSchema: Joi.object(configValidationSchema),
});
