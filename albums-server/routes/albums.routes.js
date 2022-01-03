module.exports = app => {
    const albums = require('../controllers/album.controller');
    const listenedTos = require('../controllers/listenedTo.controller');

    const router = require('express').Router();

    router.post("/albums", albums.create);
    router.post("/listened", listenedTos.create)

    router.get("/albums", albums.findAll);
    router.get("/listened", listenedTos.findAll);

    router.get("/albums/current", listenedTos.findCurrent);
    router.get("/listened/current", listenedTos.findCurrent);

    router.get("/albums/:id", albums.findOne);
    router.get("/listened/:date", listenedTos.findOne);

    router.put("/albums/:id", albums.update);
    router.put("listened/:date", listenedTos.update);

    router.delete("/albums/:id", albums.delete);
    router.delete("/listened/:date", listenedTos.delete);

    router.delete("/albums", albums.deleteAll);
    router.delete("/listened", listenedTos.deleteAll);

    app.use('/api', router);
}