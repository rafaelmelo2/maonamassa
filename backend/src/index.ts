import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import { v4 as uuidv4 } from 'uuid';

// Importações internas
import { config } from './infrastructure/config/environment';
import { log } from './infrastructure/config/logger';
import { errorHandler } from './infrastructure/middleware/errorHandler';
import { testConnection, runMigrations } from './infrastructure/database/connection';

// Rotas
import authRoutes from './presentation/routes/authRoutes';

const app = express();

// 🆔 Middleware para adicionar ID único às requisições
app.use((req, res, next) => {
  const requestId = uuidv4();
  req.headers['x-request-id'] = requestId;
  res.setHeader('X-Request-ID', requestId);
  next();
});

// 📊 Middleware de log de requisições
app.use((req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const userAgent = req.get('User-Agent');
    const logContext: any = {
      requestId: req.headers['x-request-id'] as string,
      duration,
      statusCode: res.statusCode,
      method: req.method,
      path: req.path,
      ip: req.ip
    };
    
    if (userAgent) {
      logContext.userAgent = userAgent;
    }
    
    log.request(req.method, req.path, res.statusCode, duration, logContext);
  });
  
  next();
});

// 🛡️ Middlewares de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID']
}));

// 📊 Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimitWindow,
  max: config.rateLimitMaxRequests,
  message: {
    success: false,
    error: {
      message: 'Muitas requisições. Tente novamente mais tarde.',
      code: 'RATE_LIMIT_EXCEEDED',
      statusCode: 429
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);

// 🗜️ Compressão
app.use(compression());

// 📝 Parsing de JSON
app.use(express.json({ 
  limit: '10mb',
  type: ['application/json', 'text/plain']
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb' 
}));

// 🎯 Rotas da API
app.use('/api/auth', authRoutes);

// 🏥 Rota de health check
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    version: '1.0.0'
  });
});

// 🔍 Rota de informações da API
app.get('/api', (_req, res) => {
  res.json({
    name: 'MãoNaMassa API',
    version: '1.0.0',
    environment: config.nodeEnv,
    endpoints: {
      auth: '/api/auth',
      health: '/health'
    }
  });
});

// 🚫 Rota 404
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Endpoint não encontrado',
      code: 'NOT_FOUND',
      statusCode: 404
    }
  });
});

// 🛠️ Middleware de tratamento de erros
app.use(errorHandler);

// 🚀 Função para inicializar o servidor
async function startServer() {
  try {
    log.info('🚀 Iniciando servidor MãoNaMassa...');
    
    // Testar conexão com banco de dados
    const dbConnected = await testConnection();
    if (!dbConnected) {
      log.error('❌ Falha na conexão com banco de dados');
      process.exit(1);
    }
    
    // Executar migrations
    if (config.nodeEnv !== 'test') {
      await runMigrations();
    }
    
    // Iniciar servidor
    app.listen(config.port, () => {
      log.info(`🚀 Servidor rodando na porta ${config.port}`);
      log.info(`📱 Frontend: ${config.corsOrigin}`);
      log.info(`🌍 Ambiente: ${config.nodeEnv}`);
      log.info(`🗄️ Banco: ${config.database.type}`);
      
      if (config.nodeEnv === 'development') {
        log.info(`📚 Documentação: http://localhost:${config.port}/api`);
      }
    });
    
  } catch (error) {
    log.error('❌ Falha ao iniciar servidor', error as Error);
    process.exit(1);
  }
}

// 🔧 Tratamento de sinais do processo
process.on('SIGTERM', () => {
  log.info('🔚 Recebido SIGTERM, encerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  log.info('🔚 Recebido SIGINT, encerrando servidor...');
  process.exit(0);
});

process.on('unhandledRejection', (reason, _promise) => {
  log.error('❌ Rejeição não tratada', reason as Error);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  log.error('❌ Exceção não tratada', error);
  process.exit(1);
});

// Iniciar o servidor
startServer();

export default app; 