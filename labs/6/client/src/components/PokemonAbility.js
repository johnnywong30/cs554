import React from "react";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

import { capitalize } from '../constants/helpers';

const PokemonAbility = ({name, is_hidden, slot}) => {
    return (
        <Card style={{width: '12rem'}}>
            <Card.Body>
                <Card.Title style={{color: '#007acc'}}>{capitalize(name)}</Card.Title>
                <Card.Text>Slot {slot}</Card.Text>
                {
                    is_hidden &&
                    <Badge className='bg-light text-dark'>Hidden Ability</Badge>
                }
            </Card.Body> 
        </Card>
    )
} 

export default PokemonAbility;