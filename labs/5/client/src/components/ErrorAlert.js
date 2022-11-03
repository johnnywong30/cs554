import React from 'react';
import { Alert, AlertDescription, AlertTitle, AlertIcon, VStack } from '@chakra-ui/react'

const ErrorAlert = ({title, description, width='525px'}) => {
    return (
        <VStack spacing={6} width={width} marginX='auto'>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </Alert>
        </VStack>
    )
}

export default ErrorAlert;