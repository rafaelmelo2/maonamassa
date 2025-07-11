import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/environment';
import { log } from '../config/logger';
import { AuthenticationError, AuthorizationError } from './errorHandler';

// 🔐 Interface para o payload do JWT
interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// 🎯 Extensão do Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

// 🛡️ Middleware de autenticação
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('Token de acesso requerido');
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    
    if (!token) {
      throw new AuthenticationError('Token de acesso requerido');
    }

    // Verifica e decodifica o token
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    
    // Adiciona informações do usuário ao request
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    // Log da autenticação
    const userAgent = req.get('User-Agent');
    const logContext: any = {
      requestId: req.headers['x-request-id'] as string
    };
    
    if (userAgent) {
      logContext.userAgent = userAgent;
    }
    if (req.ip) {
      logContext.ip = req.ip;
    }
    
    log.auth('token_verified', decoded.userId, true, logContext);

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      log.auth('token_invalid', undefined, false, {
        requestId: req.headers['x-request-id'] as string,
        error: error.message
      });
      next(new AuthenticationError('Token inválido'));
    } else if (error instanceof jwt.TokenExpiredError) {
      log.auth('token_expired', undefined, false, {
        requestId: req.headers['x-request-id'] as string
      });
      next(new AuthenticationError('Token expirado'));
    } else {
      next(error);
    }
  }
};

// 🎭 Middleware de autorização por role
export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AuthenticationError('Usuário não autenticado'));
    }

    const userRole = req.user.role;
    
    if (!allowedRoles.includes(userRole)) {
      log.auth('access_denied', req.user.id, false, {
        requestId: req.headers['x-request-id'] as string,
        requiredRoles: allowedRoles,
        userRole,
        resource: req.path
      });
      
      return next(new AuthorizationError('Acesso negado para este recurso'));
    }

    log.auth('access_granted', req.user.id, true, {
      requestId: req.headers['x-request-id'] as string,
      role: userRole,
      resource: req.path
    });

    next();
  };
};

// 🆔 Middleware para verificar se o usuário pode acessar apenas seus próprios recursos
export const authorizeOwnership = (userIdField: string = 'userId') => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AuthenticationError('Usuário não autenticado'));
    }

    const currentUserId = req.user.id;
    const resourceUserId = req.params[userIdField] || req.body[userIdField];

    // Admins podem acessar qualquer recurso
    if (req.user.role === 'admin') {
      return next();
    }

    // Usuários só podem acessar seus próprios recursos
    if (currentUserId !== resourceUserId) {
      log.auth('ownership_denied', currentUserId, false, {
        requestId: req.headers['x-request-id'] as string,
        targetUserId: resourceUserId,
        resource: req.path
      });
      
      return next(new AuthorizationError('Você só pode acessar seus próprios recursos'));
    }

    next();
  };
};

// 🎯 Middleware opcional de autenticação (não falha se não houver token)
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    
    if (!token) {
      return next();
    }

    // Verifica o token
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    
    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    // Em caso de erro, simplesmente continua sem autenticação
    next();
  }
};

// 🔑 Utilitário para gerar token JWT
export const generateToken = (payload: { userId: string; email: string; role: string }): string => {
  return jwt.sign(
    {
      userId: payload.userId,
      email: payload.email,
      role: payload.role
    },
    config.jwt.secret
  );
};

// 🎭 Helpers para roles
export const ROLES = {
  ADMIN: 'admin',
  PROFESSIONAL: 'professional',
  CLIENT: 'client'
} as const;

export const requireAuth = authenticateToken;
export const requireAdmin = [authenticateToken, authorizeRole(ROLES.ADMIN)];
export const requireProfessional = [authenticateToken, authorizeRole(ROLES.PROFESSIONAL)];
export const requireClient = [authenticateToken, authorizeRole(ROLES.CLIENT)];
export const requireProfessionalOrClient = [authenticateToken, authorizeRole(ROLES.PROFESSIONAL, ROLES.CLIENT)]; 