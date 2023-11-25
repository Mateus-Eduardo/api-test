const pool = require('../config/database');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Funcionario = require ('../models/funcionario')

//METODO PARA CADASTRAR FUNCIONARIO NO BANCO
router.post('/Cadastrar', async (req, res) => {
  try {
    // Verifique se os campos necessários estão presentes no corpo da requisição
    if (!req.body.nome_funcionario || !req.body.email_funcionario || !req.body.senha_funcionario) {
      return res.status(400).json({ error: 'Dados incompletos na requisição' });
    }

    // Faça o hash da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(req.body.senha_funcionario, 6);

    // Insira o novo funcionário na tabela
    const { rows } = await pool.query(
      'INSERT INTO funcionario (nome_funcionario, email_funcionario, senha_funcionario) VALUES ($1, $2, $3) RETURNING *',
      [req.body.nome_funcionario, req.body.email_funcionario, hashedPassword]
    );

    res.json({ users: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao processar a requisição' });
  }
});



router.get('/Listar', async (req, res) => {
  return res.json({
    erro: false,
    mensagem: "Listar Usuários"
  });
});

router.post('/login', async (req, res) => {
  console.log(req.body);

  if (req.body.email_funcionario !== "mateus@gmail.com") {
    return res.status(400).json({
      erro: true,
      mensagem: "Usuário incorreto"
    });
  } else if (!(await bcrypt.compare(req.body.senha_funcionario, "321654"))) {
    return res.status(400).json({
      erro: true,
      mensagem: "Senha incorreta"
    });
  } else {
    return res.json({
      erro: false,
      mensagem: "Login bem-sucedido"
    });
  }
});
module.exports = router;
