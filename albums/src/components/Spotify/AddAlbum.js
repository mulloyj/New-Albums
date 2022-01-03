import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AlbumDataService from '../../services/album.service';
import ListenedDataService from '../../services/listened.service';
import _ from 'lodash';

import { slugify } from '../../utils/functions';

import Album from '../Album';

export default function AddAlbum(props) {
    const [ album, setAlbum ] = useState(props.album);
    const [ exists, setExists ] = useState(false);
    const [ slug, setSlug ] = useState('');
    const [ added, setAdded ] = useState(false);

    useEffect(() => {
        if (!added && !exists && album.title && album.artist) {
            AlbumDataService.findByTitleAndArtist(album.title, album.artist)
                .then(res => {
                    if (_.isEmpty(res.data)) {
                        setExists(false);
                        const albumSlug = slugify(album.title);
                        setSlug(albumSlug)
                        setAlbum({
                            title: album.title,
                            artist: album.artist,
                            spotifyLink: album.spotifyLink,
                            imageUrl: album.imageUrl,
                            slug: albumSlug
                            });
                    } else {
                        setExists(true);
                        setAlbum(res.data[0]);
                        setSlug(res.data[0].slug);
                    }
                }).catch(error => {
                    console.log(error);
                    setAlbum({});
                });
        }
    }, [added, exists]);

    function addAlbum() {
        console.log(album);
        AlbumDataService.create(album)
            .then(res => {
                setAlbum({
                    title: res.data.title,
                    artist: res.data.artist,
                    spotifyLink: res.data.spotifyLink,
                    imageUrl: res.data.imageUrl,
                    slug: res.data.slug,
                    id: res.data.id
                   });
                console.log(res.data)
            }).then(() => {
                console.log(album);
                setAdded(true);
            })
            .catch(err => {
                console.log(err);
            });
        ListenedDataService.getCurrent()
            .then(res => {
                if (_.isEmpty(res.data)) {
                    ListenedDataService.create({ id: album.id });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (_.isEmpty(album)) {
        return (
            <React.Fragment>
                <h3>There was a problem adding an album. To add a new album click the button below.</h3>
                <Link to="/albums/add" className="btn btn-primary">Add an Album</Link>
            </React.Fragment>
        );
    }

    if (added) {
        return (
            <React.Fragment>
                <h2>Added <Link to={"/albums/" + album.id + "/" + slug}>{album.title}</Link>!</h2>
            </React.Fragment>
        );
    }

    return (
        <div className="add-album">
            <Album album={album} />
            {!exists ? (
                <Button
                    className="btn btn-primary"
                    onClick={addAlbum}>
                Add Album
                </Button>
            ) : (
                <React.Fragment>
                    <h2>This Album already exists!</h2>
                    <Link to={"/albums/" + album.id + "/" + slug} className="btn btn-primary">{album.title}</Link>
                </React.Fragment>
            )}
        </div>
    );
}