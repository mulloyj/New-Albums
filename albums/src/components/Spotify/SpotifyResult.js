import React from 'react';

import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import spotifyBlack from '../../images/spotify-black.png';
import _ from 'lodash';

const SpotifyResult = (props) => {
    const albums = props.albums;

    const convertAlbum = (album) => {
        return {
            title: album.name,
            artist: album.artists.map((artist) => artist.name).join(', '),
            img: album.images[0].url,
            spotify: album.uri,
        }
    }

    const updateAlbum = (album) => {
        const convertedAlbum = convertAlbum(album);
        props.updateAlbum(convertedAlbum);
    }

    return (
        <React.Fragment>
            {Object.keys(albums).length > 0 && (
                <div className="albums-result">
                    {albums.items.map((album, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Link
                                        to="/albums/current/"
                                        className="card-link"
                                        onClick={(e) => updateAlbum(album)}
                                    >
                                    {!_.isEmpty(album.images) ? (
                                        <Card.Img
                                            variant="top"
                                            src={album.images[0].url}
                                            alt={album.name + " cover art"}
                                        />
                                    ) : (
                                        <img src={spotifyBlack} alt=""/>
                                    )}
                                    <Card.Body>
                                        <Card.Title>{album.name}</Card.Title>
                                        <Card.Text>
                                            <small>
                                                {album.artists.map((artist) => artist.name).join(', ')}
                                            </small>
                                        </Card.Text>
                                    </Card.Body>
                                    </Link>
                                </Card>
                            </React.Fragment>
                        );
                    })}
                </div>
            )}
        </React.Fragment>
    );
}

export default SpotifyResult;