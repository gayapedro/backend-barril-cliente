const yup = require('yup');
const bcrypt = require('bcrypt');
const knex = require('../../conexao');
const { uploadImagem, excluiImagem } = require('../../upload/uploads');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
require('yup-phone');
setLocale(pt);

const alteraCliente = async (req, res) => {
  const { id } = req.cliente;
  const schema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string(),
    telefone: yup.string().phone('BR'),
    endereco: yup.string().required(),
    cep: yup.string().length(9).required(),
    complemento: yup.string().required(),
    imagem: yup.string(),
  });

  const userBody = req.body;

  try {
    await schema.validate(req.body);
    const verificaEmail = await knex('cliente')
      .where('email', userBody.email)
      .andWhere('id', '!=', id);

    if (verificaEmail.length) {
      return res.status(400).json('O email informado já possui cadastro.');
    }
    const imagemNome = `cliente/${id}`;
    if (userBody.imagem) {
      await excluiImagem(imagemNome, res);
      const linkImagem = await uploadImagem(imagemNome, userBody.imagem, res);
      userBody.imagem = linkImagem.replace('.co', '.in');
    }
    if (userBody.senha) {
      const senhaNova = await bcrypt.hash(userBody.senha, 10);
      userBody.senha = senhaNova;
      const alterarUsuario = await knex('cliente')
        .update(userBody)
        .where('id', id);
      if (alterarUsuario !== 1) {
        return res
          .status(400)
          .json('Não foi possível atualizar o cadastro do cliente.');
      }
    } else {
      const alterarUsuario = await knex('cliente')
        .update(userBody)
        .where('id', id);
      if (alterarUsuario !== 1) {
        return res
          .status(400)
          .json('Não foi possível atualizar o cadastro do cliente.');
      }
    }

    res.status(200).json('Cliente atualizado com sucesso.');
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = alteraCliente;
