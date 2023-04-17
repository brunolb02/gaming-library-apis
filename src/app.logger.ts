import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

const logTemplate = winston.format.printf(
  ({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  },
);

const logFormatter = winston.format.combine(
  winston.format.label({ label: process.env.SERVICE_NAME }),
  winston.format.timestamp(),
  logTemplate,
);

export default WinstonModule.forRoot({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormatter,
  defaultMeta: { service: process.env.SERVICE_NAME },
  transports: [new winston.transports.Console()],
});
