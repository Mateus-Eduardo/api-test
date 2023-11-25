const db = require("../config/database");

// Função para remover caracteres não numéricos de uma string
// function sanitizeString(value) {
//   return value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
// }

// Função para truncar uma string para um comprimento máximo
// function truncateString(value, maxLength) {
//   return value.substring(0, maxLength);
// }

// Método responsável por criar um novo 'Paciente': POST
exports.createPaciente = async (req, res) => {
  try {
    const {
      nome_paciente,
      cpf_paciente,
      telefone_paciente,
      celular_paciente,
      endereco_paciente,
      cidade_paciente,
    } = req.body;

    // Ajuste para remover caracteres não numéricos e limitar o comprimento
    // const cpfSanitized = sanitizeString(cpf_paciente);

    const cidadePaciente = Array.isArray(cidade_paciente) ? null : cidade_paciente;
    const telefonePaciente = Array.isArray(telefone_paciente) ? null : telefone_paciente;

    const { rows } = await db.query(
      "INSERT INTO paciente (nome_paciente, cpf_paciente, telefone_paciente, celular_paciente, endereco_paciente, cidade_paciente) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        nome_paciente,
        cpf_paciente,
        telefonePaciente,
        celular_paciente,
        endereco_paciente,
        cidadePaciente,
      ]
    );

    res.status(201).send({
      message: "Paciente adicionado com sucesso!",
      body: {
        paciente: {
          nome_paciente,
          cpf_paciente,
          telefone_paciente: telefonePaciente,
          celular_paciente,
          endereco_paciente,
          cidade_paciente: cidadePaciente
        },
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({
      error: "Erro interno do servidor ao criar um novo paciente.",
    });
  }
};

//=> Método responsável por listar todos os Pacientes: GET
exports.listAllPacientes = async (req, res) => {
  const response = await db.query(
    "SELECT * FROM paciente ORDER BY nome_paciente ASC"
  );
  res.status(200).send(response.rows);
};

//=> Método responsável por listar um determinado 'Paciente' por Id: GET Id
exports.findPacienteById = async (req, res) => {
  const pacienteId = req.params.id;
  const response = await db.query(
    "SELECT * FROM paciente WHERE id_paciente = $1",
    [pacienteId]
  );
  res.status(200).send(response.rows);
};

//=> Método responsável por atualizar um determinado 'Paciente' por Id: PUT Id
exports.UpdatePacienteById = async (req, res) => {
  const pacienteId = req.params.id;
  const {
      nome_paciente,
      cpf_paciente,      
      telefone_paciente,
      celular_paciente,
      endereco_paciente,
      cidade_paciente,
  } = req.body;

  const response = await db.query(
    "UPDATE paciente SET nome_paciente=$1, cpf_paciente=$2, cidade_paciente=$3, telefone_paciente=$4, celular_paciente=$5, endereco_paciente=$6 WHERE id_paciente = $7",
    [
      nome_paciente,
      cpf_paciente,      
      telefone_paciente,
      celular_paciente,
      endereco_paciente,
      cidade_paciente,
      pacienteId,
    ]
  );

  res.status(200).send({ message: "Paciente atualizado com sucesso" });
};

//=> Método responsável por deletar um determinado 'Paciente' por Id: DELETE Id
exports.deletePacienteById = async (req, res) => {
  const pacienteId = req.params.id;
  await db.query("DELETE FROM paciente WHERE id_paciente = $1", [pacienteId]);

  res.status(200).send({ message: "Paciente deletado com sucesso!!" });
};
