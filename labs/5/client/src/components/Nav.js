import React from 'react';
import { Stack, HStack, Center, Divider } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import NavItem from './NavItem';
import Heading from './Heading';

const Nav = () => {
    return (
        <Stack>
            <Heading />
            <Center paddingTop={2}>
                <HStack spacing={2} height='18px'>
                    <NavItem to='/my-bin' text='my bin' />
                    <Divider orientation='vertical' borderColor='gray.800'/>
                    <NavItem to='/' text='images' />
                    <Divider orientation='vertical' borderColor='gray.800'/>
                    <NavItem to='/my-posts' text='my posts' />
                </HStack>
            </Center>
        </Stack>
    )
}

export default Nav;