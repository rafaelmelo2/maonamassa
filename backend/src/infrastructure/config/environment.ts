import dotenv from 'dotenv';
import path from 'path';

// Carrega o .env do diretório raiz
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

interface Config {
  // 🌐 Servidor
  nodeEnv: string;
  port: number;
  corsOrigin: string;
  
  // 🗄️ Banco de Dados
  database: {
    type: string;
    host: string;
    port: number;
    name: string;
    user: string;
    password: string;
    path?: string;
  };
  
  // 🔐 Autenticação
  jwt: {
    secret: string;
    expiresIn: string;
  };
  
  // 🔄 Cache
  redis: {
    url: string;
  };
  
  // 📧 Email
  email: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
  
  // 💳 Pagamentos
  payment: {
    stripe: {
      secretKey: string;
      webhookSecret: string;
    };
    mercadoPago: {
      accessToken: string;
    };
  };
  
  // 🔍 Monitoramento
  sentry: {
    dsn: string;
  };
  
  // 📊 Rate Limiting
  rateLimitWindow: number;
  rateLimitMaxRequests: number;
  
  // 🔐 Bcrypt
  bcryptSaltRounds: number;
}

export const config: Config = {
  nodeEnv: process.env['NODE_ENV'] || 'development',
  port: parseInt(process.env['PORT'] || '3000', 10),
  corsOrigin: process.env['FRONTEND_URL'] || 'http://localhost:3001',
  
  database: {
    type: process.env['DB_TYPE'] || 'sqlite',
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '5432', 10),
    name: process.env['DB_NAME'] || 'maonamassa',
    user: process.env['DB_USER'] || 'postgres',
    password: process.env['DB_PASSWORD'] || 'postgres',
    path: process.env['DB_PATH'] || './data/maonamassa.db',
  },
  
  jwt: {
    secret: process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-here',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '7d',
  },
  
  redis: {
    url: process.env['REDIS_URL'] || 'redis://localhost:6379',
  },
  
  email: {
    host: process.env['SMTP_HOST'] || 'smtp.gmail.com',
    port: parseInt(process.env['SMTP_PORT'] || '587', 10),
    user: process.env['SMTP_USER'] || '',
    password: process.env['SMTP_PASSWORD'] || '',
    from: process.env['EMAIL_FROM'] || 'noreply@maonamassa.com',
  },
  
  payment: {
    stripe: {
      secretKey: process.env['STRIPE_SECRET_KEY'] || '',
      webhookSecret: process.env['STRIPE_WEBHOOK_SECRET'] || '',
    },
    mercadoPago: {
      accessToken: process.env['MERCADOPAGO_ACCESS_TOKEN'] || '',
    },
  },
  
  sentry: {
    dsn: process.env['SENTRY_DSN'] || '',
  },
  
  rateLimitWindow: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000', 10),
  rateLimitMaxRequests: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100', 10),
  
  bcryptSaltRounds: parseInt(process.env['BCRYPT_SALT_ROUNDS'] || '12', 10),
}; 