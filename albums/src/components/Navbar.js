import React, { Component } from 'react';

import '../css/Navbar.css';

class Navbar extends Component {
    state = {
        HomeClass: '',
        CurrentClass: '',
        AlbumListClass: '',
        AddClass: '',
    };

    render() { 
        return ( 
            <ul className="navigation">
                <li><a href="/" className="left active">Home</a></li>
                <li><a href="/albums/current/" className="left">Current</a></li>
                <li><a href="/albums/" className="left">Album List</a></li>
                <li><a href="/albums/add/" className="left">Add an Album</a></li>
                <li><a href="/about/" className="about">About</a></li>
            </ul>
         );
    }
}
 
export default Navbar;