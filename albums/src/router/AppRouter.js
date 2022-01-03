import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from '../components/Navbar';
import AlbumBySlug from '../components/AlbumBySlug';
import CurrentAlbum from '../components/CurrentAlbum';
import AlbumList from '../components/AlbumList';
import SpotifyLogin from '../components/Spotify/SpotifyLogin';
import SpotifyAdd from '../components/Spotify/SpotifyAdd';
import AddAlbum from '../components/Spotify/AddAlbum';

export default class AppRouter extends Component {
    state = {
        addAlbum: '',
    }

    isValidSession = () => {
        const currentTime = new Date().getTime();
        const expiryTime = localStorage.getItem('expiry_time');

        return currentTime < expiryTime;
    }

    updateAddAlbum = (album) => {
        this.setState({addAlbum: album});
    }

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Router>
                    <Routes>
                        <Route 
                            path="/spotify/callback/"
                            element={<SpotifyLogin/>}
                            />
                        <Route 
                            path="/spotify/add"
                            element={<AddAlbum isValidSession={this.isValidSession} album={this.state.addAlbum}/>}/>
                        <Route
                            path="/albums/add/"
                            element={<SpotifyAdd isValidSession={this.isValidSession} updateAddAlbum={this.updateAddAlbum}/>}
                            />
                         <Route
                            path="/albums/current/"
                            element={<CurrentAlbum />}
                            />
                        <Route
                            path="/albums/"
                            element={<AlbumList />} 
                            />
                        <Route
                            path="/albums/current"
                            element={<CurrentAlbum />}/>
                        <Route 
                            path="/albums/:id/:slug/"
                            element={<AlbumBySlug />}
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
