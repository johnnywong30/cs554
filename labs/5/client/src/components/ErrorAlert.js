import React from 'react';
import { Alert, AlertDescription, AlertTitle, AlertIcon, VStack } from '@chakra-ui/react'

const ErrorAlert = ({title, description}) => {
    return (
        <VStack spacing={6} width='525px' marginX='auto'>
            <Alert status='error'>
                <AlertIcon />
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </Alert>
        </VStack>
    )
}

export default ErrorAlert;