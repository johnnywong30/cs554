const resolvers = require('../resolvers')

const typeDefs = `#graphql
    type Query {
        pokemonPage(pagenum: Int): [Pokemon]
        pokemonById(id: ID): Pokemon
    }

    type Ability {
        name: String!
        is_hidden: Boolean!
        slot: Int!
    }

    type Sprite {
        back_default: String
        back_female: String
        back_shiny: String
        back_shiny_female: String
        front_default: String
        front_female: String
        front_shiny: String
        front_shiny_female: String
        official_artwork: String
    }

    type Stat {
        base_stat: Int!
        name: String!
    }

    type Pokemon {
        id: ID!
        name: String!
        abilities: [Ability!]
        sprites: Sprite!
        stats: [Stat!]
        types: [String!]!
    }

`;

const Schema = {
    typeDefs,
    resolvers
}

module.exports = Schema;