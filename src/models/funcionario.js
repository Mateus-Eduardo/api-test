const pool = require('../config/database');
const Sequelize = require('sequelize');


class Funcionario {
    constructor(id_funcionario, nome, email, senha) {
      this.id_funcionario = id_funcionario;
      this.nome_funcionario = nome_funcionario;
      this.email_funcionario = email_funcionario;
      this.senha_funcionario = senha_funcionario;
    }
  }
  
  module.exports = Funcionario;
  