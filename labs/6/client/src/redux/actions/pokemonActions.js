export const catchPokemon = id => ({
    type: 'CATCH_POKEMON',
    payload: id
})

export const releasePokemon = id => ({
    type: 'RELEASE_POKEMON',
    payload: id
})

export const updateParty = party => ({
    type: 'SWITCH_PARTY',
    payload: party
})

const actions = {
    catchPokemon,
    releasePokemon,
    updateParty
}

export default actions;