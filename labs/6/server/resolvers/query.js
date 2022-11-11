const { client } = require('../redis');
const { checkPageNum, checkId } = require('../misc/validator');
const { getPokemonPage, getPokemonById } = require('../data/pokemon');

const Query = {
    pokemonPage: async (_, args) => {
        const { pagenum } = args;
        const pageNum = checkPageNum(pagenum.toString());
        // check if in cache
        const isCached = await client.hExists('page', pageNum);
        let page;
        if (isCached) {
            const pageString = await client.hGet('page', pageNum);
            page = JSON.parse(pageString);
        } else {
            page = await getPokemonPage(pageNum);
            const pageString = JSON.stringify(page);
            await client.hSet('page', pageNum, pageString);
        }
        return page;

    },
    pokemonById: async(_, args) => {
        const id = checkId(args.id.trim());
        // check if in cache
        const isCached = await client.hExists('pokemon', id);
        let pokemon;
        if (isCached) {
            const pokemonString = await client.hGet('pokemon', id);
            pokemon = JSON.parse(pokemonString);
        } else {
            pokemon = await getPokemonById(id);
            const pokemonString = JSON.stringify(pokemon);
            await client.hSet('pokemon', id, pokemonString);
        }
        return pokemon;
    }
}

module.exports = Query