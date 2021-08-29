const knex = require('../../conexao');

async function listarRestaurantes(req, res){
    try {
        const restaurantes = await knex('restaurante');

        if(restaurantes.length === 0){
            return res.status(404).json('Nenhum restaurante encontrado.');
        }

        res.json(restaurantes);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = listarRestaurantes;