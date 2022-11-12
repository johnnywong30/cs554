import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PokemonCard from "./PokemonCard";
import { v4 as uuidv4 } from 'uuid';



const PokemonGrid = ({pokemon}) => {
    return (
        <Container fluid>
            <Row>
                {pokemon.map(pokemon => {
                    return (
                        <React.Fragment key={uuidv4()}>
                            <PokemonCard {...pokemon}/>
                        </React.Fragment>
                    )
                })}
            </Row>
        </Container>
    )
}

export default PokemonGrid;