import React, { useState } from 'react';
import '../css/Album.css';
import spotifyIcon from '../images/spotify-black.png';

export default function Album(props) {
    const [album, setAlbum] = useState(props.album);

    return (
        <div className="album">
            <p className="title">{album.title}</p>
            <p className="artist">{album.artist}</p>
            <img src={album.img} className = "cover" alt={album.title + " album cover"} />
            <a href={album.spotify} style={{width: '30px'}}><img src={spotifyIcon} className="icon" alt="spotify icon"/></a>
        </div>
    );
};