import React, { useState } from 'react';


export default function AlbumListItem(props) {
    const [ album, setAlbum ] = useState(props.album);
    const [ hovered, setHovered] = useState(false);

    return (
        <li className="list-group-item" 
            key={album.id}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <a href={"/albums/" + album.id + "/" + album.slug + "/"} className="album-link">{album.title}
                {hovered && (
                <React.Fragment>
                    <br />
                    <img src={album.imageUrl} alt={album.title + " album cover"} />
                </React.Fragment>
            )}</a>
            
        </li>
    );
}