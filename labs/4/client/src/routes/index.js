import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/home';

import Characters from './pages/Characters';
import Character from './pages/Characters/Character';

import Comics from './pages/Comics';
import Comic from './pages/Comics/Comic';

import Stories from './pages/Stories';
import Story from './pages/Stories/Story';

const Routes = () => {
    return (
        <Switch>
          <Route path='/' element={<Home />} />
          {/* <Route path='/characters/history' element={<CharacterHistory />}/> */}
          <Route path='/characters/page/:page' element={<Characters />}/>
          <Route path='/comics/page/:page' element={<Comics />}/>
          <Route path='/stories/page/:page' exact element={<Stories />}/>
          <Route path='/characters/:id' element={<Character />}/>
          <Route path='/comics/:id' element={<Comic />}/>
          <Route path='/stories/:id' exact element={<Story />}/>
          {/* <Route path='*' element={<NotFound />}/> */}
        </Switch>
    )
}

export default Routes;