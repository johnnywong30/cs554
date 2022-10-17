import React from 'react';
import { VStack, Divider, Heading, Text } from '@chakra-ui/react';

const Card = ({title, description, misc, ...rest}) => {
    const textCond = description && typeof description === 'string' && description.trim().length > 0;
    return (
        <VStack padding={2}>
            <Heading as='h2' size='md'>{title}</Heading>
            <Divider orientation='horizontal'/>
            <Text size='sm'>{textCond ? `${description.slice(0, 100)}...` : 'No description available sorry.'}</Text>
            {misc && <Text size='sm'>{misc}</Text>}
        </VStack>
    )
}

export default Card;