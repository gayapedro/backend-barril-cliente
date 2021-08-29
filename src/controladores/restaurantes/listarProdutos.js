const knex = require('../../conexao');

const listarProdutos = async (req, res) => {
  const { id } = req.params;
  try {
    const produtos = await knex('produto')
      .where('restaurante_id', id)
      .andWhere('ativo', true);

    if (produtos.length === 0) {
      return res.status(404).json('Nenhum produto encontrado.');
    }

    res.json(produtos);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = listarProdutos;
