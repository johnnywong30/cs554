import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import constants from '../../../constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const { GET_POKEMON } = constants.Query;

const PokemonDetails = () => {
    const [ id, setId ] = useState(1);
    const { loading, data, error, refetch } = useQuery(GET_POKEMON, {
        variables: {id}
    })
    return (
        <>
        </>
    )
}

export default PokemonDetails;