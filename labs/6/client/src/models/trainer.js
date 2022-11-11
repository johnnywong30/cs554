import { v4 as uuidv4 } from 'uuid';

export class Trainer {
    constructor(name) {
        this.id = uuidv4();
        this.name = name;
        this.party = [];
    }
}