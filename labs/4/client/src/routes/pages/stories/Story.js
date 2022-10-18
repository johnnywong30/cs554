import React, { useState, useEffect }from 'react';
import { Spinner, Center, HStack, VStack, Link as ChakraLink, Heading, Text, Image, Box } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { getStoryById } from '../../../services/api';


const Story = () => {
    const [ data, setData ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const story = await getStoryById(id);
                console.log(story);
                setData(story);
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

    const generateComics = () => {
        const { comics } = data; 
        const { items } = comics;
        if (items.length > 0) {
            return items.map(({name}, index) => {
                return (
                    <Text key={`comic${index}`} size='xs'>{name}</Text>
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
                {data?.comics?.items.length > 0 && 
                    <VStack spacing={2}>
                        <Text size='sm' fontWeight='bold'>Comics</Text>
                        {generateComics()}
                    </VStack>
                }
                {data?.creators?.items.length > 0 &&
                    <VStack spacing={2}>
                        <Text size='sm' fontWeight='bold'>Creators</Text>
                        {generateCreators()}
                    </VStack>
                }
            </VStack>
        </Center>

    )

    
}

export default Story;