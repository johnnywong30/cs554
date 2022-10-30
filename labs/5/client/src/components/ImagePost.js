import React from 'react';
import { ListItem, Box, Image, Text, VStack, Button, HStack, Center } from '@chakra-ui/react'; 

const ImagePost = ({key, id, url, posterName, description, userPosted, binned, ...rest}) => {
    const poster = posterName ? posterName : 'Anonymous'
    const caption = description ? description : ''
    const binText = binned ? 'Remove from Bin' : 'Add to Bin'
    return (
        <ListItem border={'1px'} borderColor='gray.100' borderRadius='15px'>
            <Center paddingLeft={2} paddingRight={2}>
                <VStack spacing={2}>
                    <Text fontSize='sm' color='gray.400'>
                        Posted by: {poster}
                    </Text>
                    <Text fontSize='xl' color='gray.700'>
                        {caption}
                    </Text>
                    <Box boxSize='375px'>
                        <Image src={url} alt={id} boxSize='100%' />
                    </Box>
                    <HStack spacing={2} paddingTop={4} paddingBottom={4}>
                        <Button colorScheme='red' variant='solid'>{binText}</Button>
                        {   userPosted && 
                            <Button variant='ghost'>Delete Post</Button>
                        }
                    </HStack>
                </VStack>
            </Center>
        </ListItem>
    )
}

export default ImagePost;