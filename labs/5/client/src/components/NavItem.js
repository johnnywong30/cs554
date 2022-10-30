import React from 'react';
import { Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const NavItem = ({to, text, ...rest}) => {
    return (
        <Link as={RouterLink} to={to}>
            {text}
        </Link>
    )
}

export default NavItem;