import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';


const Loading = () => {
    return (
        <Stack direction='horizontal' gap={3} className='mx-auto'>
            <Spinner animation="grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Spinner animation="grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <Spinner animation="grow" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Stack>
    )
}

export default Loading;