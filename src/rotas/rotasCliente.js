const express = require('express');
const cadastro = require('../controladores/clientes/cadastro');
const login = require('../controladores/clientes/login');
const insereEndereco = require('../controladores/clientes/insereEndereco');
const obterCliente = require('../controladores/clientes/obterCliente');
const criarPedido = require('../controladores/pedidos/inserirPedido');
const validaToken = require('../intermediarios/validaToken');
const alteraCliente = require('../controladores/clientes/alteraCliente');
const rotasCliente = express();

rotasCliente.post('/cadastrar', cadastro);
rotasCliente.post('/logar', login);
rotasCliente.use(validaToken);
rotasCliente.put('/endereco', insereEndereco);
rotasCliente.put('/cliente', alteraCliente);
rotasCliente.get('/cliente', obterCliente);

rotasCliente.post('/pedidos', criarPedido);

module.exports = rotasCliente;
