const sql = require('./db');

// constructor
const Album = function(album) { 
    this.title = album.title;
    this.artist = album.artist;
    this.spotifyLink = album.spotifyLink;
    this.imageUrl = album.imageUrl;
    this.slug = album.slug;
};

Album.create = (newAlbum, result) => {
    sql.query('INSERT INTO album SET ?', newAlbum, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log('Created Album: ', { id: res.insertId, ...newAlbum});
        result(null, { id: res.insertId, ...newAlbum});
    });
}

Album.findById = (id, result) => {
    sql.query(`SELECT * FROM album WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found album: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Album DNE
        result({ kind: "not_found" }, null);
    });
}

Album.getAll = (slug, id, title, artist, result) => {
    let query = "SELECT * FROM album";

    if (slug) {
        query += ` WHERE slug LIKE '%${slug}%'`;
    } else if (title) {
        query += ` WHERE title = '${title}'`;
    }

    if (id && !title) {
        query += ` AND id = ${id}`;
    } else if (artist && !slug) {
        query += ` AND artist = '${artist}'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("albums: ", res);
        result(null, res);
    });
}

Album.updateByAlbum = (id, album, result) => {
    sql.query(
        "UPDATE album SET title = ?, artist = ?, spotifyLink = ?, imageUrl = ?, slug = ? WHERE id = ?",
        [album.title, album.artist, album.spotifyLink, album.imageUrl, album.slug, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // Album DNE
                result({ kind: "not_found" }, null);
                return;
            }

            console.log('updated album: ', album);
            result(null, { id: id, ...album});
        });
}

Album.remove = (id, result) => {
    sql.query("DELETE FROM album WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Album DNE
            result({ kind: "not_found" }, null);
            return;
        }

        console.log(`deleted album with id: ${id}`);
    });
}

Album.removeAll = result => {
    sql.query("DELETE FROM album", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} albums`);
        result(null, res);
    })
}

module.exports = Album;