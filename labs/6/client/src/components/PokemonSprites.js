import React from "react";
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Stack from "react-bootstrap/Stack";
import { v4 as uuidv4 } from 'uuid';
import { capitalize } from "../constants/helpers";

const PokemonSprites = ({sprites}) => {
    const spritesToRender = Object.entries(sprites)
                            .filter(([key, value]) => {
                                const keyCheck = key !== '__typename' && key !== 'official_artwork'
                                return keyCheck && value
                            })
                            .map(([key, value]) => {
                                const newKey = key.split('_').map(capitalize).join(' ')
                                return [newKey, value]
                            })
    return (
        <Stack direction="horizontal" gap={2} className='w-50 mx-auto' >  
            {
                spritesToRender.map(([key, value]) => {
                    return (
                        <Stack direction="vertical" gap={1} key={uuidv4()}>
                            <Image src={value} alt={key} thumbnail />
                            <Badge className='bg-light text-dark'>{key}</Badge> 
                        </Stack>
                    )
                })
            }
        </Stack>
    )
} 

export default PokemonSprites;