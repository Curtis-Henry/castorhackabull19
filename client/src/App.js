import React, { Component } from 'react';
import './App.css';

//other files
import {NowPlaying} from '../src/NowPlaying';
import {PlayQueue} from '../src/PlayQueue';

class App extends Component {

  render() {
    return (
      <div>
        <div className="queueSpace">
          <NowPlaying NowPlaying={NowPlaying} />
        </div>
        <div className="playerSpace">
          <PlayQueue PlayQueue={PlayQueue} />
        </div>
      </div>
    );
  }
}

export default App;