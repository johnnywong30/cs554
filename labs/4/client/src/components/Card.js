import React from 'react';
import { VStack, Divider, Heading, Text, Image, Box } from '@chakra-ui/react';

const Card = ({title, description, misc, thumbnail, ...rest}) => {
    const textCond = description && typeof description === 'string' && description.trim().length > 0;
    if (!thumbnail) thumbnail = {
        path: 'https://stories.freepiklabs.com/storage/42123/oops-404-error-with-a-broken-robot-cuate-6558',
        extension: 'png'
    }
    const { path, extension } = thumbnail;
    const imgSrc = `${path}.${extension}`
    return (
        <VStack padding={2}>
            <Heading as='h2' size='md'>{title}</Heading>
            <Box boxSize='150px'>
                <Image src={imgSrc} alt={title} maxH='150px' maxW='150px' />
            </Box>
            <Divider orientation='horizontal'/>
            <Text size='sm'>{textCond ? `${description.slice(0, 100)}...` : 'No description available sorry.'}</Text>
            {misc && <Text size='sm'>{misc}</Text>}
        </VStack>
    )
}

export default Card;