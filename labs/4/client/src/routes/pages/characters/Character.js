import React, { useState, useEffect }from 'react';
import { Spinner, Center, HStack, VStack, Link as ChakraLink, Heading, Text, Image, Box } from '@chakra-ui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCharacterById } from '../../../services/api';


const Character = () => {
    const [ data, setData ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const character = await getCharacterById(id);
                console.log(character);
                setData(character);
                setLoading(false);
            } catch (e) {
                console.log(e);
                navigate('/error')
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

    const generateComicAppearances = () => {
        const { comics } = data;
        return comics.available;
    }

    const generateStoryAppearances = () => {
        const { stories } = data;
        return stories.available;
    }

    const generateSeriesAppearances = () => {
        const { series } = data;
        return series.available;
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
                <Heading as='h2' size='md'>{data.name}</Heading>
                <Box boxSize='150px'>
                    <Image src={generateThumbnail()} alt={data.name} maxH='150px' maxW='150px' />
                </Box>
                <VStack spacing={2}>
                    <Text size='sm' fontWeight='bold'>Description</Text>
                    <Text size='sm'>{generateDescription()}</Text>
                </VStack>
                <HStack spacing={2}>
                    <Text size='sm' fontWeight='bold'>Comic Appearances</Text>
                    <Text size='sm'>{generateComicAppearances()}</Text>
                </HStack>
                <HStack spacing={2}>
                    <Text size='sm' fontWeight='bold'>Story Appearances</Text>
                    <Text size='sm'>{generateStoryAppearances()}</Text>
                </HStack>
                <HStack spacing={2}>
                    <Text size='sm' fontWeight='bold'>Series Appearances</Text>
                    <Text size='sm'>{generateSeriesAppearances()}</Text>
                </HStack>
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

export default Character;