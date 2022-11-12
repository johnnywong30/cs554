import React from "react";
import Stack from "react-bootstrap/Stack";
import Alert from 'react-bootstrap/Alert';
import Image from "react-bootstrap/Image";

import Pikachu from '../constants/pikachu-error.gif';

const Error = () => {
    return (
        <Stack direction="vertical" gap={2} className='w-25 mx-auto py-2'>
            <Alert variant="danger">
                Error 404: Page not Found
            </Alert>
            <Image src={Pikachu} alt='Pikachu Error' />
        </Stack>
    )
}

export default Error;