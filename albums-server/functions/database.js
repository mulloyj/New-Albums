const sql = require('../models/db');
const ListenedTo = require('../models/listenedTo.model');

module.exports = async function updateCurrent() {
    sql.query('SELECT id FROM album WHERE id NOT IN (SELECT id FROM listenedTo)', (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        if (res.length) {
            const choice = Math.floor(Math.random() * (res.length));
            
            const today = new Date();
            let date = String(today.getFullYear()) + '-'
                    + String(today.getMonth() + 1).padStart(2, '0') + '-'
                    + String(today.getDate()).padStart(2,'0'); 

            // Create a ListenedTo
            const listenedTo = new ListenedTo({
                id: res[choice].id,
                date: date,
            });
        
            // Save the ListenedTo
            ListenedTo.create(listenedTo, (err, data) => {
                if (err)
                    console.log(err)
                else console.log(`Added listened to ${listenedTo.date}`);
            });
            return;
        }

        console.log('No albums to update current to');
    });
}