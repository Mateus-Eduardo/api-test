
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/paciente.controller');

// => Definindo as rotas do CRUD - 'Paciente'

// => Rota responsável por criar um novo Paciente: (Post): localhost:3000/api/pacientes
router.post('/pacientes', pacienteController.createPaciente);

// => Rota responsável por listar todos os pacientes: (GET): localhost:3000/api/pacientes
router.get('/pacientes', pacienteController.listAllPacientes);

// = > Rota responsável por listar um pacientes por Id: (GET): localhost:3000/api/pacientes/Id
router.get('/pacientes/:id', pacienteController.findPacienteById);

// = > Rota responsável por atualizar um determinado pacientes por Id: (PUT): localhost:3000/api/pacientes/Id
router.put('/pacientes/:id', pacienteController.UpdatePacienteById);

// = > Rota responsável por deletar/excluir um determinado pacientes por Id: (PUT): localhost:3000/api/pacientes/Id
router.delete('/pacientes/:id', pacienteController.deletePacienteById);


module.exports = router;

