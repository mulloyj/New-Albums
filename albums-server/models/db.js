const mysql = require('mysql');
const dbConfig = require('../config/db.config');

// Create connection to database
const connection = mysql.createConnection(dbConfig);

// open the connection
connection.connect(error => {
    if (error) throw error;
    console.log('Connected to Database!');
});

module.exports = connection;