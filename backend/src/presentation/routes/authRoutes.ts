import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { requireAuth } from '../../infrastructure/middleware/authMiddleware';
import { body, validationResult } from 'express-validator';
import { ValidationError } from '../../infrastructure/middleware/errorHandler';

const router = Router();
const authController = new AuthController();

// 🛡️ Middleware de validação
const validateRequest = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg).join(', ');
    throw new ValidationError(errorMessages);
  }
  next();
};

// 📝 Validações para registro
const registerValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('name').notEmpty().withMessage('Nome é obrigatório'),
  body('phone').optional().isMobilePhone('pt-BR').withMessage('Telefone inválido'),
  body('role').optional().isIn(['client', 'professional']).withMessage('Tipo de usuário inválido')
];

// 🔑 Validações para login
const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
];

// 🔄 Validações para reset de senha
const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token é obrigatório'),
  body('newPassword').isLength({ min: 6 }).withMessage('Nova senha deve ter pelo menos 6 caracteres')
];

// 📧 Validações para solicitação de reset
const requestResetValidation = [
  body('email').isEmail().withMessage('Email inválido')
];

// 🎯 Rotas públicas
router.post('/register', registerValidation, validateRequest, authController.register);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/request-password-reset', requestResetValidation, validateRequest, authController.requestPasswordReset);
router.post('/reset-password', resetPasswordValidation, validateRequest, authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);

// 🔒 Rotas protegidas
router.get('/profile', requireAuth, authController.profile);
router.post('/refresh-token', requireAuth, authController.refreshToken);
router.post('/logout', requireAuth, authController.logout);
router.post('/request-email-verification', requireAuth, authController.requestEmailVerification);

export default router; 