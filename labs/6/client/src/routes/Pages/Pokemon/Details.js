import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import constants from '../../../constants';
import Stack from 'react-bootstrap/Stack';
import Loading from "../../../components/Loading";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import PokemonCard from "../../../components/PokemonCard";
import PokemonAbility from "../../../components/PokemonAbility";
import PokemonStats from "../../../components/PokemonStats";

const { GET_POKEMON } = constants.Query;

const PokemonDetails = () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_POKEMON, {
        variables: {id}
    })

    console.log(data)

    return (
        <Stack direction="horizontal" gap={4} className='mx-auto'>
            {
                loading &&
                <Loading />
            }
            { 
                data?.pokemonById &&
                <Stack direction="horizontal" gap={4} className='mx-auto'>
                    <PokemonCard {...data?.pokemonById} />
                    <Stack direction="vertical" gap={2} className='mx-auto py-4'> 
                        <p className="h3 text-center">Abilities</p>
                        {
                            data?.pokemonById?.abilities.map(ability => {
                                return (
                                    <React.Fragment key={uuidv4()}>
                                        <PokemonAbility {...ability} />
                                    </React.Fragment>
                                )
                            })
                        }
                    </Stack>
                    <Stack direction="vertical" gap={2} className='mx-auto py-4'>
                        <p className="h3 text-center">Stats</p>
                        <PokemonStats stats={data?.pokemonById?.stats} />
                    </Stack>
                    
                </Stack>
            }
        </Stack>
    )
}

export default PokemonDetails;