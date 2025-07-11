import winston from 'winston';
import { config } from './environment';

// 📝 Configuração do sistema de logs estruturados
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return JSON.stringify({
      timestamp,
      level: level.toUpperCase(),
      message,
      ...meta
    });
  })
);

// 🎨 Formato para desenvolvimento (mais legível)
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  })
);

// 📊 Configuração dos transports
const transports: winston.transport[] = [
  // Console sempre ativo
  new winston.transports.Console({
    format: config.nodeEnv === 'development' ? devFormat : logFormat,
    level: config.nodeEnv === 'development' ? 'debug' : 'info'
  })
];

// 📁 Logs em arquivo para produção
if (config.nodeEnv === 'production') {
  transports.push(
    // Logs gerais
    new winston.transports.File({
      filename: 'logs/app.log',
      format: logFormat,
      level: 'info',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // Logs de erro
    new winston.transports.File({
      filename: 'logs/error.log',
      format: logFormat,
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    })
  );
}

// 🏭 Criação do logger
export const logger = winston.createLogger({
  level: config.nodeEnv === 'development' ? 'debug' : 'info',
  format: logFormat,
  transports,
  // Não sair do processo em caso de erro
  exitOnError: false,
  // Rejeições não tratadas
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ],
  // Exceções não tratadas
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exceptions.log' })
  ]
});

// 🎯 Interface para logs estruturados
interface LogContext {
  userId?: string;
  requestId?: string;
  action?: string;
  resource?: string;
  duration?: number;
  statusCode?: number;
  userAgent?: string;
  ip?: string;
  [key: string]: unknown;
}

// 🛠️ Funções de log tipadas
export const log = {
  debug: (message: string, context?: LogContext) => {
    logger.debug(message, context);
  },
  
  info: (message: string, context?: LogContext) => {
    logger.info(message, context);
  },
  
  warn: (message: string, context?: LogContext) => {
    logger.warn(message, context);
  },
  
  error: (message: string, error?: Error, context?: LogContext) => {
    logger.error(message, {
      error: error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : undefined,
      ...context
    });
  },
  
  // 📊 Log específico para requisições HTTP
  request: (method: string, path: string, statusCode: number, duration: number, context?: LogContext) => {
    logger.info(`${method} ${path}`, {
      action: 'http_request',
      method,
      path,
      statusCode,
      duration,
      ...context
    });
  },
  
  // 🔐 Log de autenticação
  auth: (action: string, userId?: string, success: boolean = true, context?: LogContext) => {
    logger.info(`Auth: ${action}`, {
      action: 'auth',
      authAction: action,
      userId,
      success,
      ...context
    });
  },
  
  // 💳 Log de pagamentos
  payment: (action: string, amount: number, currency: string, success: boolean, context?: LogContext) => {
    logger.info(`Payment: ${action}`, {
      action: 'payment',
      paymentAction: action,
      amount,
      currency,
      success,
      ...context
    });
  },
  
  // 🗄️ Log de banco de dados
  database: (operation: string, table: string, duration?: number, context?: LogContext) => {
    logger.debug(`DB: ${operation} on ${table}`, {
      action: 'database',
      operation,
      table,
      duration,
      ...context
    });
  }
};

// 📈 Middleware para adicionar contexto de requisição
export const addRequestContext = (requestId: string, userId?: string) => {
  return {
    requestId,
    userId,
    timestamp: new Date().toISOString()
  };
}; 