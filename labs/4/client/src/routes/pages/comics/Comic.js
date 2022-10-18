import React, { useState, useEffect }from 'react';
import { Spinner, Center, HStack, VStack, Link as ChakraLink, Heading, Text, Image, Box } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { getComicById } from '../../../services/api';


const Comic = () => {
    const [ data, setData ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const comic = await getComicById(id);
                console.log(comic);
                setData(comic);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [id])

    const generateThumbnail = () => {
        const { thumbnail } = data;
        if (thumbnail) {
            const { path, extension } = thumbnail;
            return `${path.trim()}.${extension.trim()}`;
        }
        return 'https://stories.freepiklabs.com/storage/42123/oops-404-error-with-a-broken-robot-cuate-6558.png';
    }

    const generateDescription = () => {
        const { description } = data;
        if (description || (typeof(description) === 'string' && description.trim().length > 0)) {
            return description;
        }
        return 'No description available sorry'
    }

    const generateCharacters = () => {
        const { characters } = data; 
        const { items } = characters;
        if (items.length > 0) {
            return items.map(({name}, index) => {
                return (
                    <Text key={`character${index}`} size='xs'>{name}</Text>
                )
            })
        }
        return <></>
    }

    const generateCreators = () => {
        const { creators } = data;
        const { items } = creators;
        if (items.length > 0) {
            return (
                <VStack spacing={2}>
                    {items.map(({name, role}, index) => {
                        return (
                            <Text key={`creator${index}`} size='xs' textTransform='capitalize'>{role}: {name}</Text>
                        )
                     })
                    }
                </VStack>
            )
        }
    }

    const generateUPC = () => {
        const { upc } = data;
        if (upc) {
            return <Text size='xs'>{upc}</Text>
        }
        return <></>
    }

    const generateLinks = () => {
        const { urls } = data;
        if (urls.length > 0) {
            return urls.map(({type, url}, index) => {
                return (
                    <ChakraLink key={index} href={url} isExternal>
                        <Text size='sm' textTransform='capitalize'>{type}</Text>
                    </ChakraLink>
                )
            })
        }
        return <></>;
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
        <Center padding={2}>
            <VStack spacing={2}>
                <Heading as='h2' size='md'>{data.title}</Heading>
                <Box boxSize='150px'>
                    <Image src={generateThumbnail()} alt={data.name} maxH='150px' maxW='150px' />
                </Box>
                <VStack spacing={2}>
                    <Text size='sm' fontWeight='bold'>Description</Text>
                    <Text size='sm'>{generateDescription()}</Text>
                </VStack>
                {data?.characters?.items.length > 0 && 
                    <VStack spacing={2}>
                        <Text size='sm' fontWeight='bold'>Characters</Text>
                        {generateCharacters()}
                    </VStack>
                }
                {data?.creators?.items.length > 0 &&
                    <VStack spacing={2}>
                        <Text size='sm' fontWeight='bold'>Creators</Text>
                        {generateCreators()}
                    </VStack>
                }
                {data?.upc &&
                    <HStack spacing={2}>
                        <Text size='sm' fontWeight='bold'>UPC</Text>
                        {generateUPC()}
                    </HStack>
                }
                {data?.urls?.length > 0 &&
                    <>
                        <Text size='sm' fontWeight='bold'>External Links</Text>
                        <HStack spacing={3}>
                            {generateLinks()}
                        </HStack>
                    </>
                }
            </VStack>
        </Center>

    )

    
}

export default Comic;