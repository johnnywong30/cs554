import React, { useState } from 'react';
import { ListItem, Box, Image, Text, VStack, Button, HStack, Center } from '@chakra-ui/react'; 
import { useMutation } from '@apollo/client';

import constants from '../constants';
import ErrorAlert from './ErrorAlert';
const { UPDATE_IMAGE, DELETE_IMAGE } = constants.Mutation;

const ImagePost = ({id, url, posterName, description, userPosted, binned, ...rest}) => {
    const [ hasError, setHasError ] = useState(false)
    const [ errorMsg, setErrorMsg ] = useState('')
    const onError = (e) => {
        setHasError(true)
        setErrorMsg(e.message)
        setTimeout(() => {
            setHasError(false)
            setErrorMsg('')
        }, 3000)
    }
    const [ updateImage, { loading }] = useMutation(UPDATE_IMAGE, {
        onError
    });
    const [ deleteImage ] = useMutation(DELETE_IMAGE, {
        onError
    });
    const [ isBinned, setIsBinned ] = useState(binned)

    const poster = posterName ? posterName : 'Anonymous'
    const caption = description ? description : 'No description available.'
    const binText = isBinned ? 'Remove from Bin' : 'Add to Bin'

    const handleBin = () => {
        setIsBinned(!isBinned)
        const variables = {
            id,
            url,
            posterName,
            description,
            userPosted,
            binned: !isBinned
        }
        updateImage({variables})
    }

    const handleDelete = () => {
        const variables = {
            id
        }
        deleteImage({variables})
    }

    return (
        <ListItem 
            border={'1px'} 
            borderColor='gray.100' 
            borderRadius='15px' 
            shadow='md' 
            width='600px'
            height='650px'
            marginY='10px'
            >
            <Center paddingLeft={6} paddingRight={6} paddingTop={4} >
                <VStack>
                    {   hasError 
                        &&
                        <ErrorAlert title='Error' description={errorMsg} />
                    }
                    <VStack spacing={2}>
                        <Text fontSize='sm' color='gray.400'>
                            Posted by: {poster}
                        </Text>
                        <Text fontSize='md' color='gray.700'>
                            {caption}
                        </Text>
                    </VStack>
                    <Box boxSize='375px'>
                        <Image src={url} alt={id} boxSize='100%' />
                    </Box>
                    <HStack spacing={2} paddingY={'75px'} height='10px'>
                        <Button colorScheme='red' variant='solid' isLoading={loading} onClick={handleBin}>{binText}</Button>
                        {   userPosted && 
                            <Button variant='ghost' onClick={handleDelete}>Delete Post</Button>
                        }
                    </HStack>
                </VStack>
            </Center>
        </ListItem>
    )
}

export default ImagePost;