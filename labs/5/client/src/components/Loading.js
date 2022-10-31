import React from "react";
import { Center, Spinner } from '@chakra-ui/react'

const Loading = ({loading}) => {
    return (
        <>
            {
                loading &&
                <Center padding={16}>
                    <Spinner 
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='purple.500'
                        size='xl'
                        boxSize='125px'
                    />
                </Center>
            }
        </>
    )
}

export default Loading;