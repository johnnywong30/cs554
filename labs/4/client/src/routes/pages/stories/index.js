import React, { useState, useEffect }from 'react';
import { Grid, GridItem, Spinner, Center, HStack } from '@chakra-ui/react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getStoryPage } from '../../../services/api';

import Card from '../../../components/Card';
import Pagination from '../../../components/Pagination';


const Stories = () => {
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
                const stories = await getStoryPage(pagenum);
                setData(stories);
                setLoading(false);
                console.log(stories);
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
                const nextPage = await getStoryPage(pagenum + 1);
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
                        <Pagination to={`/stories/page/${currPage - 1}`} text='Previous Page'/>
                    }
                    {hasNextPage
                        && 
                        <Pagination to={`/stories/page/${currPage + 1}`} text='Next Page'/>
                    }
                </HStack>
            </Center>
            <Grid templateColumns='repeat(4, 1fr)' gap={6}>
                {data.map((story) => {
                    const { id, title, description } = story;
                    return (
                        <Link key={id} to={`/stories/${id}`}>
                            <GridItem w='100%' h='100%'>
                                <Card title={title} description={description}/>
                            </GridItem>
                        </Link>
                    )
                })}
            </Grid>
        </>
    )

    
}

export default Stories;