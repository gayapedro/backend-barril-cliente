const yup = require('yup');
const knex = require('../../conexao');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
setLocale(pt);

const insereEndereco = async (req, res) => {
  const schema = yup.object().shape({
    endereco: yup.string().required(),
    cep: yup.string().length(9).required(),
    complemento: yup.string().required(),
  });

  const { endereco, cep, complemento } = req.body;

  try {
    await schema.validate(req.body);
    await knex('cliente')
      .update({ endereco, cep, complemento })
      .where({ id: req.cliente.id });
    return res.status(200).json('Cliente atualizado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = insereEndereco;
