import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/home';
import Characters from './pages/Characters';
import Comics from './pages/Comics';
import Stories from './pages/Stories';

const Routes = () => {
    return (
        <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/characters' element={<Characters />}>
            {/* <Route path='/characters/:id' element={<Character />}/> */}
                <Route path='/characters/page/:page' element={<Characters />}/>
            {/* <Route path='/characters/history' element={<CharacterHistory />}/> */}
            </Route>
          <Route path='/comics' element={<Comics />}>
            {/* <Route path='/comics/:id' element={<Comic />}/> */}
            <Route path='/comics/page/:page' element={<Comics />}/>
          </Route>
          <Route path='/stories' exact element={<Stories />}>
            {/* <Route path='/stories/:id' exact element={<Story />}/> */}
            <Route path='/stories/page/:page' exact element={<Stories />}/>
          </Route>
          {/* <Route path='*' element={<NotFound />}/> */}
        </Switch>
    )
}

export default Routes;