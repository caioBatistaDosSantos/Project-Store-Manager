const express = require('express');
const routes = require('./routes/index');
const { HTTP_INTERNAL_SERVER_ERROR_STATUS } = require('./utils/status-HTTP');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });

  return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({ message: err.message });
});

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
