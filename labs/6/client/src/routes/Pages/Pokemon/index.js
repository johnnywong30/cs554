import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import constants from '../../../constants';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Stack from 'react-bootstrap/Stack';
import PageButton from "../../../components/PageButton";
import PokemonGrid from "../../../components/PokemonGrid";

const { GET_POKEMON_PAGE } = constants.Query;

const PokemonPage = () => {
    const { pagenum } = useParams();
    const navigate = useNavigate();
    const [ hasNext, setHasNext ] = useState(false);
    const { loading, data, error } = useQuery(GET_POKEMON_PAGE, {
        variables: {pagenum: Number(pagenum)}
    })
    useEffect(() => {
        // todo do error route
        if (Number(pagenum) <= 0) navigate('/error');
        const checkNextPage = async () => {
            const url = `http://localhost:4000/pokemon/page/${pagenum}`
            const { data } = await axios.get(url);
            setHasNext(data.length > 0);
        }
        checkNextPage();
    }, [pagenum])

    return (
        <Stack direction="vertical" gap={3} className='mx-auto py-3'>
            <Stack direction="horizontal" gap={5} className='mx-auto'>
                {Number(pagenum) > 1 && <PageButton to={`/pokemon/page/${Number(pagenum) - 1}`} text='Previous Page'/>}
                {hasNext && <PageButton to={`/pokemon/page/${Number(pagenum) + 1}`} text='Next Page'/>}
            </Stack>
            <PokemonGrid pokemon={data?.pokemonPage ? data?.pokemonPage : []} />
            {
                data?.pokemonPage 
                &&
                <Stack direction="horizontal" gap={5} className='mx-auto'>
                    {Number(pagenum) > 1 && <PageButton to={`/pokemon/page/${Number(pagenum) - 1}`} text='Previous Page'/>}
                    {hasNext && <PageButton to={`/pokemon/page/${Number(pagenum) + 1}`} text='Next Page'/>}
                </Stack>
            }
        </Stack>
    )
}

export default PokemonPage;