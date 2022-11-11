import React from "react";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Stack direction="vertical" gap={3} className='mx-auto py-4'>
            <p className='h5 mx-auto'>
                This Pokemon Lab utilizes React, Redux, Redis, Express, and GraphQL to display information from
                the <a href='https://pokeapi.co/'>pokeapi</a> and create trainers to catch them.
            </p>
            <Button variant="info" as={Link} to='/trainers' className='w-25 mx-auto'>Get Started</Button>
            <Button variant="secondary" as={Link} to='/pokemon/page/1' className='w-25 mx-auto'>View Pokemon</Button>
        </Stack>
    )
}

export default Home;