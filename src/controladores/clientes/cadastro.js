const yup = require('yup');
const bcrypt = require('bcrypt');
const knex = require('../../conexao');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
require('yup-phone');
setLocale(pt);

const cadastraCliente = async (req, res) => {
  const schema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required(),
    telefone : yup.string().phone('BR')
  });

  const cliente = req.body;

  try {
    await schema.validate(req.body);

    const verificaEmail = await knex('cliente').where('email', cliente.email);

    if (verificaEmail.length) {
      return res.status(400).json('O email informado já possui cadastro.');
    }

    const { senha: senhaAntiga, ...resto } = cliente;
    const senha = await bcrypt.hash(senhaAntiga, 10);
    const novoCliente = { ...resto, senha };
    const adicionaCliente = await knex('cliente').insert(novoCliente);

    if (!adicionaCliente.rowCount) {
      return res
        .status(400)
        .json('Não foi possível realizar o cadastro do Cliente.');
    }

    return res.status(200).json('Cliente cadastrado com sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = cadastraCliente;
