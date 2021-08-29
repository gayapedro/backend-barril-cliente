const yup = require('yup');
const bcrypt = require('bcrypt');
const knex = require('../../conexao');
const jwt = require('jsonwebtoken');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
setLocale(pt);

const loginCliente = async (req,res) => {
    const schema = yup.object().shape({
        email:yup.string().email().required(),
        senha:yup.string().required()
    });

    const {email,senha} = req.body;
    try {
        await schema.validate(req.body);
        
        const selecionaCliente = await knex('cliente')
        .where('email', email);

        if(!selecionaCliente.length){
            return res.status(400).json('Usuário ou senha inválidos');
        }
        
        const cliente = selecionaCliente[0];
        const senhaVerificada = await bcrypt.compare(senha, cliente.senha);

        if (!senhaVerificada) {
            return res.status(400).json('Usuário ou senha inválidos!');
          }

        const token = jwt.sign({id: cliente.id}, process.env.JWT_KEY);

        return res.status(200).json({
            cliente : {
              id: cliente.id,
              nome: cliente.nome,
              email: cliente.email
            },
            token: token});

    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = loginCliente;