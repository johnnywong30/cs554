import { Trainer } from "../../models/trainer";

const INITIAL_STATE = {
    trainers: [], // list of trainer objects
    selectedTrainer: '' // id of selected trainer
}

const trainerReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        // new trainer
        case 'ADD_TRAINER':
            const trainer = new Trainer(payload.name, payload.trainerImageSrc);
            return {
                ...state,
                trainers: [...state.trainers, trainer],
                selectedTrainer: trainer.id
            }

        // remove trainer
        case 'DELETE_TRAINER':
            return {
                ...state,
                // might need to fix
                trainers: state.trainers.filter(({id}) => id !== payload)
            }

        // add to party
        case 'ADD_TO_TRAINER_PARTY':
            return {
                ...state,
                trainers: state.trainers.map((trainer) => {
                    let updatedTrainer = trainer;
                    if (trainer.id === payload.trainerId) {
                        updatedTrainer = {
                            ...trainer,
                            party: [...trainer.party, payload.id]
                        } 
                    }
                    return updatedTrainer;
                })
            }
        // remove from party
        case 'REMOVE_FROM_TRAINER_PARTY':
            return {
                ...state,
                trainers: state.trainers.map((trainer) => {
                    let updatedTrainer = trainer;
                    if (trainer.id === payload.trainerId) {
                        updatedTrainer = {
                            ...trainer,
                            party: trainer.party.filter(id => id !== payload.id)
                        } 
                    }
                    return updatedTrainer;
                })
            }
        // select trainer to make mutations to
        case 'SELECT_TRAINER':
            return {
                ...state,
                selectedTrainer: payload
            }
        default:
            return state;
    }
}

export default trainerReducer;