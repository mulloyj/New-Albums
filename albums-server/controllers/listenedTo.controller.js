const ListenedTo = require('../models/listenedTo.model');

// Create a new ListenedTo
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    let date = '';

    if (!req.body.date) {
        const today = new Date();
        date = String(today.getFullYear()) + '-'
                  + String(today.getMonth() + 1).padStart(2, '0') + '-'
                  + String(today.getDate()).padStart(2,'0'); 
        console.log(date);
    } else date = req.body.date;

    // Create a ListenedTo
    const listenedTo = new ListenedTo({
        id: req.body.id,
        date: date,
    });

    // Save the ListenedTo
    ListenedTo.create(listenedTo, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating ListenedTo"
            });
        else res.send(data);
    });
}

exports.findAll = (req, res) => {
    ListenedTo.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while retrieving ListenedTo"
            });
        else res.send(data);
    });
}

exports.findCurrent = (req, res) => {
    ListenedTo.getCurrent((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Couldn't find current album`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving current album`
                });
            }
        } else res.send(data);
    })
}

exports.findOne = (req, res) => {
    ListenedTo.findByDate(req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found listenedTo with date ${req.params.date}`
                });
            } else {
                res.status(500).send({
                    message: `Error retrieving listenedTo with date ${req.params.date}`
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

    ListenedTo.updateByDate(req.params.date,
        new ListenedTo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found listenedTo with date ${req.params.date}`
                    });
                } else {
                    res.status(500).send({
                        message: `Error updating listenedTo with date ${req.params.date}`
                    });
                } 
            } else res.send(data);
        }
    );
}

exports.delete = (req, res) => {
    ListenedTo.remove(req.params.date, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found listenedTo with date ${req.params.date}`
                });
            } else {
                res.status(500).send({
                    message: `Error deleting listenedTo with date ${req.params.date}`
                });
            } 
        } else res.send({ message: `Album successfully deleted!`});
    });
}

exports.deleteAll = (req, res) => {
    ListenedTo.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all listenedTo."
            });
        else res.send({ message: `All listenedTo were deleted successfully`});
    })
}