import React, { useState } from 'react';
import ImagePostList from '../../../components/ImagePostList';
import { useQuery, gql } from '@apollo/client';
import constants from '../../../constants';
import Loading from '../../../components/Loading';
import { Button, VStack } from '@chakra-ui/react'

const { GET_UNSPLASH_IMAGES } = constants.Query

const Home = () => {
    const [ pageNum, setPageNum ] = useState(1)
    const { loading, data, error, fetchMore} = useQuery(GET_UNSPLASH_IMAGES, {
        variables: {pageNum}
    });

    const handleGetMore = () => {
        const newPageNum = pageNum + 1
        setPageNum(newPageNum)
        fetchMore({variables: {pageNum: newPageNum}})
    }

    return (
        <VStack spacing={4} paddingBottom='50px'>
            <ImagePostList images={data?.unsplashImages ? data.unsplashImages : []} error={error} />
            { loading && <Loading loading={loading} /> }
            <Button variant='solid' width='550px' marginBottom='25px' onClick={handleGetMore}>Get More Images</Button>
        </VStack >
    )
}

export default Home;