import React from 'react';
import ImagePostList from '../../../components/ImagePostList';
import constants from '../../../constants';
import { useQuery } from '@apollo/client';
import Loading from '../../../components/Loading';
import { VStack, Center, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
const { GET_POSTED_IMAGES } = constants.Query

const Posts = () => {
    const { loading, data, error } = useQuery(GET_POSTED_IMAGES, {
        pollInterval: 100,
    })
    console.log(error)
    return (
        <VStack spacing={4} paddingBottom='50px' marginY='20px'>
                <Link as={RouterLink} to={'/new-post'} marginY='10px'>
                    <Center w='500px' h='50px' bg='red.500' 
                            border='1px' shadow='md' borderColor='red.600' 
                            borderRadius='5px' color='white'>
                            Upload a Post
                    </Center>
                </Link>
            <ImagePostList images={data?.userPostedImages ? data.userPostedImages : []} error={error} />
            { loading && <Loading loading={loading} /> }
        </VStack >
    )
}

export default Posts;