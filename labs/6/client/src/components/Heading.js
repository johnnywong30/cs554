import React from "react";
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import PokemonLogo from '../constants/PokemonLogo.png';

const Heading = () => {
    return (
        <Stack direction="horizontal" gap={3} className="col-md-5 mx-auto">
            <Image src={PokemonLogo} fluid alt="Pokemon Logo"/>
        </Stack>
    )
}

export default Heading;