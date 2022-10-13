import React from 'react';
import { VStack, Text, Link } from '@chakra-ui/react';

const Home = () => {
    return (
        <VStack>
            <Text size='lg'>
                The purpose of this website is to utilize the Marvel API to 
                fetch lists of characters, comics, and stories from the 
                Marvel Universe and show information about them.
            </Text>
            <Text size='lg'>
                <Link href='https://developer.marvel.com/' isExternal>
                    Click here more information about the Marvel API.
                </Link>
            </Text>
        </VStack>
    )
}

export default Home;