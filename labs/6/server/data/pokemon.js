const axios = require('axios');
const { checkPageNum, checkId } = require('../misc/validator');
const { client } = require('../redis');

const LIMIT = 50;

const getPage = pageNum => {
    const limit = LIMIT;
    const offset = (pageNum - 1) * limit;
    return { limit, offset };
}

const cleanPokemon = rawPokemonData => {
    const abilities = rawPokemonData?.abilities
                        .map(({ability, is_hidden, slot}) => {
                            return {
                                name: ability.name,
                                is_hidden,
                                slot
                            }
                        })
    
    const sprites = {
        back_default: rawPokemonData?.sprites?.back_default ? rawPokemonData?.sprites?.back_default : null,
        back_female:  rawPokemonData?.sprites?.back_female ? rawPokemonData?.sprites?.back_female : null,
        back_shiny:  rawPokemonData?.sprites?.back_shiny ? rawPokemonData?.sprites?.back_shiny : null,
        back_shiny_female:  rawPokemonData?.sprites?.back_shiny_female ? rawPokemonData?.sprites?.back_shiny_female : null,
        front_default:  rawPokemonData?.sprites?.front_default ? rawPokemonData?.sprites?.front_default : null,
        front_female:  rawPokemonData?.sprites?.front_female ? rawPokemonData?.sprites?.front_female : null,
        front_shiny:  rawPokemonData?.sprites?.front_shiny ? rawPokemonData?.sprites?.front_shiny : null,
        front_shiny_female:  rawPokemonData?.sprites?.front_shiny_female ? rawPokemonData?.sprites?.front_shiny_female : null,
        official_artwork: rawPokemonData?.sprites?.other["official-artwork"]?.front_default ? rawPokemonData?.sprites?.other["official-artwork"]?.front_default  : null 
    }

    const stats = rawPokemonData?.stats
                    .map(({base_stat, stat}) => {
                        return {
                            base_stat,
                            name: stat.name
                        }
                    })

    const types = rawPokemonData?.types.map(({type}) => type.name)

    const pokemon = {
        id: rawPokemonData.id,
        name: rawPokemonData.name,
        abilities,
        sprites,
        stats,
        types
    }
    return pokemon
}

const getPokemonPage = async pageNum => {
    const page = checkPageNum(pageNum.trim())
    const { limit, offset } = getPage(page);
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    const { data } = await axios.get(url);
    const pokemonPage = data.results;
    // attempt for the EXTRA CREDIT to pre-cache each pokemon per page for their artwork
    // without making additional axios/backend queries
    const cleanPokemonPage = await Promise.all(pokemonPage.map(async (pokemon) => {
        // get id from parsing url
        const id = checkId(pokemon.url.split('/').filter(Boolean).pop().trim());
        // check if in cache
        const isCached = await client.hExists('pokemon', id);
        let pokemonData;
        // if cached, then just get the data, including artwork, from cache
        if (isCached) {
            const pokemonString = await client.hGet('pokemon', id);
            pokemonData = JSON.parse(pokemonString);
        }
        // axios call from api when necessary and cache it for later
        else {
            pokemonData = await getPokemonById(id);
            const pokemonString = JSON.stringify(pokemonData);
            await client.hSet('pokemon', id, pokemonString)
        }
        return pokemonData;
    }))
    return cleanPokemonPage;
}

const getPokemonById = async id => {
    const pokemonId = checkId(id.trim());
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    const { data } = await axios.get(url);
    const pokemon = cleanPokemon(data);
    return pokemon;
}

const pokemon = {
    getPokemonPage,
    getPokemonById
}

module.exports = pokemon;