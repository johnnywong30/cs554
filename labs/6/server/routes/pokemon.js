const express = require('express');
const { client } = require('../redis');
const { getPokemonPage, getPokemonById } = require('../data/pokemon');
const { checkPageNum, checkId } = require('../misc/validator');

const pokemonRouter = express.Router();

pokemonRouter
    .route('/page/:pagenum')
    .get(async (req, res) => {
        try {
            // did not find page in cache, fetch from API
            const pagenum = checkPageNum(req.params.pagenum.trim());
            const page = await getPokemonPage(pagenum);
            // add page to cache
            const pageString = JSON.stringify(page);
            await client.hSet('page', pagenum, pageString);
            return res.status(200).json(page);

        } catch (e) {
            return res.status(404).json({ error: e.message });
        }
    })

pokemonRouter
    .route('/:id')
    .get(async (req, res) => {
        try {
            const id = checkId(req.params.id.trim());
            const pokemon = await getPokemonById(id);
            // add to cache
            const pokemonString = JSON.stringify(pokemon);
            await client.hSet('pokemon', id, pokemonString);
            return res.status(200).json(pokemon);
        } catch (e) {
            return res.status(404).json({ error: e.message });
        }
    })

module.exports = pokemonRouter;