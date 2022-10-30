import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';

import Bin from './Pages/Bin'
import Home from './Pages/Home'
import Post from './Pages/Post'
import Posts from './Pages/Posts'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' element={<Home />} />
            <Route path='/my-bin' element={<Bin />} />
            <Route path='/my-posts' element={<Posts />} />
            <Route path='/new-post' element={<Post />} />
            {/* <Route path='*' element={<NotFound />} /> */}
        </Switch>
    )
}

export default Routes;