import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlbumDataService from '../services/album.service';
import Album from './Album';

export default function AlbumBySlug() {
    const { id, slug } = useParams();
    const [album, setAlbum] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AlbumDataService.findBySlug(slug, id)
            .then(res => {
                console.log(album);
                setAlbum(res.data[0]);
                setIsLoaded(true);
            })
            .catch(error => {
                console.log(error);
                setIsLoaded(true);
            })
    }, []);

    if (isLoaded) {
        return (
            <Album album={album} />
        );
    } else {
        return (
            <div>Loading...</div>
        );
    }
}