import React, { useState, useEffect }from 'react';
import { Grid, GridItem, Spinner, Center, HStack } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCharacterPage } from '../../../services/api';

import Card from '../../../components/Card';
import Pagination from '../../../components/Pagination';


const Characters = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { page } = useParams();
    const [ currPage, setCurrPage ] = useState(-1);
    const [ hasNextPage, setHasNextPage ] = useState(false);
    // todo search
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let pagenum;
                if (page && Number(page) >= 1 && !Number.isNaN(Number(page)) && Number.isInteger(Number(page))) {
                    pagenum = Number(page);
                    setCurrPage(pagenum);
                }
                // todo: navigate to 404
                // else navigate('/characters/page/1');
                const characters = await getCharacterPage(pagenum);
                setData(characters);
                setLoading(false);
                console.log(characters);
            } catch (e) {
                console.log(e);
            }
        }
        const checkNextPage = async () => {
            try {
                let pagenum;
                if (page && Number(page) >= 1 && !Number.isNaN(Number(page)) && Number.isInteger(Number(page))) {
                    pagenum = Number(page);
                }
                const nextPage = await getCharacterPage(pagenum + 1);
                if (nextPage.length > 0) setHasNextPage(true);
                else setHasNextPage(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        checkNextPage();
    }, [page])

    
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
            <Center paddingBottom={12}>
                <HStack spacing={2}>
                    {currPage > 1 
                        && 
                        <Pagination to={`/characters/page/${currPage - 1}`} text='Previous Page'/>
                    }
                    {hasNextPage
                        && 
                        <Pagination to={`/characters/page/${currPage + 1}`} text='Next Page'/>
                    }
                </HStack>
            </Center>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {data.map((character) => {
                    const { id, name, description, thumbnail } = character;
                    return (
                        <Link key={id} to={`/characters/${id}`}>
                            <GridItem w='100%' h='100%'>
                                <Card title={name} description={description} thumbnail={thumbnail} />
                            </GridItem>
                        </Link>
                    )
                })}
            </Grid>
        </>
    )

    
}

export default Characters;