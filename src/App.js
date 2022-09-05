import React from "react";
import { hot } from 'react-hot-loader/root';
import SearchComponent from './components/SearchComponent.js'
import MusicComponent from './components/musicRec'
import LoadingComponent from "./components/LoadingComponent.js";
import logo from "../src/assets/logo.png"

class App extends React.Component {

  render() {
    const { name } = this.props;

    return (
      <>
       <div id="logo-container"> <img id="logo" src={logo}></img></div>
        <SearchComponent />
        <LoadingComponent/>
      </>
    );
  }
}

export default hot(App);
