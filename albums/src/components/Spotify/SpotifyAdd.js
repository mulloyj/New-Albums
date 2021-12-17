import React, { Component } from 'react';

import SpotifyLogin from './SpotifyLogin';
import SpotifySearch from './SpotifySearch';
import SpotifyResult from './SpotifyResult';

import '../../css/Spotify.css';

export default class SpotifyAdd extends Component {

    state = {
        token: '',
        albums: '',
        error: '',
        isLoading: '',
    }

    componentDidMount() {
        if (localStorage.getItem("accessToken")) {
            this.setState({token: localStorage.getItem("accessToken")});
        }
        console.log(this.state.token);
    }
        

    handleSearch = (searchTerm) => {
        try {
            const API_URL = `https://api.spotify.com/v1/search?query=${encodeURIComponent(
                searchTerm
                )}&type=album`;
            fetch(API_URL, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('accessToken')}
            })
            .then((res) =>  res.json())
            .then((data) => {
                this.setState({albums: data.albums, isLoading: false});
            });
        } catch (error) {
            console.log('error', error)
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.isValidSession() ? (
                    <React.Fragment>
                        <SpotifySearch handleSearch={this.handleSearch}/>
                        <SpotifyResult
                            albums={this.state.albums}
                            isValidSession={this.props.isValidSession}
                            updateAlbum={this.props.updateAlbum}
                        />
                    </React.Fragment>
                ) : (
                    <SpotifyLogin />
                )}
            </React.Fragment>
        );
    }
}