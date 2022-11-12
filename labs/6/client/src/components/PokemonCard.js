import React from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import '../constants/colors.css';
import { capitalize } from '../constants/helpers';
import { v4 as uuidv4 } from 'uuid';


const PokemonCard = ({id, name, sprites, types}) => {
    // TODO redux stuff here to see if this pokemon is in the party
    const inParty = false;
    const buttonText = inParty ? 'Release' : 'Catch' 
    return (
        <Col>
            <Card style={{ width: '18rem' }} className='my-3' >
                <Card.Img variant="top" src={sprites.official_artwork} alt={`${name}-artwork`} />
                <Card.Body>
                    <Card.Title>{capitalize(name)}</Card.Title>
                    <Card.Text>#{id}</Card.Text>
                    <Stack direction="horizontal" gap={2} className='mt-0'>
                        {types.map((type) => {
                            return (
                                <Badge className={`bg-${type}`} key={uuidv4()}>
                                    {capitalize(type)}
                                </Badge>
                            )
                        })}
                    </Stack>
                    <Button variant='outline-primary' className='my-2 mx-auto w-100'>{buttonText}</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PokemonCard;