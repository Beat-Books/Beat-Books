import React from "react";
import { hot } from 'react-hot-loader/root';
import SearchComponent from './components/SearchComponent';
import MusicComponent from './components/musicRec';
import LoadingComponent from './components/LoadingComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<SearchComponent />} />
            <Route path='/loading' element={<LoadingComponent />} />
            <Route path='/music' element={<MusicComponent />} />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default hot(App);
