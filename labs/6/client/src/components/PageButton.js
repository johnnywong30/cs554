import React from "react";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const PageButton = ({to, text}) => {
    return (
        <Button variant='outline-primary' as={Link} to={to}>
            {text}
        </Button>
    )
}

export default PageButton;