import React from "react";
import { hot } from 'react-hot-loader/root';
import SearchComponent from './components/SearchComponent.js'
import MusicComponent from './components/musicRec'
import LoadingComponent from "./components/LoadingComponent.js";

class App extends React.Component {

  render() {
    const { name } = this.props;

    return (
      <>
        <h1>
          Beat Books
        </h1>
        <SearchComponent />
        <LoadingComponent/>
      </>
    );
  }
}

export default hot(App);
