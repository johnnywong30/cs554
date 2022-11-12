import React, { useState } from "react";
import TrainerImages from '../../../constants/images';
import Image from "react-bootstrap/Image";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { useSelector, useDispatch } from "react-redux";

const Trainers = () => {
    const dispatch = useDispatch();
    const [ trainerName, setTrainerName ] = useState('');
    console.log(TrainerImages)
    const trainers = Object.entries(TrainerImages)
    return (
        <Stack direction="vertical" gap={4} className='mx-auto'>
                <Form className='mx-auto'>
                    <Stack direction="horizontal" gap={4} className='mx-auto'>
                        <Form.Group className="my-4" controlId="trainerName">
                            <Form.Label>Trainer Name</Form.Label>
                            <Form.Control type="text" value={trainerName} />
                            <Form.Text className="text-muted">
                                Type in a name for a trainer from the games...
                            </Form.Text>
                        </Form.Group>
                        <Button className="mt-2" variant='outline-info' type='submit'>Create Trainer</Button>
                    </Stack>
                </Form>
        </Stack>
    )
}

export default Trainers;