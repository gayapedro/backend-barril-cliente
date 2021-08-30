require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rotasCliente = require('./rotas/rotasCliente');
const rotasRestaurantes = require('./rotas/rotasRestaurante');
const app = express();

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(rotasCliente);
app.use(rotasRestaurantes);
app.listen(process.env.PORT || 3000);
