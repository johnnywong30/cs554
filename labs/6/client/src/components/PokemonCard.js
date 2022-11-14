import React from "react";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useSelector, useDispatch } from 'react-redux'
import { catchPokemon, releasePokemon } from "../redux/actions/trainerActions";

import { capitalize } from '../constants/helpers';
import '../constants/pokemon.css';

const PokemonCard = ({id, name, sprites, types, inTrainerParty=false }) => {
    const dispatch = useDispatch();
    // const party = useSelector(({pokemon}) => pokemon.party);
    const { trainers, selectedTrainer } = useSelector(({trainer}) => trainer);
    const trainer = trainers.find(trainer => trainer.id === selectedTrainer);
    const party = trainer ? trainer.party : [];
    const inParty = party.includes(id);

    const handleCatch = () => {
        if (selectedTrainer) {
            dispatch(catchPokemon(id, selectedTrainer));
        }
    }

    const handleRelease = () => {
        if (selectedTrainer) {
            dispatch(releasePokemon(id, selectedTrainer));
        }
    }

    const generateButton = () => {
        let button;
        if (selectedTrainer && party.length < 6 && !inTrainerParty) {
            button = (
                <Button 
                    variant='outline-primary' 
                    className='my-2 mx-auto w-100'
                    onClick={inParty ? handleRelease : handleCatch}
                >
                    {inParty ? 'Release' : 'Catch'}
                </Button>
            )
        }
        else if (selectedTrainer && party.length >= 6 && inParty && !inTrainerParty) {
            button = (
                <Button 
                    variant='outline-primary' 
                    className='my-2 mx-auto w-100'
                    onClick={handleRelease}
                >
                    Release
                </Button>
            )
        }
        else {
            button = (
                <Button 
                    variant='outline-primary' 
                    className='my-2 mx-auto w-100'
                >
                    Party Full
                </Button>
            )
        }
        return button;
    }

    return (
        <Col>
            <Card style={{ width: '18rem' }} className='my-3 p-2 mx-auto'>
                <Card.Body as={Link} to={`/pokemon/${id}`} className='p-3 cardlink'>
                    <Card.Img variant="top" src={sprites.official_artwork} alt={`${name}-artwork`} />
                    <Card.Title>{capitalize(name)}</Card.Title>
                    <Card.Text>#{id}</Card.Text>
                    <Stack direction="horizontal" gap={2} className='mt-0'>
                        {types.map((type) => {
                            return (
                                <Badge className={`bg-${type} type-badge`} key={uuidv4()}>
                                    {capitalize(type)}
                                </Badge>
                            )
                        })}
                    </Stack>
                </Card.Body>
                {
                    selectedTrainer && !inTrainerParty ?
                    generateButton() :
                    <></>
                }
            </Card>
        </Col>
    )
}

export default PokemonCard;