import React, { useState } from 'react';
import '../css/Album.css';
import spotifyIcon from '../images/spotify-black.png';

export default function Album(props) {
    const [album] = useState(props.album);

    return (
        <div className="album">
            <p className="title">{album.title}</p>
            <p className="artist">{album.artist}</p>
            <a href={album.spotifyLink}><img src={album.imageUrl} alt={album.title + " album cover"} /></a><br/>
            <a href={album.spotifyLink} style={{width: '30px'}}><img src={spotifyIcon} className="icon" alt="spotify icon"/></a>
        </div>
    );
}