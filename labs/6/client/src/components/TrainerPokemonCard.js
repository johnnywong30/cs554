import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Stack from 'react-bootstrap/Stack';
import { useQuery } from '@apollo/client';
import constants from "../constants";
import PokemonCard from "./PokemonCard";
const { GET_POKEMON } = constants.Query;

const TrainerPokemonCard = ({id}) => {
    const { data } = useQuery(GET_POKEMON, {
        variables: {id},
    })

    return (
        <>
            {
                data?.pokemonById &&
                <PokemonCard inTrainerParty {...data?.pokemonById} />
            }
        </>
    )
}

export default TrainerPokemonCard;