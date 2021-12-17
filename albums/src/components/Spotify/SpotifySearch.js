import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SpotifySearch  = (props) => {
    const [error, setError] = useState('');
    const [searchTerm , setSearchTerm] = useState('');

    const inputChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
    }

    const handleSearch = (event) => {
        event.preventDefault();

        if (searchTerm.trim() !== '') {
            setError('');
            props.handleSearch(searchTerm);
        } else {
            setError('Please enter a search term.');
        }
    };

    return (
        <React.Fragment>
            <Form onSubmit={handleSearch} className="search">
                {error && <p className="errorMsg">{error}</p>}
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter Album Title</Form.Label>
                    <Form.Control
                        type="search"
                        name="searchTerm"
                        value={searchTerm}
                        placeholder="Search for an Album"
                        onChange={inputChange}
                        autoComplete="off" />
                </Form.Group>
                <Button variant="info" type="submit">
                    Search
                </Button>
            </Form>
        </React.Fragment>
    )
}

export default SpotifySearch;