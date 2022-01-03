const sql = require('./db');

const ListenedTo = function(listenedTo)  {
    this.id = listenedTo.id;
    this.date = listenedTo.date;
}

ListenedTo.create = (newListenedTo, result) => {
    sql.query('INSERT INTO listenedTo SET ?', newListenedTo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log('Created ListenedTo: ', newListenedTo);
        result(null, res[0])
    });
}

ListenedTo.findByDate = (date, result) => {
    sql.query(`SELECT * FROM listenedTo WHERE date = '${date}'`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found listenedTo: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
}

ListenedTo.findByAlbum = (id, result) => {
    sql.query(`SELECT * FROM listenedTo WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found listenedTo: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found"}, null);
    });
}

ListenedTo.getCurrent = result => {
    const date = new Date();
    const today = String(date.getFullYear()) + '-'
                  + String(date.getMonth() + 1).padStart(2, '0') + '-'
                  + String(date.getDate()).padStart(2,'0');

    sql.query(`SELECT a.title, a.artist, a.spotifyLink, a.imageUrl, a.slug
               FROM album a, listenedTo l
               WHERE a.id = l.id
                 AND l.date = ?`, today, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found current: ', res[0]);
            result(null, res[0]);
            return
        }

        result({ kind: "not_found" }, null);
    });
}

ListenedTo.getAll = result => {
    sql.query('SELECT * FROM listenedTo', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log("listenedTo: ", res);
        result(null, res);
    });
}

ListenedTo.updateByDate = (listenedTo, result) => {
    sql.query(
        "UPDATE lsitenedTo SET id = ? WHERE date = ?",
        [listenedTo.id, listenedTo.date],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            console.log('updated listenedTo: ', listenedTo);
            result(null, listenedTo);
        }
    );
}

ListenedTo.remove = (date, result) => {
    sql.query("DELETE FROM listenedTo WHERE date = ?", date, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log('delated listenedTo on date: ', date);
        result(null, res);
    });
}

ListenedTo.removeAll = result => {
    sql.query("DELETE FROM listenedTo", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} listenedTo`);
        result(null, res);
    });
}

module.exports = ListenedTo;