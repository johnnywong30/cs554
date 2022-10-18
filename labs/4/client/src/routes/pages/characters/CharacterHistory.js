import React, { useState, useEffect }from 'react';
import { Grid, GridItem, Spinner, Center, Text } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { getCharacterHistory } from '../../../services/api';
import { v4 as uuidv4 } from 'uuid';

import Card from '../../../components/Card';

const CharacterHistory = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const characters = await getCharacterHistory();
                setData(characters);
                setLoading(false);
                console.log(characters);
            } catch (e) {
                console.log(e);
                navigate('/error');
            }
        }
        fetchData();
    }, [])

    
    if (loading) {
        return (
            <Center padding={16}>
                <Spinner 
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='purple.500'
                    size='xl'
                    boxSize='125px'
                />
            </Center>
        )
    }

    return (
        <>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {data.map((character) => {
                    const { id, name, description, thumbnail } = character;
                    return (
                        <Link key={uuidv4()} to={`/characters/${id}`}>
                            <GridItem w='100%' h='100%'>
                                <Card title={name} description={description} thumbnail={thumbnail} />
                            </GridItem>
                        </Link>
                    )
                })}
                {data.length <= 0 &&
                    <GridItem w='100%' h='100%'>
                        <Text size='sm'>No characters in history</Text>
                    </GridItem>
                }
            </Grid>
        </>
    )

    
}

export default CharacterHistory;