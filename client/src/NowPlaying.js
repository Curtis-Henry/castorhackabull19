import React, { Component } from 'react';

import axios from 'axios';

//import logo from './logo.svg';

import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

export class NowPlaying extends Component {

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
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }

    this.addNewUser();
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

  addNewUser = async (id) => {
    console.log('xd');
    try {
      const user = await this.api.get(`/me`);

      var users = localStorage.getItem(users);

      if(users === null)
      {users = '';}

      var userObj = {
        id: user.data['display_name'],
        token: this.token
      };

      userObj = JSON.stringify(userObj);

      
      users += userObj;
      console.log(userObj);
      

      localStorage.setItem('users',users);

    } catch (err){
      console.log('somethin bad happened', err);
    }
  }

  getNowPlaying(){
    // this.addNewUser();
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        //console.log(typeof(response));
        //console.log(response);
        if(response != ""){     //Keeps app from crashing if spotify's closed on device
        this.setState({
          nowPlaying: { 
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      }
    })
  }

  // state = { username: "", fname: "", lname: "", wins: "", lost: "" };
  render() {
    //   const { NowPlaying} = this.props;
    return (
      
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        {/* { this.state.loggedIn &&
          <button onClick={() => this.addNewUser()}>
            Check Now Playing
          </button>
        } */}
      </div>

    );
  }
}