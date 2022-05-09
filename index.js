const app = require('./app');
const routes = require('./routes/index');
const { HTTP_INTERNAL_SERVER_ERROR_STATUS } = require('./utils/status-HTTP');
require('dotenv').config();

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.use(routes);

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });

  return res.status(HTTP_INTERNAL_SERVER_ERROR_STATUS).json({ message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
