import React, { useState, useEffect }from 'react';
import { Grid, GridItem, Spinner, Center, VStack, HStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCharacterPage, searchCharacters } from '../../../services/api';

import Card from '../../../components/Card';
import Pagination from '../../../components/Pagination';


const Characters = () => {
    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const { page } = useParams();
    const [ currPage, setCurrPage ] = useState(-1);
    const [ hasNextPage, setHasNextPage ] = useState(false);
    const [ searchTerm, setSearchTerm ] = useState('');
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
                else navigate('/error');
                const characters = await getCharacterPage(pagenum);
                if (characters.length <= 0) navigate('/error');
                else {
                    setData(characters);
                    setLoading(false);
                    console.log(characters);
                }
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
    }, [page, navigate])

    const handleSearchTerm = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        let characters;
        // setLoading(true);
        try {
            if (term.trim().length > 0) characters = await searchCharacters(term.trim());
            else characters = await getCharacterPage(currPage);
        } catch (e) {
            console.log(e);
            navigate('/error');
        }
        console.log(characters);
        setData(characters);
        // setLoading(false);
    }
    
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
                <VStack spacing={2}>
                    <HStack spacing={2}>
                        {(currPage > 1 && searchTerm.trim().length <= 0) 
                            && 
                            <Pagination to={`/characters/page/${currPage - 1}`} text='Previous Page'/>
                        }
                        {(hasNextPage && searchTerm.trim().length <= 0)
                            && 
                            <Pagination to={`/characters/page/${currPage + 1}`} text='Next Page'/>
                        }
                        <Pagination to={`/characters/history`} text='Character History'/>
                    </HStack>
                    <FormControl>
                        <FormLabel>Search</FormLabel>
                        <Input placeholder='Search for a Character' value={searchTerm} onChange={handleSearchTerm}/>
                    </FormControl>
                </VStack>
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