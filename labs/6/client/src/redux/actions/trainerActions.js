export const addTrainer = ({name, trainerImageSrc}) => ({
    type: 'ADD_TRAINER',
    payload: {name, trainerImageSrc}
})

export const deleteTrainer = id => ({
    type: 'DELETE_TRAINER',
    payload: id
})

export const catchPokemon = (id, trainerId) => ({
    type: 'ADD_TO_TRAINER_PARTY',
    payload: {id, trainerId}
})

export const releasePokemon = (id, trainerId) => ({
    type: 'REMOVE_FROM_TRAINER_PARTY',
    payload: {id, trainerId}
})

export const selectTrainer = id => ({
    type: 'SELECT_TRAINER',
    payload: id
})

const actions = {
    addTrainer,
    deleteTrainer,
    catchPokemon,
    releasePokemon,
    selectTrainer
}

export default actions;