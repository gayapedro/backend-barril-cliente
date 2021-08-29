const knex = require('../../conexao');

const obterCliente = async (req, res) => {
  return res.status(200).json(req.cliente);
};

module.exports = obterCliente;
