import React from 'react';
import { HStack, Text } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'


const Heading = () => {
    return (
        <HStack spacing={2} paddingLeft={4} paddingTop={2} bg='gray.800'>
            {/* <DeleteIcon w={6} h={6} color='white'/> */}
            <Text fontSize='2xl' color='white'>Binterest</Text>
        </HStack>
    )
}

export default Heading;