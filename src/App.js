import React from "react";
import { hot } from 'react-hot-loader/root';
import MusicComponent from './components/musicRec'

class App extends React.Component {
 
  render() {
    const { name } = this.props;

    return (
      <>
       <MusicComponent />
      </>
    );
  }
}

export default hot(App);


