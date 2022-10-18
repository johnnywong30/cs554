import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({to, text, ...rest}) => {
    return (
        <Link to={to}>
            {text}
        </Link>
    )
}

export default Pagination;