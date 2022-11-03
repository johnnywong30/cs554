import React, { useState } from 'react';
import constants from '../../../constants';
import { useMutation } from '@apollo/client';
import { Center, FormControl, Input, FormLabel, Button, VStack, Text, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
const { UPLOAD_IMAGE } = constants.Mutation

const Post = () => {
    const [ description, setDescription ] = useState('')
    const [ url, setUrl ] = useState('')
    const [ posterName, setPosterName ] = useState('')
    const [ success, setSuccess ] = useState(false)
    const [ uploadImage, { data, loading } ] = useMutation(UPLOAD_IMAGE, {
        onCompleted: (data) => {
            setSuccess(true)
            setDescription('')
            setUrl('')
            setPosterName('')
            setTimeout(() => {
                setSuccess(false)
            }, 1000)
        }
    })
    
    const handleDescription = e => {
        const text = e.target.value
        setDescription(text)
    }

    const handleUrl = e => {
        const text = e.target.value
        setUrl(text)
    }

    const handlePosterName = e => {
        const text = e.target.value
        setPosterName(text)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const variables = {
            url: url.trim(),
            posterName: posterName ? posterName.trim() : 'Anonymous',
            description: description ? description.trim() : null
        }
        const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        if (url && urlRegex.test(url.trim())) {
            uploadImage({variables})
        }
    }

    return (
        <Center
            shadow='md' 
            border='1px' 
            borderColor='gray.100'
            borderRadius='10px'
            maxWidth='600px'
            marginX='auto'
            marginY='20px'
        >
            <VStack paddingY='20px' spacing={2}>
                <form onSubmit={handleSubmit}>
                    <Text fontSize='2xl' marginY='8px'>Create a Post</Text>
                    { success && 
                        <Alert status='success'>
                            <AlertIcon />
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>You posted an Image.</AlertDescription>
                        </Alert>
                    }
                    <FormControl marginY='10px'>
                        <FormLabel id='description-label' htmlFor='description'>Description</FormLabel>
                        <Input id='description' value={description} onChange={handleDescription} type='text' marginBottom='10px'/>
                        <FormLabel id='url-label' htmlFor='url'>Image URL</FormLabel>
                        <Input required id='url' type='url' value={url} onChange={handleUrl} marginBottom='10px'/>
                        <FormLabel id='posterName-label' htmlFor='posterName'>Author Name</FormLabel>
                        <Input id='posterName' type='text' value={posterName} onChange={handlePosterName} marginBottom='10px'/>
                        <Button isLoading={loading} variant='solid' colorScheme='red' color='white' marginY='15px' shadow='md' type='submit'>Submit</Button>
                    </FormControl>
                </form>
            </VStack>
        </Center>
    )
}

export default Post;