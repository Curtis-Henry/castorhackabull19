import React, { Component } from 'react';
import './App.css';

//other files
import {NowPlaying} from '../src/NowPlaying';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NowPlaying NowPlaying={NowPlaying} />
      </div>
    );
  }
}

export default App;