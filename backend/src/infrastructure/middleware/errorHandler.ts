import { Request, Response, NextFunction } from 'express';
import { log } from '../config/logger';

// 🎯 Tipos de erro customizados
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code?: string;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (code) {
      this.code = code;
    }

    // Mantém o stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// 🚫 Erros específicos
export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, true, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Token de autenticação inválido') {
    super(message, 401, true, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Acesso negado') {
    super(message, 403, true, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Recurso') {
    super(`${resource} não encontrado`, 404, true, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, true, 'CONFLICT_ERROR');
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Muitas requisições. Tente novamente mais tarde.') {
    super(message, 429, true, 'RATE_LIMIT_ERROR');
    this.name = 'RateLimitError';
  }
}

// 📝 Interface para resposta de erro
interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    requestId?: string;
    details?: unknown;
  };
}

// 🛠️ Middleware principal de tratamento de erros
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let appError: AppError;

  // Converte erros conhecidos para AppError
  if (error instanceof AppError) {
    appError = error;
  } else if (error.name === 'ValidationError') {
    appError = new ValidationError(error.message);
  } else if (error.name === 'JsonWebTokenError') {
    appError = new AuthenticationError('Token JWT inválido');
  } else if (error.name === 'TokenExpiredError') {
    appError = new AuthenticationError('Token JWT expirado');
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    appError = new ConflictError('Recurso já existe');
  } else if (error.name === 'SequelizeValidationError') {
    appError = new ValidationError('Dados inválidos');
  } else {
    // Erro não previsto
    appError = new AppError(
      'Erro interno do servidor',
      500,
      false,
      'INTERNAL_SERVER_ERROR'
    );
  }

  // 📊 Log do erro
  const userAgent = req.get('User-Agent');
  const logContext: any = {
    requestId: req.headers['x-request-id'] as string,
    userId: (req as any).user?.id,
    method: req.method,
    path: req.path,
    statusCode: appError.statusCode
  };

  if (userAgent) {
    logContext.userAgent = userAgent;
  }
  if (req.ip) {
    logContext.ip = req.ip;
  }

  if (appError.statusCode >= 500) {
    log.error(appError.message, error, logContext);
  } else {
    log.warn(appError.message, logContext);
  }

  // 🎯 Resposta para o cliente
  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      message: appError.message,
      ...(appError.code && { code: appError.code }),
      statusCode: appError.statusCode,
      timestamp: new Date().toISOString(),
      path: req.path,
      method: req.method,
      ...(req.headers['x-request-id'] && { requestId: req.headers['x-request-id'] as string })
    }
  };

  // 🔍 Adiciona detalhes apenas em desenvolvimento
  if (process.env['NODE_ENV'] === 'development' && !appError.isOperational) {
    errorResponse.error.details = {
      stack: error.stack,
      name: error.name
    };
  }

  res.status(appError.statusCode).json(errorResponse);
};

// 🔄 Wrapper para funções async
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// 🎯 Função para criar erros rapidamente
export const createError = {
  validation: (message: string, field?: string) => new ValidationError(message),
  authentication: (message?: string) => new AuthenticationError(message),
  authorization: (message?: string) => new AuthorizationError(message),
  notFound: (resource?: string) => new NotFoundError(resource),
  conflict: (message: string) => new ConflictError(message),
  rateLimit: (message?: string) => new RateLimitError(message),
  internal: (message: string) => new AppError(message, 500, false)
}; 