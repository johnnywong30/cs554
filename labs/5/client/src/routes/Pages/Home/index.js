import React, { useState, useEffect } from 'react';
import ImagePostList from '../../../components/ImagePostList';
import { useQuery, gql } from '@apollo/client';
import constants from '../../../constants';
import Loading from '../../../components/Loading';
import { Button, VStack } from '@chakra-ui/react'

const { GET_UNSPLASH_IMAGES } = constants.Query

const Home = () => {
    const [ pageNum, setPageNum ] = useState(1)
    const [ imagePosts, setImagePosts ] = useState([])

    const { loading, error, data, refetch } = useQuery(GET_UNSPLASH_IMAGES, {
        variables: {pageNum},
    });
    
    useEffect(() => {
        const images = data?.unsplashImages ? data.unsplashImages : []
        // setImagePosts([...images, ...imagePosts]) // append images
        setImagePosts([...images]) // set to new images
    }, [data])

    const handleGetMore = () => {
        const newPageNum = pageNum + 1
        refetch({pageNum: newPageNum})
        setPageNum(newPageNum)
    }

    return (
        <>
            { loading ? 
                <Loading loading={loading} /> 
                :
                <VStack spacing={4} paddingBottom='50px'>
                    <Button variant='solid' width='550px' marginTop='25px' onClick={handleGetMore}>Get More Images</Button>
                    <ImagePostList images={imagePosts} />
                    <Button variant='solid' width='550px' marginBottom='25px' onClick={handleGetMore}>Get More Images</Button>
                </VStack >
                
        
            }
        </>
    )
}

export default Home;