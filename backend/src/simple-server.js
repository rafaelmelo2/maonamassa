const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Servidor backend funcionando!'
  });
});

app.get('/api', (req, res) => {
  res.json({
    name: 'MãoNaMassa API',
    version: '1.0.0',
    status: 'running',
    message: 'Backend está funcionando corretamente'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📋 Health: http://localhost:${PORT}/health`);
  console.log(`📚 API: http://localhost:${PORT}/api`);
}); 