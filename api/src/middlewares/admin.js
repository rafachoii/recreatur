const express = require('express');
const authenticate = require('../middlewares/auth'); 
const adminOnly = require('../middlewares/admin'); 

const app = express();

app.use(express.json());

app.get('/admin', authenticate, adminOnly, (req, res) => {
  res.send('Página de Administrador - Acesso permitido');
});

module.exports = app;
