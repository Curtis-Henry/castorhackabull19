import React, { Component } from 'react';
import './App.css';

//other files
import {NowPlaying} from '../src/NowPlaying';
import {PlayQueue} from '../src/PlayQueue';

class App extends Component {

  render() {
    return (
      <div className="App">
        <NowPlaying NowPlaying={NowPlaying} />
        <PlayQueue PlayQueue={PlayQueue} />
      </div>
    );
  }
}

export default App;