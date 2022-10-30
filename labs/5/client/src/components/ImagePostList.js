import React from 'react';
import { Center, UnorderedList } from '@chakra-ui/react';
import ImagePost from './ImagePost';

const ImagePostList = ({images, ...rest}) => {
    return (
        <Center paddingTop={6}>
            <UnorderedList listStyleType='none'>
                <ImagePost />
            </UnorderedList>
        </Center>
    )
}

export default ImagePostList;