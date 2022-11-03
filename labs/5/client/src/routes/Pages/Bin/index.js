import React from 'react';
import ImagePostList from '../../../components/ImagePostList';
import constants from '../../../constants';
import { useQuery } from '@apollo/client';
import Loading from '../../../components/Loading';
import { VStack } from '@chakra-ui/react'
const { GET_BINNED_IMAGES } = constants.Query

const Bin = () => {
    const { loading, data, error } = useQuery(GET_BINNED_IMAGES, {
        pollInterval: 100,
    })

    return (
        <VStack spacing={4} paddingBottom='50px'>
            <ImagePostList images={data?.binnedImages ? data.binnedImages : []} error={error} />
            { loading && <Loading loading={loading} /> }
        </VStack >
    )
}

export default Bin;