import React from 'react';
import { Alert, AlertDescription, AlertTitle, AlertIcon, VStack, Box, Image } from '@chakra-ui/react'

const Error = () => {
    const src = 'https://www.kindpng.com/picc/m/715-7159714_sticks-clipart-dry-weight-gain-fat-sonic-hd.png'
    return (
        <VStack spacing={6} width='525px' marginX='auto' marginY='20px'>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>Error 404</AlertTitle>
                <AlertDescription>Content not Found</AlertDescription>
            </Alert>
            <Box boxSize='525px'>
                <Image src={src} alt='Jega Prega' boxSize='100%' />
            </Box>
        </VStack>
    )
}

export default Error;