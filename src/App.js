import React from "react";
import { hot } from 'react-hot-loader/root';
import SearchComponent from './components/SearchComponent.js'
import MusicComponent from './components/musicRec'

class App extends React.Component {

  render() {
    const { name } = this.props;

    return (
      <>
        <h1>
          Beat Books
        </h1>
        <SearchComponent />
        <MusicComponent />
      </>
    );
  }
}

export default hot(App);
