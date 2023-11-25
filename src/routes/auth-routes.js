const pool = require('../config/database');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/login', async (req, res) => {

  console.log(req.body);
  if(req.body.email !="joao@gmail.com")
  
  return res.json({
    erro: false ,
    mensagem: "login"
  })
});

  

module.exports = router;
