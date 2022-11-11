import { gql } from "@apollo/client";

const Query = {
    GET_POKEMON_PAGE: gql`
        query PokemonPage($pagenum: Int) {
            pokemonPage(pagenum: $pagenum) {
                id
                name
                abilities {
                    name
                    is_hidden
                    slot
                }
                sprites {
                    back_default
                    back_female
                    back_shiny
                    back_shiny_female
                    front_default
                    front_female
                    front_shiny
                    front_shiny_female
                    official_artwork
                }
                stats {
                    base_stat
                    name
                }
                types
            }
        }
    `,
    GET_POKEMON: gql`
        query PokemonById($id: ID) {
            pokemonById(id: $id) {
                id
                name
                abilities {
                    name
                    is_hidden
                    slot
                }
                sprites {
                    back_default
                    back_female
                    back_shiny
                    back_shiny_female
                    front_default
                    front_female
                    front_shiny
                    front_shiny_female
                    official_artwork
                }
                stats {
                    base_stat
                    name
                }
                types
            }
        }
    `,
}

const constants = {
    Query
}

export default constants;