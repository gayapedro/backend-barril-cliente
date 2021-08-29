const knex = require('../../conexao');

const obterRestaurante = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurante = await knex
      .select('*')
      .from('restaurante')
      .where({ usuario_id: id })
      .first();

    const imagemCategoria = await knex
      .column({ imagem_categoria: 'imagem' })
      .select()
      .from('categoria')
      .where({ id: restaurante.categoria_id })
      .first();

    restaurante.imagem_categoria = imagemCategoria.imagem_categoria;

    return res.status(200).json(restaurante);
  } catch (error) {
    console.log(error);
  }
};

module.exports = obterRestaurante;
