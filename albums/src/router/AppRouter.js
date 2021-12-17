import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Album from '../components/Album';
import SpotifyLogin from '../components/Spotify/SpotifyLogin';
import SpotifyAdd from '../components/Spotify/SpotifyAdd';

export default class AppRouter extends Component {
    state = {
        album: ''
            /* {
                title: 'Wish You Were Here',
                artist: 'Pink Floyd',
                img: 'https://i.scdn.co/image/ab67616d0000b2731a84d71391df7469c5ab8539', 
                spotify: 'spotify:album:0bCAjiUamIFqKJsekOYuRw'
            }, */
    }

    isValidSession = () => {
        const currentTime = new Date().getTime();
        const expiryTime = localStorage.getItem('expiry_time');

        return currentTime < expiryTime;
    }

    updateAlbum = (album) => {
        this.setState({album: album});
        console.log(album);
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Routes>
                        <Route 
                            path="/spotify/callback/"
                            element={<SpotifyLogin/>}
                            />
                        <Route
                            path="/albums/add/"
                            element={<SpotifyAdd isValidSession={this.isValidSession} updateAlbum={this.updateAlbum}/>}
                            />
                        <Route
                            path="/albums/current/"
                            element={<Album album={this.state.album}/>}
                            />
                        <Route 
                            path="/"
                            element={<div>Home</div>}
                            />
                    </Routes>
                </Router>
            </React.Fragment>
        );
    }
}
