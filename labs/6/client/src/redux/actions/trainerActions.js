const addTrainer = name => ({
    type: 'ADD_TRAINER',
    payload: name
})

const deleteTrainer = id => ({
    type: 'DELETE_TRAINER',
    payload: id
})

const addToTrainerParty = (id, trainerId) => ({
    type: 'ADD_TO_TRAINER_PARTY',
    payload: {id, trainerId}
})

const removeFromTrainerParty = (id, trainerId) => ({
    type: 'REMOVE_FROM_TRAINER_PARTY',
    payload: {id, trainerId}
})

const selectTrainer = id => ({
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