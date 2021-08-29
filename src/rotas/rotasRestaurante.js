const express = require('express');
const listarRestaurantes = require('../controladores/restaurantes/listarRestaurantes');
const obterRestaurante = require('../controladores/restaurantes/obterRestaurante');
const listarProdutos = require('../controladores/restaurantes/listarProdutos');
const obterProduto = require('../controladores/restaurantes/obterProduto');
const listarCategorias = require('../controladores/restaurantes/listarCategorias');
const rotasRestaurantes = express();

rotasRestaurantes.get('/restaurantes', listarRestaurantes);
rotasRestaurantes.get('/restaurantes/:id', obterRestaurante);
rotasRestaurantes.get('/produtos/:id', listarProdutos);
rotasRestaurantes.get('/produto/:id', obterProduto);
rotasRestaurantes.get('/categorias', listarCategorias);

module.exports = rotasRestaurantes;
