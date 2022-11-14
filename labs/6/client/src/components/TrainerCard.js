import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import { deleteTrainer, selectTrainer } from "../redux/actions/trainerActions";
import TrainerImages from '../constants/images/index';
import '../constants/trainer.css'
import TrainerPokemonCard from "./TrainerPokemonCard";
import { capitalize } from "../constants/helpers";

const TrainerCard = ({id, name, party, trainerImageSrc}) => {
    const { selectedTrainer } = useSelector(({trainer}) => trainer)
    const dispatch = useDispatch();
    // const [ trainerName, setTrainerName ] = useState('');
    // const trainerImgs = Object.keys(TrainerImages);

    const handleDelete = () => {
        dispatch(deleteTrainer(id))
    }

    const handleSelect = () => {
        if (selectedTrainer !== id) {
            dispatch(selectTrainer(id));
        }
    }
    return (
        <Stack direction="horizontal" gap={4} className='mx-auto'>
            {/* Trainer pic */}
            <Stack direction="vertical" gap={1} className='my-auto' >
                <Image src={TrainerImages[trainerImageSrc]} alt={`${id} Trainer Image`} thumbnail />
                <Badge className='bg-warning text-dark'>{capitalize(name)}</Badge> 
                <Button className='trainer-btn' type='button' variant='outline-secondary' onClick={handleSelect}>{selectedTrainer === id ? 'Selected' : 'Select'}</Button>
                {
                    selectedTrainer !== id &&
                    <Button className='trainer-btn' type='button' variant='outline-danger' onClick={handleDelete}>Delete</Button>
                }
            </Stack>
            {/* Trainer party */}
            <Stack direction="vertical" gap={1}>
                {/* First 3 */}
                <Stack direction="horizontal" gap={2}>
                    {
                        party.slice(0, 3).map(id => {
                            return (
                                <React.Fragment key={uuidv4()}>
                                    <TrainerPokemonCard id={id} />
                                </React.Fragment>
                            )
                        })
                    }
                </Stack>
                {
                    party.length > 3 &&
                    <Stack direction="horizontal" gap={2}>
                        {
                        party.slice(3).map(id => {
                            return (
                                <React.Fragment key={uuidv4()}>
                                    <TrainerPokemonCard id={id} />
                                </React.Fragment>
                            )
                        })
                    }
                    </Stack>
                }
            </Stack>
        </Stack>
    )
}

export default TrainerCard;