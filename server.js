

const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Aplicação sendo executada na porta:', port);
  console.log(`Rota responsável por criar um novo Paciente: (Post): localhost:3000/api/pacientes`);
  console.log(`Rota para cadastrar, editar e deletar Funcionario: localhost:3000/api/funcionarios`);
  console.log(`Rota para login de  Funcionario: localhost:3000/api/auth/login`);

});