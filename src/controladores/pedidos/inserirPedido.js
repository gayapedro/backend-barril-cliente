const knex = require('../../conexao');

async function criarPedido(req, res) {
  const { id: id_cliente } = req.cliente;
  const { id_restaurante, produtos, subtotal, taxa_entrega, total } = req.body;

  if (
    !id_cliente ||
    !id_restaurante ||
    !produtos ||
    !subtotal ||
    !taxa_entrega ||
    !total
  ) {
    return res
      .status(400)
      .json('Informações faltando, o pedido não foi inserido.');
  }

  try {
    const conferirCliente = await knex('cliente').where('id', id_cliente);

    if (conferirCliente.length === 0) {
      return res.status(404).json('Cliente não encontrado.');
    }

    const novoPedido = {
      id_cliente: id_cliente,
      id_restaurante: id_restaurante,
      total_pedido: total,
      subtotal_pedido: subtotal,
      taxa_entrega: taxa_entrega,
    };
    const queryParaInserirPedido = await knex('pedidos')
      .insert(novoPedido)
      .returning('id');

    if (!queryParaInserirPedido) {
      return res.status(404).json('Erro ao analisar o pedido.');
    }

    const lista = [];

    for (const item of produtos) {
      const itemInserir = {
        id_produto: item.id,
        id_pedido: queryParaInserirPedido[0],
        quantidade: item.quantidade,
        valor: item.valor,
        valor_total: item.valor_total,
      };
      lista.push(itemInserir);
    }

    for (const item of lista) {
      console.log(item);

      const produtoExiste = await knex('produto').where('id', item.id_produto);

      if (produtoExiste.length === 0) {
        return res
          .status(404)
          .json('Erro produto(s) listado(s) não encontrado(s).');
      }

      const queryInserirProdutosPedidos = await knex('produtos_pedidos').insert(
        {
          id_produto: item.id_produto,
          id_pedido: item.id_pedido,
          quantidade: item.quantidade,
          valor: item.valor,
          valor_total: item.valor_total,
        }
      );

      console.log(queryInserirProdutosPedidos);

      if (queryInserirProdutosPedidos === 0) {
        return res.status(400).json('Erro ao inserir produto(s).');
      }
    }

    res.status(200).json('Pedido inserido com sucesso!');
  } catch (error) {
    res.status(400).json(error.message);
  }
}

module.exports = criarPedido;
