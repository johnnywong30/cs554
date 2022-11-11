import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import constants from '../../../constants';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const { GET_POKEMON_PAGE } = constants.Query;

const PokemonPage = () => {
    const [ pagenum, setPagenum ] = useState(1);
    const { loading, data, error, refetch } = useQuery(GET_POKEMON_PAGE, {
        variables: {pagenum}
    })
    return (
        <>
        </>
    )
}

export default PokemonPage;