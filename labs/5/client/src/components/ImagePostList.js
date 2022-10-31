import React from 'react';
import { Center, UnorderedList } from '@chakra-ui/react';
import ImagePost from './ImagePost';
import { v4 as uuidv4 } from 'uuid'

const ImagePostList = ({images, ...rest}) => {
    console.log(images)
    return (
        <Center paddingTop={6}>
            <UnorderedList listStyleType='none' spacing={4}>
                {images.map((img) => {
                    return (
                        <React.Fragment key={uuidv4()}>
                            <ImagePost {...img} />
                        </React.Fragment>
                    )
                })}
            </UnorderedList>
        </Center>
    )
}

export default ImagePostList;