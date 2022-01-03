import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import AlbumDataService from '../services/album.service';
import Album from './Album';


export default function CurrentAlbum() {
    const [album, setAlbum] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [exists, setExists] = useState(false);

    useEffect(() => {
        AlbumDataService.getCurrent()
            .then(res => {
                setAlbum(res.data);
                setLoaded(true);
                if (!_.isEmpty(res.data)) {
                    setExists(true);
                }
            })
            .catch(error => {
                console.log(error);
                setLoaded(true);
                setExists(false);
            })
    }, []);

    if (loaded) {
        return (
            <React.Fragment>
                {exists ? (
                    <Album album={album} />
                ) : (
                    <div className="container">
                        There is no current album! Add an album to set the current album!
                        <br />
                        <Link className='btn btn-primary' to="/albums/add">Add an Album</Link>
                    </div>
                )}
            </React.Fragment>
            
        );
    } else {
        return (
            <div>Loading...</div>
        );
    }
}