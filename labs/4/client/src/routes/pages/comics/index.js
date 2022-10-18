import React, { useState, useEffect }from 'react';
import { Grid, GridItem, Spinner, Center, VStack, HStack, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getComicPage, searchComics } from '../../../services/api';

import Card from '../../../components/Card';
import Pagination from '../../../components/Pagination';


const Comics = () => {
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
                const comics = await getComicPage(pagenum);
                if (comics.length <= 0) navigate('/error');
                else {
                    setData(comics);
                    setLoading(false);
                    console.log(comics);
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
                const nextPage = await getComicPage(pagenum + 1);
                if (nextPage.length > 0) setHasNextPage(true);
                else setHasNextPage(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
        checkNextPage();
    }, [page])

    const handleSearchTerm = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        let comics;
        // setLoading(true);
        try {
            if (term.trim().length > 0) comics = await searchComics(term.trim());
            else comics = await getComicPage(currPage);
        } catch (e) {
            console.log(e);
            navigate('/error');
        }
        console.log(comics);
        setData(comics);
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
                            <Pagination to={`/comics/page/${currPage - 1}`} text='Previous Page'/>
                        }
                        {(hasNextPage && searchTerm.trim().length <= 0)
                            && 
                            <Pagination to={`/comics/page/${currPage + 1}`} text='Next Page'/>
                        }
                    </HStack>
                    <FormControl>
                        <FormLabel>Search</FormLabel>
                        <Input placeholder='Search for a Comic' value={searchTerm} onChange={handleSearchTerm}/>
                    </FormControl>
                </VStack>
            </Center>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {data.map((comic) => {
                    const { id, title, description, thumbnail } = comic;
                    return (
                        <Link key={id} to={`/comics/${id}`}>
                            <GridItem w='100%' h='100%'>
                                <Card title={title} description={description} thumbnail={thumbnail} />
                            </GridItem>
                        </Link>
                    )
                })}
            </Grid>
        </>
    )

    
}

export default Comics;