const { restart } = require('nodemon');
const knex = require('../../conexao');

const obterProduto = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await knex('produto').where({ id }).first();
    return res.status(200).json(produto);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = obterProduto;
