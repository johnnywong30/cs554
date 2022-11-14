import React, { useState } from "react";
import TrainerImages from '../../../constants/images';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { useSelector, useDispatch } from "react-redux";
import { addTrainer } from "../../../redux/actions/trainerActions";
import { v4 as uuidv4 } from 'uuid';
import TrainerCard from "../../../components/TrainerCard";

const Trainers = () => {
    const { trainers } = useSelector(({trainer}) => trainer)
    const dispatch = useDispatch();
    const [ trainerName, setTrainerName ] = useState('');
    const trainerImgs = Object.keys(TrainerImages);

    const handleTrainerName = (e) => {
        const name = e.target.value
        setTrainerName(name) 
    }

    const createTrainer = (e) => {
        e.preventDefault()
        const trimmedName = trainerName.trim();
        if (trimmedName) {
            const lowered = trimmedName.toLowerCase();
            // get trainer image src
            const relatedTrainers = trainerImgs.filter(key => {
                const related = key.includes(lowered)
                return related
            })
            const imageList = relatedTrainers.length ? relatedTrainers : trainerImgs
            const imgName = imageList[Math.floor(Math.random() * imageList.length)]

            const trainer = {
                name: trimmedName,
                trainerImageSrc: imgName
            }
            // adds the trainer and also selects them
            dispatch(addTrainer(trainer))
            // clear trainer name in input
            setTrainerName('')
        }
        else {
            alert('Trainer name cannot be just spaces!')
        }
    }

    return (
        <Stack direction="vertical" gap={4} className='mx-auto py-4'>
                <Form className='mx-auto' onSubmit={createTrainer}>
                    <Stack direction="horizontal" gap={4} className='mx-auto'>
                        <Form.Group className="my-4" controlId="trainerName">
                            <Form.Label>Trainer Name</Form.Label>
                            <Form.Control className="my-1" type="text" value={trainerName} onChange={handleTrainerName} />
                            <Form.Text className="text-muted">
                                *Type in a name for a trainer from the games*
                            </Form.Text>
                        </Form.Group>
                        <Button className="mt-2" variant='outline-secondary' type='submit'>Create Trainer</Button>
                    </Stack>
                </Form>
                {
                    trainers.length <= 0 &&
                    <p className='h5 text-center text-muted'>
                        You don't have any trainers yet...
                    </p>
                }
                {
                    trainers &&
                    trainers.map((trainer) => {
                        return (
                            <React.Fragment key={uuidv4()}>
                                <TrainerCard {...trainer} />
                                <hr/>
                            </React.Fragment>
                        )
                    })
                }
        </Stack>
    )
}

export default Trainers;