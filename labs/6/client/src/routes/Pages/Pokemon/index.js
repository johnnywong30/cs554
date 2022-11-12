import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import constants from '../../../constants';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Stack from 'react-bootstrap/Stack';
import PageButton from "../../../components/PageButton";
import PokemonGrid from "../../../components/PokemonGrid";
import Loading from "../../../components/Loading";

const { GET_POKEMON_PAGE } = constants.Query;

const PokemonPage = () => {
    const { pagenum } = useParams();
    const navigate = useNavigate();
    const [ hasNext, setHasNext ] = useState(false);
    const { loading, data } = useQuery(GET_POKEMON_PAGE, {
        variables: {pagenum: Number(pagenum)},
        onCompleted: data => {
            // infinite loops if user tries to go back via back arrow
            if (data?.pokemonPage.length <= 0) navigate('/error');
        },
        onError: e => {
            navigate('/error');
        }            
    })
    useEffect(() => {
        if (Number(pagenum) <= 0) navigate('/error');
        const checkNextPage = async () => {
            const url = `http://localhost:4000/pokemon/page/${Number(pagenum) + 1}`
            const { data } = await axios.get(url);
            const hasNextPage = data.length > 0;
            setHasNext(hasNextPage);
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
                loading &&
                <Loading />
            }
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