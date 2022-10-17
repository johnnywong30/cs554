import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const Pagination = ({to, text, ...rest}) => {
    return (
        <Link to={to}>
            <Button colorScheme='cyan' variant='link'>
                {text}
            </Button>
        </Link>
    )
}

export default Pagination;