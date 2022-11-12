import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import Home from './Pages/Home';
import PokemonPage from './Pages/Pokemon';
import PokemonDetails from './Pages/Pokemon/Details';
import Trainers from './Pages/Trainers';
import Error from '../components/Error';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/pokemon/page/:pagenum' element={<PokemonPage />} />
            <Route path='/pokemon/:id' element={<PokemonDetails />} />
            <Route path='/trainers' element={<Trainers />} />
            <Route path='*' element={<Error />} />
        </Switch>
    )
}

export default Routes;