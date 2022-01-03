const sql = require('mysql');
const config = require('../config/db.config');

const db = sql.createConnection(config);

const queries = require('./queries').remove;

db.connect((err) => {
    if (err) throw err;

    queries.forEach((query) => {
        db.query(query, (err, result) => {
            if (err) throw (err);
            console.log("Table dropped");
        });
    });
});
