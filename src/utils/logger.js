import { NODE_ENV } from '../config.js';
import winston from 'winston';
const { createLogger, format, transports } = winston;

// Define niveles de log
const levels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

// Configuración del formato de log
const logFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack || ''}`;
  })
);

// Configuración del logger para desarrollo
const developmentLogger = createLogger({
  //levels,
  //format: logFormat,
  transports: [new transports.Console({level: 'info'})],
});

// Configuración del logger para producción
const productionLogger = createLogger({
  levels,
  format: logFormat,
  transports: [
    new transports.Console({
      level: 'info',
    }),
    new transports.File({
      filename: 'errors.log',
      level: 'error',
    }),
  ],
});

// Función para obtener el logger según el entorno
function getLogger() {
  if (NODE_ENV === 'production') {
    return productionLogger;
  } else {
    return developmentLogger;
  }
}

export const logger = getLogger();