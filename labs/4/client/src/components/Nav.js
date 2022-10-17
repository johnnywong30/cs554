import React from 'react';
import { HStack, VStack, Heading, Center, Text, Divider } from '@chakra-ui/react';
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <Center>
                <VStack spacing={1}>
                    <Heading as='h1' size='xl'>
                        <Link to='/'>
                            Marvel Database    
                        </Link>
                    </Heading>
                    <HStack>
                        <Text size='md'>
                            <Link to='/characters/page/1'>
                                Characters
                            </Link>
                        </Text>
                        <Text size='md'>
                            <Link to='/comics/page/1'>
                                Comics
                            </Link>
                        </Text>
                        <Text size='md'>
                            <Link to='/stories/page/1'>
                                Stories
                            </Link>
                        </Text>
                    </HStack>
                </VStack>
            </Center>
            <Divider paddingTop={4} />
        </>
    )
}

export default Nav;