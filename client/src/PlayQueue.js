import React, { Component } from 'react';
import axios from 'axios';

import './PlayQueue.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export class PlayQueue extends Component {

  constructor(props){
    super(props);
    const params = this.getHashParams();
    this.token = params.access_token;
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
      this.api =  axios.create({
        baseURL: 'https://api.spotify.com/v1',
        timeout: 15000,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    this.state = {
      loggedIn: this.token ? true : false,
      playQueue: { name: 'Not Checked', albumArt: '' },
      track: "no song",
      href: "no ref",
      embedCode: "https://open.spotify.com/embed/track/3uYDO9dPLTVrgfwg7EYXSf"
    }
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  testFunc = async (id) => {
    try {
      const song = await this.api.get(`/tracks/${id}`);
      console.log(song.data)

      const {name: track} = song.data;
      const {href: href} = song.data;
      
      //Create embed link
      var trackID = href.substring(34, href.length);
      var embedURL = "https://open.spotify.com/embed/track/";

      this.state.embedCode = embedURL.concat(trackID);
      
      console.log(this.state.embedCode)

      this.setState({track});
    } catch (err){
      console.log('somethin bad happened', err);
    }
  }

  // state = { username: "", fname: "", lname: "", wins: "", lost: "" };
  render() {
    //   const { PlayQueue} = this.props;
    return (
      
      <div className="App">
        { this.state.loggedIn &&
          <button onClick={() => this.testFunc('3n3Ppam7vgaVa1iaRUc9Lp')}>
            Play Queue: { this.state.track }
          </button>
        }
        <div>
          <iframe src = { this.state.embedCode } width="50%" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </div>
      </div>
    );
  }
}