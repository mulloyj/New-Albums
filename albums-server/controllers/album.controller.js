const Album = require('../models/album.model');

// Create a new Album
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a album
    const album = new Album({
        title: req.body.title,
        artist: req.body.artist,
        spotifyLink: req.body.spotifyLink,
        imageUrl: req.body.imageUrl,
        slug: req.body.slug,
    });

    // Save the Album
    Album.create(album, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating Album"
            });
        else res.send(data);
    });
}

exports.findAll = (req, res) => {
    const slug = req.query.slug;
    const id = req.query.id;
    const title = req.query.title;
    const artist = req.query.artist;

    Album.getAll(slug, id, title, artist, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving Album"
            });
        else res.send(data);
    });
}

exports.findOne = (req, res) => {
    Album.findById(req.params.id, (err, data) => {
        console.log(err);
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found album with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving album with id ${req.params.id}`
                });
            }
        } else res.send(data);
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);

    Album.updateById(req.params.id,
        new Album(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found album with id ${req.params.id}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating album with id ${req.params.id}`
                    });
                } 
            } else res.send(data);
        }
    );
}

exports.delete = (req, res) => {
    Album.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found album with id ${req.params.id}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting album with id ${req.params.id}`
                });
            } 
        } else res.send({ message: `Album successfully deleted!`});
    });
}

exports.deleteAll = (req, res) => {
    Album.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all albums."
            });
        else res.send({ message: `All albums were deleted successfully`});
    })
}