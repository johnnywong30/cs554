import { v4 as uuidv4 } from 'uuid';

const INITIAL_STATE = {
    party: [] // list of ids for current party
}

const pokemonReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        // add to current party
        case 'CATCH_POKEMON':
            return {
                ...state,
                party: [...state.party, payload]
            }
        // remove from current party
        case 'RELEASE_POKEMON':
            return {
                ...state,
                party: state.party.filter(id => id !== payload)
            }
        // switch party with different trainer's party
        case 'SWITCH_PARTY':
            return {
                ...state,
                party: payload
            }

        default:
            return state
    }
}

export default pokemonReducer;