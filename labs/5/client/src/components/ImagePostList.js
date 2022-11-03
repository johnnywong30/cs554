import React from 'react';
import { Center, UnorderedList } from '@chakra-ui/react';
import ImagePost from './ImagePost';
import { v4 as uuidv4 } from 'uuid'
import ErrorAlert from './ErrorAlert';

const ImagePostList = ({images, error, ...rest}) => {
    return (
        <Center paddingTop={6}>
            {
                error
                &&
                <ErrorAlert title='Error!' description={error.message}/>
            }
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