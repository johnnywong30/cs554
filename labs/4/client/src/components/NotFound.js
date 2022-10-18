import React from 'react';
import { VStack, Image, Box } from '@chakra-ui/react';

const NotFound = () => {
    const imgLink = 'https://i.imgur.com/e7G3c1B.png';
    return (
        <VStack padding={2}>
            <Box boxSize='500px'>
                <Image src={imgLink} alt={'404 Page not Found'} maxH='500px' maxW='500px' />
            </Box>
        </VStack>
    )
}

export default NotFound;