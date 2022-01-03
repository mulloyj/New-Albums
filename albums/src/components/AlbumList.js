import React, { useState, useEffect } from 'react';
import AlbumDataService from '../services/album.service'; 

import '../css/Album.css';
import AlbumListItem from './AlbumListItem';

export default function AlbumList() {
    const [albums, setAlbums] = useState('');

    useEffect(() => {
        AlbumDataService.getAll()
            .then(res => {
                setAlbums(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <ul className="list-group">
            {albums && albums.map((album) => (
                <AlbumListItem album={album} />
            ))}
        </ul>
    );
}