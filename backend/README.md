# 🔧 MãoNaMassa - Backend API

## 📋 Sobre

Backend da plataforma MãoNaMassa desenvolvido em **Node.js** com **TypeScript** seguindo os princípios de **Clean Architecture**.

## 🚀 Tecnologias

- **Node.js** + **TypeScript** - Runtime e linguagem
- **Express.js** - Framework web
- **Knex.js** - Query builder para banco de dados
- **SQLite/PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Winston** - Sistema de logs
- **Bcrypt** - Hash de senhas
- **Express-validator** - Validação de dados
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing

## 🏗️ Arquitetura

```
src/
├── domain/           # Entidades e regras de negócio
│   ├── entities/     # Entidades do domínio
│   └── repositories/ # Interfaces dos repositórios
├── data/            # Camada de dados
│   └── repositories/ # Implementações dos repositórios
├── infrastructure/  # Configurações e serviços externos
│   ├── config/      # Configurações (env, logger)
│   ├── database/    # Conexão e migrations
│   └── middleware/  # Middlewares (auth, error handling)
├── presentation/    # Camada de apresentação
│   ├── controllers/ # Controladores
│   └── routes/      # Rotas da API
└── types/          # Tipos TypeScript
```

## 🔧 Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar ambiente
```bash
cp ../env.example .env
# Editar variáveis de ambiente
```

### 3. Executar migrations
```bash
npm run migrate
```

### 4. Iniciar servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

## 📊 Endpoints

### 🔐 Autenticação (`/api/auth`)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/register` | Registrar usuário |
| POST | `/login` | Login |
| POST | `/logout` | Logout |
| GET | `/profile` | Perfil do usuário |
| POST | `/refresh-token` | Renovar token |
| POST | `/verify-email` | Verificar email |
| POST | `/request-password-reset` | Solicitar reset de senha |
| POST | `/reset-password` | Resetar senha |

### 🏥 Sistema

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Status da API |
| GET | `/api` | Informações da API |

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Inclua o token no header:

```
Authorization: Bearer <token>
```

### Roles de usuário:
- `admin` - Administrador
- `professional` - Profissional
- `client` - Cliente

## 📝 Logs

O sistema utiliza **Winston** para logs estruturados:

- **Development**: Logs coloridos no console
- **Production**: Logs em arquivos JSON

### Tipos de log:
- `info` - Informações gerais
- `warn` - Avisos
- `error` - Erros
- `debug` - Debug (apenas desenvolvimento)

## 🗄️ Banco de Dados

### Migrations

```bash
# Executar migrations
npm run migrate

# Rollback migrations
npm run migrate:rollback

# Criar nova migration
npm run migrate:create <nome>
```

### Seeds

```bash
# Executar seeds
npm run seed

# Criar nova seed
npm run seed:create <nome>
```

## 🛡️ Segurança

### Middlewares implementados:
- **Helmet** - Headers de segurança
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Limite de requisições
- **Input Validation** - Validação de entrada
- **Error Handling** - Tratamento de erros

### Boas práticas:
- Senhas com hash bcrypt
- Tokens JWT seguros
- Validação de entrada
- Sanitização de dados
- Logs de segurança

## 📊 Monitoramento

### Health Check
```bash
GET /health
```

### Logs estruturados
- Contexto de requisições
- Métricas de performance
- Rastreamento de erros
- Logs de autenticação

## 🚀 Deploy

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t maonamassa-backend .
docker run -p 3000:3000 maonamassa-backend
```

## 📋 Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor em desenvolvimento |
| `npm run build` | Build para produção |
| `npm start` | Servidor em produção |
| `npm run migrate` | Executar migrations |
| `npm run seed` | Executar seeds |
| `npm test` | Executar testes |
| `npm run lint` | Linter TypeScript |

## 🔧 Configuração de Ambiente

### Variáveis principais:
- `NODE_ENV` - Ambiente (development/production)
- `PORT` - Porta do servidor
- `DB_TYPE` - Tipo do banco (sqlite/postgres)
- `JWT_SECRET` - Chave secreta JWT
- `FRONTEND_URL` - URL do frontend

Ver `env.example` para configuração completa.

## 📊 Status do Projeto

### ✅ Implementado:
- Arquitetura limpa completa
- Sistema de autenticação
- Banco de dados com migrations
- Logs estruturados
- Middlewares de segurança
- Tratamento de erros
- Validação de dados

### 🔄 Em desenvolvimento:
- Testes automatizados
- Documentação da API
- Monitoramento avançado
- Cache com Redis

### 📋 Próximos passos:
- Implementar demais controladores
- Adicionar sistema de upload
- Integrar pagamentos
- Implementar notificações

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua feature branch
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. 