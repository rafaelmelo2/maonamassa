import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { asyncHandler } from '../../infrastructure/middleware/errorHandler';
import { AuthenticationError, ValidationError, NotFoundError } from '../../infrastructure/middleware/errorHandler';
import { generateToken } from '../../infrastructure/middleware/authMiddleware';
import { log } from '../../infrastructure/config/logger';
import { config } from '../../infrastructure/config/environment';

// 🎯 Interface para resposta de sucesso
interface ApiResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

// 🔐 Controlador de autenticação
export class AuthController {
  
  // 📝 Registro de usuário
  register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name, phone, role = 'client' } = req.body;
    
    // Validações básicas
    if (!email || !password || !name) {
      throw new ValidationError('Email, senha e nome são obrigatórios');
    }
    
    if (password.length < 6) {
      throw new ValidationError('A senha deve ter pelo menos 6 caracteres');
    }
    
    // Verificar se o email já existe (simulação)
    // TODO: Implementar com repositório real
    const existingUser = null; // await userRepository.findByEmail(email);
    
    if (existingUser) {
      throw new ValidationError('Email já está em uso');
    }
    
    // Hash da senha
    const passwordHash = await bcrypt.hash(password, config.bcryptSaltRounds);
    
    // Criar usuário (simulação)
    const newUser = {
      id: 'user-' + Date.now(),
      email,
      name,
      phone,
      role,
      status: 'pending',
      emailVerified: false,
      phoneVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // TODO: Salvar no banco de dados
    // const user = await userRepository.create({ ...newUser, password: passwordHash });
    
    // Gerar token
    const token = generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    });
    
    // Log da ação
    log.auth('user_registered', newUser.id, true, {
      email: newUser.email,
      role: newUser.role
    });
    
    const response: ApiResponse = {
      success: true,
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          status: newUser.status,
          emailVerified: newUser.emailVerified
        },
        token
      },
      message: 'Usuário registrado com sucesso'
    };
    
    res.status(201).json(response);
  });
  
  // 🔑 Login de usuário
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    // Validações básicas
    if (!email || !password) {
      throw new ValidationError('Email e senha são obrigatórios');
    }
    
    // Buscar usuário (simulação)
    // TODO: Implementar com repositório real
    const user = null; // await userRepository.findByEmail(email);
    
    if (!user) {
      throw new AuthenticationError('Credenciais inválidas');
    }
    
    // Verificar senha (simulação)
    const isValidPassword = await bcrypt.compare(password, 'stored-password-hash');
    
    if (!isValidPassword) {
      log.auth('login_failed', undefined, false, {
        email,
        reason: 'invalid_password'
      });
      throw new AuthenticationError('Credenciais inválidas');
    }
    
    // Verificar se o usuário está ativo
    if (user && user.status !== 'active') {
      throw new AuthenticationError('Conta inativa. Entre em contato com o suporte.');
    }
    
    // Gerar token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    // Atualizar último login
    // TODO: Implementar com repositório real
    // await userRepository.updateLastLogin(user.id, req.ip);
    
    // Log da ação
    log.auth('login_success', user.id, true, {
      email: user.email,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    const response: ApiResponse = {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          emailVerified: user.emailVerified
        },
        token
      },
      message: 'Login realizado com sucesso'
    };
    
    res.json(response);
  });
  
  // 👤 Perfil do usuário
  profile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
      throw new AuthenticationError('Usuário não autenticado');
    }
    
    // Buscar usuário (simulação)
    // TODO: Implementar com repositório real
    const user = {
      id: userId,
      email: 'user@example.com',
      name: 'Usuário Exemplo',
      role: 'client',
      status: 'active',
      emailVerified: true,
      phoneVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    
    const response: ApiResponse = {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          status: user.status,
          emailVerified: user.emailVerified,
          phoneVerified: user.phoneVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    };
    
    res.json(response);
  });
  
  // 🔄 Refresh token
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
      throw new AuthenticationError('Token inválido');
    }
    
    // Buscar usuário (simulação)
    // TODO: Implementar com repositório real
    const user = {
      id: userId,
      email: 'user@example.com',
      role: 'client'
    };
    
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    
    // Gerar novo token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    const response: ApiResponse = {
      success: true,
      data: {
        token
      },
      message: 'Token renovado com sucesso'
    };
    
    res.json(response);
  });
  
  // 🚪 Logout
  logout = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    // Log da ação
    log.auth('logout', userId, true, {
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    const response: ApiResponse = {
      success: true,
      message: 'Logout realizado com sucesso'
    };
    
    res.json(response);
  });
  
  // 📧 Solicitar verificação de email
  requestEmailVerification = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    
    if (!userId) {
      throw new AuthenticationError('Usuário não autenticado');
    }
    
    // TODO: Implementar envio de email de verificação
    
    const response: ApiResponse = {
      success: true,
      message: 'Email de verificação enviado'
    };
    
    res.json(response);
  });
  
  // ✅ Verificar email
  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.body;
    
    if (!token) {
      throw new ValidationError('Token de verificação é obrigatório');
    }
    
    // TODO: Implementar verificação de email
    
    const response: ApiResponse = {
      success: true,
      message: 'Email verificado com sucesso'
    };
    
    res.json(response);
  });
  
  // 🔑 Solicitar reset de senha
  requestPasswordReset = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    
    if (!email) {
      throw new ValidationError('Email é obrigatório');
    }
    
    // TODO: Implementar envio de email de reset
    
    const response: ApiResponse = {
      success: true,
      message: 'Email de reset de senha enviado'
    };
    
    res.json(response);
  });
  
  // 🔄 Reset de senha
  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      throw new ValidationError('Token e nova senha são obrigatórios');
    }
    
    if (newPassword.length < 6) {
      throw new ValidationError('A nova senha deve ter pelo menos 6 caracteres');
    }
    
    // TODO: Implementar reset de senha
    
    const response: ApiResponse = {
      success: true,
      message: 'Senha alterada com sucesso'
    };
    
    res.json(response);
  });
} 