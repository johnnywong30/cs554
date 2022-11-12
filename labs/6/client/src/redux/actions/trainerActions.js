export const addTrainer = name => ({
    type: 'ADD_TRAINER',
    payload: name
})

export const deleteTrainer = id => ({
    type: 'DELETE_TRAINER',
    payload: id
})

export const addToTrainerParty = (id, trainerId) => ({
    type: 'ADD_TO_TRAINER_PARTY',
    payload: {id, trainerId}
})

export const removeFromTrainerParty = (id, trainerId) => ({
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
    addToTrainerParty,
    removeFromTrainerParty,
    selectTrainer
}

export default actions;