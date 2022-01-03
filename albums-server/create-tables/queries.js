const create = [ 
    `CREATE TABLE album
        (
            id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            artist VARCHAR(255) NOT NULL,
            spotifyLink VARCHAR(255),
            imageUrl VARCHAR(255),
            slug VARCHAR(255) NOT NULL
        )`,
    `CREATE TABLE listenedTo
        (
            id INT(11) NOT NULL,
            date DATE NOT NULL,
            FOREIGN KEY(id) REFERENCES album(id),
            PRIMARY KEY(date)
        )`,
];

const remove = [
    `DROP TABLE listenedTo`,
    `DROP TABLE album`,
];

module.exports = {
    create: create,
    remove: remove,
}


