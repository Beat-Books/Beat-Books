import React, { useState} from "react";
import { hot } from 'react-hot-loader/root';
import LandingPage from  './Containers/LandingPage';
import SignupPage from "./Containers/SignupPage";
import SearchContainer from './Containers/SearchContainer';
import MusicContainer from './Containers/musicRec';
import LoadingContainer from './Containers/LoadingContainer';
import ProfileComponent from './Containers/ProfileContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

    return (
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/profile' element={<ProfileComponent />} />
            <Route path='/search' element={<SearchContainer />} />
            <Route path='/loading' element={<LoadingContainer />} />
            <Route path='/music' element={<MusicContainer />} />
            <Route 
                        path="*" 
                        element={
                            <main>
                                <p>There's no page at this URL!</p>
                            </main>
                        }
                    />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
}

export default hot(App);

//All I need to build to start is a form that does a post request and passes in a username and password.