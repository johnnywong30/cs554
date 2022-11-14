import { v4 as uuidv4 } from 'uuid';

export class Trainer {
    constructor(name, trainerImageSrc) {
        this.id = uuidv4();
        this.name = name;
        this.party = [];
        this.trainerImageSrc = trainerImageSrc
    }
}