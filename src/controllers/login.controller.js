import { _router, router } from "../app.js";
import Funcionario from "../models/funcionario.js";

const LoginService = require("../services/LoginService.js");
const jwtService = require("../utils/jwtService.js");
const express = require('express');
const db = require("../config/database");
const app = express();

app.use(express.json());

