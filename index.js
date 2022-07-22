const app = require('./app');

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT || 3000, () => {
  console.log(`Escutando na porta ${process.env.PORT || 3000}`);
});
